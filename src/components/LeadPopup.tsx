"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Users, Phone, BookOpen, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { TRUSTED_AVATARS, RECRUITERS } from "@/app/constants";

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, formType: string) => Promise<void>;
  isSubmitting: boolean;
  submitText?: string;
  minimal?: boolean;
}

export default function LeadPopup({ isOpen, onClose, onSubmit, isSubmitting, submitText, minimal }: LeadPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${minimal ? 'max-w-lg' : 'max-w-5xl'} bg-[#0a0a0a] border border-white/10 rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.3)] flex flex-col lg:flex-row group`}
          >
            {/* LEFT SIDE: BRANDING & GRAPHICS (Desktop Only) */}
            {!minimal && (
              <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden border-r border-white/5">
              <Image 
                src="/Program/Visual-Effects.png" 
                alt="ZICA Visuals" 
                fill 
                className="object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-[3s] ease-out"
                sizes="(max-width: 1024px) 0vw, 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="relative z-10 p-12 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[2px] bg-[#ff0000]" />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">ZICA Pitampura</span>
                  </div>
                  <h2 className="text-5xl font-black text-white uppercase italic leading-[0.9] tracking-tighter">
                    Transform <br />
                    <span className="text-[#ff0000] text-glow">Your Ideas</span> <br />
                    Into Reality
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Join India's premier institute for Animation, VFX, and Design. Master the tools that build the future.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Trust Avatars */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {TRUSTED_AVATARS.slice(0, 4).map((img) => (
                        <div key={img} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden relative shadow-lg">
                          <Image src={`/Trusted by/${img}`} alt="Student" fill className="object-cover" sizes="40px" />
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] leading-tight">
                      <p className="text-gray-500 uppercase tracking-widest font-bold">Trusted by</p>
                      <p className="text-white font-black">3000+ STUDENTS</p>
                    </div>
                  </div>

                  {/* Recruiter strip (mini) */}
                  <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {RECRUITERS.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 h-10 w-20 flex items-center justify-center">
                        <Image src={`/Recruiters/${img}.png`} alt="Recruiter" width={60} height={20} className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
            
            {/* RIGHT SIDE: FORM */}
            <div className={`w-full ${minimal ? 'lg:w-full' : 'lg:w-[55%]'} relative flex flex-col`}>
              {/* Premium Background Graphics */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,0,0.08),transparent_70%)]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-50 hover:scale-110 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-full">
                {/* Minimal Graphic Background */}
                {minimal && (
                  <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none overflow-hidden">
                    <Image 
                      src="/Program/Game-Design.png" 
                      alt="Background Graphic" 
                      fill 
                      className="object-cover object-right-top scale-110 blur-[3px] brightness-[0.2]"
                      sizes="500px"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/40 mix-blend-multiply" />
                  </div>
                )}

                <div className={`${minimal ? 'block' : 'lg:hidden'} mb-8 text-center lg:text-left relative z-10`}>
                   <h2 className={`${minimal ? 'text-3xl' : 'text-3xl'} font-black text-white uppercase italic leading-none tracking-tighter mb-4`}>
                    {submitText || "Apply Now"}
                  </h2>
                  <div className="w-12 h-1 bg-[#ff0000] mx-auto lg:mx-0" />
                </div>

                {!minimal && (
                  <div className="hidden lg:block mb-10">
                     <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                      Ready to Start?
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">Apply below</p>
                  </div>
                )}

                <form className="space-y-5" onSubmit={(e) => onSubmit(e, "Popup Enquiry Form")}>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 group-focus-within/input:text-red-600 transition-colors">Full Name</label>
                    <div className="relative">
                      <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input 
                        name="fullName"
                        type="text" 
                        required
                        placeholder="Your Name" 
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:border-red-600/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 group/input">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 group-focus-within/input:text-red-600 transition-colors">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                        <input 
                          name="phone"
                          type="tel" 
                          required
                          pattern="[0-9]{10}"
                          placeholder="Phone Number" 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:border-red-600/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 group/input">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 group-focus-within/input:text-red-600 transition-colors">Program</label>
                      <div className="relative">
                        <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                        <select 
                          name="course"
                          defaultValue=""
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-sm focus:border-red-600/50 focus:bg-white/[0.06] outline-none transition-all text-gray-300 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select Course</option>
                          <option value="Animation">Animation</option>
                          <option value="VFX - Visual Effects">VFX - Visual Effects</option>
                          <option value="Gaming">Gaming</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Motion Graphics">Motion Graphics</option>
                          <option value="3D Maya Course">3D Maya Course</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Unreal Engine">Unreal Engine</option>
                          <option value="Blender Mastery">Blender Mastery</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 group-focus-within/input:text-red-600 transition-colors">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input 
                        name="email"
                        type="email" 
                        required
                        placeholder="Your email address" 
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:border-red-600/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-sm shadow-[0_10px_40px_rgba(255,0,0,0.25)] transition-all btn-glow mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : (submitText || "Apply Now")}
                  </motion.button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">⚡ Limited Seats Available for Next Batch</p>
                  <div className="flex items-center gap-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                     <a href="tel:+917900400300" className="flex items-center gap-2 hover:text-white transition-colors">
                      <Phone className="w-3 h-3 text-[#ff0000]" />
                      Call Us
                    </a>
                    <a href="https://wa.me/917900400300" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                      <MessageCircle className="w-3 h-3 text-[#25d366]" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
