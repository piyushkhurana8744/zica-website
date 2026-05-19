import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZICA Pitampura | Top Creative Media Institute in Delhi",
  description: "Transform your creativity into a successful media career with ZICA Pitampura through industry-focused courses in 3D Animations, 2D Animations, VFX, Graphic Design, Gaming.",
  keywords: [
    "zica institute pitampura",
    "animation institute in delhi",
    "best animation institute in delhi",
    "graphic design course delhi",
    "video editing course delhi",
    "video editing institute",
    "animation and multimedia courses",
    "Vfx institute Delhi",
    "Top vfx institute Delhi",
    "Vfx institute"
  ],
  icons: { icon: "/zica-favicon.ico" },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18138896524"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18138896524');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
