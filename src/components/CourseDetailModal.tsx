"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Clock, BookOpen, Briefcase, GraduationCap, Users, Phone, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TurnstileField from "./TurnstileField";

interface Module {
  title: string;
  duration: string;
  topics: string[];
}

interface CourseDetails {
  title: string;
  duration: string;
  description: string;
  prerequisite?: string;
  highlights: string[];
  modules: Module[];
  careerAvenues: string[];
  image: string;
}

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseDetails | null;
  variants?: CourseDetails[];
  onVariantChange?: (variant: CourseDetails) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, formType: string) => Promise<void>;
  isSubmitting: boolean;
  captchaKey: number;
}

export default function CourseDetailModal({ isOpen, onClose, course, variants, onVariantChange, onSubmit, isSubmitting, captchaKey }: CourseDetailModalProps) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(false);
  }, [captchaKey]);

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

  if (!course) return null;

  const hasVariants = variants && variants.length > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-3 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-full max-h-[92vh] bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(255,0,0,0.2)] flex flex-col"
          >
            {/* BACKGROUND GRAPHICS */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,0,0.1),transparent_70%)]" />
              <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-red-600/10 blur-[130px] rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            </div>
            {/* Cinematic Background Header */}
            <div className="relative h-[250px] sm:h-[350px] shrink-0 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                priority
                quality={100}
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              
              {/* Content on Image */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[2px] bg-[#ff0000]" />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Academic Program</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic leading-[0.9] tracking-tighter drop-shadow-2xl">
                    {course.title.split(' ').map((word, i, arr) => (
                      <span key={i} className={i === arr.length - 1 ? "text-[#ff0000] text-glow" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                        Professional Program
                      </span>
                      {!hasVariants && (
                        <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-bold">
                          <Clock className="w-3.5 h-3.5 text-red-600" />
                          {course.duration}
                        </div>
                      )}
                    </div>

                    {/* Duration Variant Tabs */}
                    {hasVariants && (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mr-1">Select Duration:</span>
                        {variants!.map((variant, vIdx) => (
                          <button
                            key={vIdx}
                            onClick={() => onVariantChange?.(variant)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-all ${
                              course.duration === variant.duration
                                ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30"
                                : "bg-white/10 border-white/20 text-white/60 hover:border-white/40 hover:text-white backdrop-blur-md"
                            }`}
                          >
                            {variant.duration}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Close Button on Header */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-50 hover:scale-110 active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
              
              {/* Left Column: Course Details (Scrollable) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 lg:p-10">
                <div className="space-y-10 max-w-3xl">
                  
                  {/* Overview */}
                  <section className="space-y-3">
                    <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5 text-red-600" />
                      Program Overview
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                      {course.description}
                    </p>
                    {course.prerequisite && (
                      <div className="p-3 bg-white/5 border-l-2 border-red-600 rounded-r-lg">
                        <p className="text-xs font-bold text-gray-300">
                          <span className="text-red-500 uppercase tracking-widest mr-2 text-[9px]">Prerequisite:</span>
                          {course.prerequisite}
                        </p>
                      </div>
                    )}
                  </section>

                  {/* Highlights */}
                  <section className="space-y-5">
                    <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                      Course Highlights
                    </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-xs font-medium leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>

                  {/* Modules */}
                  <section className="space-y-5">
                    <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                      <GraduationCap className="w-5 h-5 text-red-600" />
                      Course Curriculum
                    </h3>
                    <div className="space-y-4">
                      {course.modules.map((module, idx) => (
                        <div key={idx} className="group bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-red-600/30 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                              <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em]">Module 0{idx + 1}</span>
                              <h4 className="text-sm font-black text-white uppercase mt-0.5 leading-tight">{module.title}</h4>
                            </div>
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-400">
                              {module.duration}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                            {module.topics.map((topic, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-1 h-1 bg-red-600/60 rounded-full shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Career Avenues */}
                  <section className="space-y-5">
                    <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                      <Briefcase className="w-5 h-5 text-red-600" />
                      Career Opportunities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.careerAvenues.map((avenue, idx) => (
                        <span key={idx} className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-gray-300 hover:border-red-600/50 hover:text-white transition-all cursor-default">
                          {avenue}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Right Column: Compact Enquiry Form */}
              <div className="w-full lg:w-[300px] shrink-0 bg-[#070707] border-t lg:border-t-0 lg:border-l border-white/5 p-5 lg:p-6 overflow-y-auto relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,0,0,0.04),transparent_70%)] pointer-events-none" />
                
                <div className="relative z-10 mb-5">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-1">Enquire <span className="text-red-600">Now</span></h3>
                  <p className="text-gray-600 text-[8px] font-black uppercase tracking-[0.25em]">Start your creative career</p>
                  <div className="w-8 h-[2px] bg-red-600 mt-2.5" />
                </div>

                <form className="relative z-10 space-y-2.5" onSubmit={(e) => onSubmit(e, `Course Detail Form: ${course.title}`)}>
                  <div className="group/input">
                    <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1 group-focus-within/input:text-red-600 transition-colors block mb-0.5">Name</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input required name="fullName" type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[11px] text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.06] transition-all placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="group/input">
                    <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1 group-focus-within/input:text-red-600 transition-colors block mb-0.5">Mobile</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input required name="phone" type="tel" pattern="[0-9]{10}" placeholder="10 Digit Number" className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[11px] text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.06] transition-all placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="group/input">
                    <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1 group-focus-within/input:text-red-600 transition-colors block mb-0.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[11px] text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.06] transition-all placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="group/input">
                    <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1 group-focus-within/input:text-red-600 transition-colors block mb-0.5">Course</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <select 
                        name="course"
                        required
                        defaultValue={course.title}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-7 py-2.5 text-[11px] text-gray-300 appearance-none focus:outline-none focus:border-red-600/50 focus:bg-white/[0.06] transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select Course</option>
                        {!["Animation", "VFX - Visual Effects", "Gaming", "Graphic Design", "Motion Graphics", "3D Maya Course", "Video Editing", "Unreal Engine", "Blender Mastery"].includes(course.title) && (
                          <option value={course.title}>{course.title}</option>
                        )}
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
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <TurnstileField 
                    key={captchaKey}
                    onVerify={() => setIsVerified(true)}
                    onExpire={() => setIsVerified(false)}
                    onError={() => setIsVerified(false)}
                    className="mt-3"
                  />

                  <div className="flex items-start gap-2 mt-3 select-none">
                    <input
                      id="agreeTermsCourseDetail"
                      name="agreeTerms"
                      type="checkbox"
                      required
                      className="mt-0.5 h-3 w-3 shrink-0 rounded border-white/10 bg-white/5 text-red-600 focus:ring-red-500/50 accent-red-600 cursor-pointer"
                    />
                    <label htmlFor="agreeTermsCourseDetail" className="text-[9px] text-gray-500 font-bold leading-tight cursor-pointer hover:text-gray-400 transition-colors">
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

                  <button 
                    disabled={isSubmitting || !isVerified}
                    className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-3 rounded-lg transition-all mt-3 text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Apply Now"}
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-center gap-2.5 relative z-10">
                  <div className="flex -space-x-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-[1.5px] border-[#070707] bg-gray-800 overflow-hidden relative">
                        <Image src={`/Trusted by/17073058${i === 1 ? '10351' : i === 2 ? '18392' : '26339'}testimonial_img0${i}.jpg`} alt="student" fill className="object-cover" sizes="24px" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">3,000+ Students</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
