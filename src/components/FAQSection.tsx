"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Phone, Mail, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";
import TurnstileField from "./TurnstileField";

interface FAQSectionProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, formType: string) => Promise<void>;
  isSubmitting: boolean;
  captchaKey: number;
}

const FAQS = [
  {
    q: "What courses does ZICA Pitampura offer?",
    a: "We offer professional courses in Animation, VFX, Graphic Design, Web Design, Gaming, and Digital Marketing. Our programs range from short-term certificate courses to long-term professional diplomas.",
  },
  {
    q: "Does ZICA provide placement assistance?",
    a: "Yes, we have a dedicated placement cell that helps students with portfolio creation, interview preparation, and connecting them with top studios and agencies in the industry.",
  },
  {
    q: "Are the instructors industry professionals?",
    a: "Absolutely. All our mentors have years of experience working on real-world projects in animation, design, and VFX studios.",
  },
  {
    q: "Is there any age limit to join the courses?",
    a: "There is no strict age limit. Anyone with a passion for creativity and a basic understanding of computers can join our programs.",
  },
  {
    q: "Can I take a demo class before enrolling?",
    a: "Yes, we encourage prospective students to attend a free counseling session and a demo class to experience our teaching methodology.",
  },
];

export default function FAQSection({ handleFormSubmit, isSubmitting, captchaKey }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(2);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(false);
  }, [captchaKey]);

  return (
    <section id="faqs" className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-16 lg:py-20 bg-[#030008]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* FAQ Column */}
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#ff0000]" />
              <span className="text-sm font-bold text-gray-500 uppercase tracking-[0.4em]">Support</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-none uppercase italic tracking-tighter">
              Got <span className="text-[#ff0000]">Questions?</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ${
                  expandedFaq === idx ? 'bg-white/[0.03] border-red-600/30' : 'hover:bg-white/5'
                }`}
              >
                <div
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="px-6 py-5 flex items-center justify-between cursor-pointer"
                >
                  <h3 className="text-sm lg:text-base font-bold text-white group-hover:text-red-600 transition-colors uppercase tracking-wider">
                    {faq.q}
                  </h3>
                  {expandedFaq === idx ? (
                    <div className="text-xl text-[#ff0000]">-</div>
                  ) : (
                    <div className="text-xl text-white group-hover:text-red-600 transition-colors">+</div>
                  )}
                </div>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-400 text-sm leading-relaxed whitespace-pre-line border-l-2 border-red-600 ml-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enquiry Form Column */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 lg:p-16 space-y-10 relative h-fit group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
          <h2 className="text-4xl font-black text-white text-center uppercase italic text-glow">
            Enquiry Now
          </h2>
          <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e, "Footer Enquiry Form")}>
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-3 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit mobile number"
                  placeholder="Enter mobile number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-3 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                Your Email
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-3 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                Interested on...
              </label>
              <div className="relative">
                <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                <select name="course" required defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-10 py-3 text-white focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                  <option value="" disabled className="bg-black">Select Course</option>
                  <option className="bg-black" value="Animation">Animation</option>
                  <option className="bg-black" value="VFX - Visual Effects">VFX - Visual Effects</option>
                  <option className="bg-black" value="Gaming">Gaming</option>
                  <option className="bg-black" value="Graphic Design">Graphic Design</option>
                  <option className="bg-black" value="Motion Graphics">Motion Graphics</option>
                  <option className="bg-black" value="3D Maya Course">3D Maya Course</option>
                  <option className="bg-black" value="Video Editing">Video Editing</option>
                  <option className="bg-black" value="Unreal Engine">Unreal Engine</option>
                  <option className="bg-black" value="Blender Mastery">Blender Mastery</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
             <TurnstileField 
              key={captchaKey}
              onVerify={() => setIsVerified(true)}
              onExpire={() => setIsVerified(false)}
              onError={() => setIsVerified(false)}
            />
            <div className="flex items-start gap-2.5 mt-2 select-none">
              <input
                id="agreeTermsFAQ"
                name="agreeTerms"
                type="checkbox"
                required
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/10 bg-white/5 text-red-600 focus:ring-red-500/50 accent-red-600 cursor-pointer"
              />
              <label htmlFor="agreeTermsFAQ" className="text-[10px] text-gray-500 font-bold leading-normal cursor-pointer hover:text-gray-400 transition-colors">
                I agree to the Zica{" "}
                <Link href="/terms-and-conditions" target="_blank" className="text-red-500 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" target="_blank" className="text-red-500 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || !isVerified}
              className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-3.5 rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] btn-glow disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Apply Now"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
