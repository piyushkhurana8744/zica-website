import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, course, formType, captchaNum1, captchaNum2, captchaOp, captchaAnswer } = await req.json();

    // Verify Captcha
    if (captchaNum1 === undefined || captchaNum2 === undefined || captchaOp === undefined || captchaAnswer === undefined) {
      return NextResponse.json({ success: false, error: 'Verification challenge parameters are missing.' }, { status: 400 });
    }

    let expected = 0;
    const n1 = Number(captchaNum1);
    const n2 = Number(captchaNum2);
    if (captchaOp === '+') {
      expected = n1 + n2;
    } else if (captchaOp === '-') {
      expected = n1 - n2;
    } else if (captchaOp === '*') {
      expected = n1 * n2;
    } else {
      return NextResponse.json({ success: false, error: 'Invalid verification operator.' }, { status: 400 });
    }

    if (Number(captchaAnswer) !== expected) {
      return NextResponse.json({ success: false, error: 'Incorrect verification answer. Please solve the math puzzle again.' }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials missing in .env');
      return NextResponse.json({ success: false, error: 'SMTP configuration missing' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${process.env.YOUR_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM,
      cc: 'chirag@didm.in',
      subject: `New Lead from ${formType}: ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
          <div style="background-color: #030008; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px;">ZICA <span style="color: #ff0000;">LEAD</span></h1>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0; font-size: 20px; border-bottom: 2px solid #ff0000; padding-bottom: 10px; display: inline-block;">New Inquiry Details</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 25px;">A new potential student has just submitted an inquiry through the <strong>${formType}</strong>.</p>
            
            <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; border-left: 4px solid #ff0000;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase; font-weight: bold; width: 120px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #ff0000; text-decoration: none;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Course</td>
                  <td style="padding: 12px 0; color: #111; font-weight: 600;">${course}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #ff0000; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Student</a>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
            This lead was generated automatically by the ZICA Website
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
