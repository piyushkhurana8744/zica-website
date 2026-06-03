"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  ChevronRight,
  ChevronDown,
  Star,
  Layers,
  Cpu,
  BookOpen,
  Briefcase,
  GraduationCap,
  Award,
  PenTool,
  Layout,
  Smartphone,
  Video,
  Globe,
  Users,
  MapPin,
  Menu,
  X,
} from "lucide-react";


import { COURSES, RECRUITERS, TRUSTED_AVATARS, ZICA_WAY_IMAGES, HERO_SLIDES, COURSE_DETAILS, TESTIMONIALS } from "./constants";
import CaptchaField from "@/components/CaptchaField";

const LeadPopup = dynamic(() => import("@/components/LeadPopup"), {
  ssr: false,
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  ssr: false,
});

const CourseDetailModal = dynamic(() => import("@/components/CourseDetailModal"), {
  ssr: false,
});

const TestimonialModal = dynamic(() => import("@/components/TestimonialModal"), {
  ssr: false,
});

const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {
  ssr: false,
});

const COURSE_TO_SLUG: Record<string, string> = {
  "Graphic Designing": "graphic-designing",
  "2D Animation": "2d-animation",
  "3D Animation": "3d-animation",
  "Motion Graphics": "motion-graphics",
  "3D Maya Course": "3d-maya-course",
  "Architectural Design": "architectural-design",
  "VFX Master": "vfx-master",
  "Game Design": "game-design",
  "3DS Max": "3ds-max",
  "Video Editing": "video-editing",
};

const SLUG_TO_COURSE: Record<string, string> = {
  "graphic-designing": "Graphic Designing",
  "2d-animation": "2D Animation",
  "3d-animation": "3D Animation",
  "motion-graphics": "Motion Graphics",
  "3d-maya-course": "3D Maya Course",
  "architectural-design": "Architectural Design",
  "vfx-master": "VFX Master",
  "game-design": "Game Design",
  "3ds-max": "3DS Max",
  "video-editing": "Video Editing",
};

export default function Home() {
  const router = useRouter();
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [zicaWayIndex, setZicaWayIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCourseDetailOpen, setIsCourseDetailOpen] = useState(false);
  const [selectedCourseData, setSelectedCourseData] = useState<any>(null);
  const [popupSubmitText, setPopupSubmitText] = useState("Enquire Now");
  const [isPopupMinimal, setIsPopupMinimal] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  const openLeadPopup = (text: string = "Apply Now", minimal: boolean = false) => {
    setPopupSubmitText(text);
    setIsPopupMinimal(minimal);
    setIsPopupOpen(true);
  };

  const [courseVariants, setCourseVariants] = useState<any[]>([]);

  const openCourseDetail = (courseName: string, isReplace = false) => {
    const details = (COURSE_DETAILS as any)[courseName];
    if (details) {
      if (Array.isArray(details)) {
        setCourseVariants(details);
        setSelectedCourseData(details[0]);
      } else {
        setCourseVariants([]);
        setSelectedCourseData(details);
      }
      setIsCourseDetailOpen(true);
      const slug = COURSE_TO_SLUG[courseName];
      if (slug) {
        const currentPath = window.location.pathname;
        if (currentPath !== `/${slug}`) {
          if (isReplace) {
            window.history.replaceState(null, '', `/${slug}`);
          } else {
            window.history.pushState(null, '', `/${slug}`);
          }
        }
      }
    } else {
      openLeadPopup("Apply Now");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      window.history.pushState(null, '', `/${sectionId}`);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;

    // Validate Name (letters and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!fullName || !nameRegex.test(fullName.trim())) {
      alert("Please enter a valid name using letters only.");
      setIsSubmitting(false);
      return;
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const num1 = Number(formData.get('captchaNum1'));
    const num2 = Number(formData.get('captchaNum2'));
    const op = formData.get('captchaOp');
    const answer = Number(formData.get('captchaAnswer'));

    let expected = 0;
    if (op === '+') expected = num1 + num2;
    else if (op === '-') expected = num1 - num2;
    else if (op === '*') expected = num1 * num2;

    if (answer !== expected) {
      alert("Verification answer is incorrect. Please solve the math puzzle again.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      course: formData.get('course'),
      formType: formType,
      captchaNum1: num1,
      captchaNum2: num2,
      captchaOp: op,
      captchaAnswer: answer
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      
      if (result.success) {
        // Trigger Brochure Download
        const link = document.createElement('a');
        link.href = '/ZICA Brochure (2026-27) (c).pdf';
        link.download = 'ZICA Brochure (2026-27).pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        router.push("/thank-you");
        (e.target as HTMLFormElement).reset();
        if (formType === 'Popup') setIsPopupOpen(false);
      } else {
        alert(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Check if there is a course parameter in URL on mount
    const params = new URLSearchParams(window.location.search);
    const courseSlug = params.get("course");
    if (courseSlug && SLUG_TO_COURSE[courseSlug]) {
      openCourseDetail(SLUG_TO_COURSE[courseSlug], true);
    } else {
      // Direct path check if loaded directly
      const path = window.location.pathname.replace("/", "");
      if (path && SLUG_TO_COURSE[path]) {
        openCourseDetail(SLUG_TO_COURSE[path], true);
      }
    }

    const handlePopState = () => {
      const path = window.location.pathname.replace("/", "");
      if (path && SLUG_TO_COURSE[path]) {
        openCourseDetail(SLUG_TO_COURSE[path], true);
      } else {
        setIsCourseDetailOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);

    const syncInterval = setInterval(() => {
      setCurrentCourseIndex((prev) => (prev + 1) % COURSES.length);
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    const carouselInterval = setInterval(() => {
      setZicaWayIndex((prev) => (prev + 1) % ZICA_WAY_IMAGES.length);
    }, 4000);

    // --- SMART POPUP TRIGGERS ---
    const triggerPopup = () => {
      console.log("Popup Triggered!");
      // alert("Popup Triggered!"); // Uncomment if console is not visible
      openLeadPopup();
    };

    // 2. Scroll Trigger (20% or 600px)
    let totalHeight = 0;
    const updateDimensions = () => {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    const handleScroll = () => {
      if (totalHeight === 0) updateDimensions();
      const scrolled = window.scrollY;
      const scrollPercentage = totalHeight > 0 ? scrolled / totalHeight : 0;
      
      if (scrollPercentage > 0.2 || scrolled > 600) {
        console.log("Scroll threshold met, showing popup");
        triggerPopup();
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", updateDimensions);
      }
    };

    // 3. Exit Intent (Mouse leaves top)
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerPopup();
        window.removeEventListener("mouseleave", handleExitIntent);
      }
    };

    // Initialize listeners with a small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", updateDimensions);
      window.addEventListener("mouseleave", handleExitIntent);
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mouseleave", handleExitIntent);
      window.removeEventListener("popstate", handlePopState);
      clearInterval(syncInterval);
      clearInterval(carouselInterval);
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-[#030008] text-white flex flex-col font-sans selection:bg-red-600/30 overflow-x-hidden cursor-default">

      {/* --- GLOBAL SECTION REVEAL LAYER --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* --- CINEMATIC TECH BACKGROUND (Fixed for Hero) --- */}
        <div className="absolute top-0 left-0 w-full h-[120px] z-[5] pointer-events-none bg-gradient-to-b from-black to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[100vh] z-0 overflow-hidden pointer-events-none">
          {/* Hero Background Slideshow */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroSlideIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_SLIDES[heroSlideIndex]}
                alt="Hero Background"
                fill
                className="object-cover brightness-110 contrast-[1.02]"
                priority
                sizes="100vw"
                quality={90}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Enhanced overlay for better content readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030008] via-transparent to-black/50 z-[1]" />

          {/* Animated Glow Layers */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full z-[2]"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[100px] rounded-full z-[2]"
          />
        </div>

        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] flex flex-col min-h-screen shrink-0 pb-6 lg:pb-0"
        >
          {/* Navigation */}
          <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between py-8 lg:py-10 flex-shrink-0 relative z-[100]"
          >
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState(null, '', '/'); }} className="relative z-[110] group">
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-red-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
                  <Image
                    src="/ZICA-LOGO.png"
                    alt="ZICA Logo"
                    width={220}
                    height={56}
                    className="h-14 lg:h-[72px] w-auto brightness-125 transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] relative z-10"
                    priority
                  />
                </motion.div>
              </button>
            </div>

            {/* Center: Navigation — Glassmorphism Pill */}
            <div className="hidden lg:flex flex-none items-center justify-center relative">
              <div className="flex items-center gap-1">

                
                {[
                  { label: "About Us", id: "aboutus" },
                  { label: "Courses", id: "courses", isDropdown: true },
                  { label: "Why ZICA", id: "why-zica" }, 
                  { label: "Goals", id: "goals" },
                  { label: "Reviews", id: "reviews" },
                  { label: "FAQs", id: "faqs" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.08, duration: 0.5 }}
                    className="relative"
                    onMouseEnter={item.isDropdown ? () => setIsCoursesDropdownOpen(true) : undefined}
                    onMouseLeave={item.isDropdown ? () => setIsCoursesDropdownOpen(false) : undefined}
                  >
                    {item.isDropdown ? (
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
                            scrollToSection("courses");
                          }}
                          className="flex items-center gap-1.5 relative px-5 py-2.5 text-[13px] font-black text-gray-300 uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:text-white hover:bg-white/[0.08] group/link cursor-pointer"
                        >
                          {item.label}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCoursesDropdownOpen ? 'rotate-180 text-red-500' : ''}`} />
                          <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 rounded-full transition-all duration-500 group-hover/link:w-[50%]" />
                        </button>
                        
                        <AnimatePresence>
                          {isCoursesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[820px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[200] grid grid-cols-3 gap-6"
                            >
                              {/* Left Column: Animation */}
                              <div className="space-y-4">
                                <h4 className="text-[13px] font-black text-red-500 uppercase tracking-[0.18em] border-b border-white/5 pb-2">
                                  Animation Programs
                                </h4>
                                <div className="flex flex-col gap-3">
                                  {[
                                    { name: "2D Animation", icon: <PenTool className="w-[18px] h-[18px] text-purple-400" /> },
                                    { name: "3D Animation", icon: <Layers className="w-[18px] h-[18px] text-purple-400" /> },
                                    { name: "3D Maya Course", icon: <Cpu className="w-[18px] h-[18px] text-purple-400" /> },
                                    { name: "3DS Max", icon: <Layout className="w-[18px] h-[18px] text-purple-400" /> }
                                  ].map((course) => (
                                    <button
                                      key={course.name}
                                      onClick={() => {
                                        setIsCoursesDropdownOpen(false);
                                        openCourseDetail(course.name);
                                      }}
                                      className="flex items-center gap-3 text-[15px] text-white hover:text-red-500 transition-all duration-300 hover:translate-x-1 text-left w-full group/item font-bold cursor-pointer"
                                    >
                                      <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover/item:bg-red-500/10 group-hover/item:border-red-500/30 transition-all">
                                        {course.icon}
                                      </div>
                                      <span>{course.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Center Column: VFX & Gaming */}
                              <div className="space-y-4">
                                <h4 className="text-[13px] font-black text-red-500 uppercase tracking-[0.18em] border-b border-white/5 pb-2">
                                  VFX & Gaming
                                </h4>
                                <div className="flex flex-col gap-3">
                                  {[
                                    { name: "VFX Master", icon: <Video className="w-[18px] h-[18px] text-amber-400" /> },
                                    { name: "Game Design", icon: <Smartphone className="w-[18px] h-[18px] text-amber-400" /> }
                                  ].map((course) => (
                                    <button
                                      key={course.name}
                                      onClick={() => {
                                        setIsCoursesDropdownOpen(false);
                                        openCourseDetail(course.name);
                                      }}
                                      className="flex items-center gap-3 text-[15px] text-white hover:text-red-500 transition-all duration-300 hover:translate-x-1 text-left w-full group/item font-bold cursor-pointer"
                                    >
                                      <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover/item:bg-red-500/10 group-hover/item:border-red-500/30 transition-all">
                                        {course.icon}
                                      </div>
                                      <span>{course.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column: Design & Creative Arts */}
                              <div className="space-y-4">
                                <h4 className="text-[13px] font-black text-red-500 uppercase tracking-[0.18em] border-b border-white/5 pb-2">
                                  Design & Editing
                                </h4>
                                <div className="flex flex-col gap-3">
                                  {[
                                    { name: "Graphic Designing", icon: <BookOpen className="w-[18px] h-[18px] text-red-400" /> },
                                    { name: "Motion Graphics", icon: <Award className="w-[18px] h-[18px] text-red-400" /> },
                                    { name: "Architectural Design", icon: <Globe className="w-[18px] h-[18px] text-red-400" /> },
                                    { name: "Video Editing", icon: <Users className="w-[18px] h-[18px] text-red-400" /> }
                                  ].map((course) => (
                                    <button
                                      key={course.name}
                                      onClick={() => {
                                        setIsCoursesDropdownOpen(false);
                                        openCourseDetail(course.name);
                                      }}
                                      className="flex items-center gap-3 text-[15px] text-white hover:text-red-500 transition-all duration-300 hover:translate-x-1 text-left w-full group/item font-bold cursor-pointer"
                                    >
                                      <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover/item:bg-red-500/10 group-hover/item:border-red-500/30 transition-all">
                                        {course.icon}
                                      </div>
                                      <span>{course.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="relative px-5 py-2.5 text-[13px] font-black text-gray-300 uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:text-white hover:bg-white/[0.08] group/link cursor-pointer"
                      >
                        {item.label}
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 rounded-full transition-all duration-500 group-hover/link:w-[50%]" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex-1 flex flex-col items-end gap-1.5 justify-center relative z-[110]">
              <div className="flex items-center gap-3">
                {/* Enroll Now Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openLeadPopup()}
                  className="hidden sm:flex items-center gap-2 bg-[#ff0000] hover:bg-red-600 text-white px-5 lg:px-7 py-2.5 rounded-full text-[12px] font-black shadow-lg shadow-red-600/20 transition-all btn-glow uppercase tracking-[0.2em]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  Enroll Now
                </motion.button>

                {/* Mobile Toggle */}
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:border-red-600/30 transition-all"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>

              {/* Mobile Number below Enroll Now */}
              <motion.a
                href="tel:+917900400300"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="hidden sm:flex items-center gap-1.5 text-white hover:text-red-500 transition-all duration-300 mr-2 group/phone cursor-pointer drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
              >
                <Phone className="w-4 h-4 text-[#ff0000] group-hover/phone:animate-bounce transition-transform duration-300" />
                <span className="text-[13px] font-black tracking-widest font-mono">
                  +91 79004 00300
                </span>
              </motion.a>
            </div>

          {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[100] bg-[#030008]/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 lg:hidden"
                >
                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 hover:bg-red-600/20 hover:border-red-600/40 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  {/* Decorative glow */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                  <div className="flex flex-col items-center space-y-6">
                    {[
                      { label: "About Us", id: "aboutus" },
                      { label: "Courses", id: "courses", isDropdown: true },
                      { label: "Why ZICA", id: "why-zica" },
                      { label: "Goals", id: "goals" },
                      { label: "Reviews", id: "reviews" },
                      { label: "FAQs", id: "faqs" },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ delay: 0.1 + idx * 0.07, duration: 0.4 }}
                        className="w-full flex flex-col items-center"
                      >
                        {item.isDropdown ? (
                          <div className="w-full flex flex-col items-center">
                            <button
                              onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                              className="text-3xl font-black text-white uppercase tracking-tighter hover:text-[#ff0000] transition-colors relative group flex items-center gap-2 cursor-pointer"
                            >
                              {item.label}
                              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileCoursesOpen ? 'rotate-180 text-red-500' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {isMobileCoursesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="w-full overflow-y-auto flex flex-col gap-5 mt-4 max-h-[360px] px-4 py-3 bg-white/[0.03] border border-white/5 rounded-2xl custom-scrollbar"
                                >
                                  {/* Sub-group: Animation */}
                                  <div className="flex flex-col items-center">
                                    <span className="text-[12px] font-black text-red-500 uppercase tracking-[0.2em] mb-2.5 border-b border-white/5 pb-1.5 w-1/2 text-center">Animation</span>
                                    <div className="flex flex-col items-center gap-2.5">
                                      {["2D Animation", "3D Animation", "3D Maya Course", "3DS Max"].map((courseName) => (
                                        <button
                                          key={courseName}
                                          onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsMobileCoursesOpen(false);
                                            openCourseDetail(courseName);
                                          }}
                                          className="text-lg font-bold text-white hover:text-red-500 uppercase transition-colors cursor-pointer"
                                        >
                                          {courseName}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Sub-group: VFX & Gaming */}
                                  <div className="flex flex-col items-center mt-3">
                                    <span className="text-[12px] font-black text-red-500 uppercase tracking-[0.2em] mb-2.5 border-b border-white/5 pb-1.5 w-1/2 text-center">VFX & Gaming</span>
                                    <div className="flex flex-col items-center gap-2.5">
                                      {["VFX Master", "Game Design"].map((courseName) => (
                                        <button
                                          key={courseName}
                                          onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsMobileCoursesOpen(false);
                                            openCourseDetail(courseName);
                                          }}
                                          className="text-lg font-bold text-white hover:text-red-500 uppercase transition-colors cursor-pointer"
                                        >
                                          {courseName}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Sub-group: Design & Editing */}
                                  <div className="flex flex-col items-center mt-3">
                                    <span className="text-[12px] font-black text-red-500 uppercase tracking-[0.2em] mb-2.5 border-b border-white/5 pb-1.5 w-1/2 text-center">Design & Editing</span>
                                    <div className="flex flex-col items-center gap-2.5">
                                      {["Graphic Designing", "Motion Graphics", "Architectural Design", "Video Editing"].map((courseName) => (
                                        <button
                                          key={courseName}
                                          onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsMobileCoursesOpen(false);
                                            openCourseDetail(courseName);
                                          }}
                                          className="text-lg font-bold text-white hover:text-red-500 uppercase transition-colors cursor-pointer"
                                        >
                                          {courseName}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setIsMenuOpen(false); scrollToSection(item.id); }}
                            className="text-3xl font-black text-white uppercase tracking-tighter hover:text-[#ff0000] transition-colors relative group cursor-pointer"
                          >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => { setIsMenuOpen(false); openLeadPopup(); }}
                      className="mt-6 bg-[#ff0000] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl shadow-red-600/30 hover:bg-red-600 transition-all"
                    >
                      Enquire Now
                    </motion.button>

                    <motion.a
                      href="tel:+917900400300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-2 text-white hover:text-red-500 transition-all duration-300 group/mob-phone py-2 cursor-pointer drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                    >
                      <Phone className="w-4 h-4 text-[#ff0000] group-hover/mob-phone:animate-bounce transition-transform duration-300" />
                      <span className="text-sm font-bold tracking-widest font-mono">
                        +91 79004 00300
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Hero Main */}
          <main className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 py-10 lg:py-4 min-h-0 relative">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[65%] flex flex-col justify-center space-y-6"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-[2px] bg-[#ff0000]" />
                  <span className="text-sm lg:text-base font-bold text-gray-400 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                    The Best Training Course
                  </span>
                </div>

                <div className="relative h-[80px] lg:h-[110px] flex items-center min-w-0">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentCourseIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute left-0 w-full"
                    >
                      <h1 className="flex flex-col text-[#ff0000] drop-shadow-[0_0_30px_rgba(255,0,0,0.5)] uppercase italic tracking-tighter leading-none py-2">
                        <span className="text-[clamp(2rem,7vw,4.5rem)] font-black leading-[0.9] tracking-tighter">
                          {COURSES[currentCourseIndex] || "Animation & VFX"}
                        </span>
                        <span className="text-[10px] lg:text-xs font-black text-white not-italic tracking-[0.4em] mt-4 opacity-60">
                          OFFICIAL TRAINING COURSE
                        </span>
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-gray-200 text-[clamp(0.85rem,1.2vw,0.95rem)] leading-relaxed max-w-2xl font-medium drop-shadow-md">
                Join ZICA Pitampura to master animation, VFX, gaming, and
                graphic design. Our expert instructors and state-of-the-art
                facilities provide hands-on experience with the latest
                technology.
              </p>

              {/* Trust Info */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 py-2">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#030008] overflow-hidden relative shadow-xl">
                        <Image
                          src={`/Trusted by/17073058${i === 1 ? '10351' : i === 2 ? '18392' : '26339'}testimonial_img0${i}.jpg`}
                          alt="Student"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-[13px]">
                    <p className="text-gray-400">Trusted by:</p>
                    <p className="font-bold">3k+ students</p>
                  </div>

                {/* Corporate Trust Logos */}
                <div className="flex items-center gap-4 lg:gap-6 border-l border-white/20 pl-4 lg:pl-6 py-1">
                  <div className="relative w-28 lg:w-40 h-10 lg:h-14 group cursor-pointer transition-all duration-500 hover:scale-110">
                    <Image
                      src="/footer/ZLL_Logo.png"
                      alt="Zee Learn Logo"
                      fill
                      className="object-contain brightness-110 saturate-150 transition-all duration-500 [filter:drop-shadow(0_0_1px_rgba(0,0,0,1))_drop-shadow(0_0_3px_rgba(0,0,0,1))_drop-shadow(0_0_8px_rgba(255,0,0,0.4))]"
                    />
                  </div>
                  <div className="relative w-28 lg:w-40 h-10 lg:h-14 group cursor-pointer transition-all duration-500 hover:scale-110">
                    <Image
                      src="/footer/Zee_Media_logo.png"
                      alt="Zee Media Logo"
                      fill
                      className="object-contain brightness-110 saturate-150 transition-all duration-500 [filter:drop-shadow(0_0_1px_rgba(0,0,0,1))_drop-shadow(0_0_3px_rgba(0,0,0,1))_drop-shadow(0_0_8px_rgba(255,0,0,0.4))]"
                    />
                  </div>
                </div>
              </div>

              {/* Recruiters Slider */}
              <div className="space-y-4">
                <p className="text-[13px] font-bold text-gray-200 uppercase tracking-widest">
                  Recruiters Who Trust Us:
                </p>
                <div className="w-full overflow-hidden relative">
                  <div className="flex gap-4 animate-logo-scroll hover:[animation-play-state:paused]">
                    {RECRUITERS.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 bg-white rounded-lg p-3 h-16 w-36 flex items-center justify-center shadow-lg group mx-2 transition-all duration-500"
                      >
                        <Image
                          src={`/Recruiters/${img}.png`}
                          alt="Recruiter"
                          width={120}
                          height={45}
                          className="object-contain max-h-full transition-all"
                          priority
                        />
                      </motion.div>
                    ))}
                    {/* Duplicate for seamless infinite scroll */}
                    {RECRUITERS.map((img, idx) => (
                      <div
                        key={`dup-${idx}`}
                        className="flex-shrink-0 bg-white rounded-lg p-3 h-16 w-36 flex items-center justify-center shadow-lg group mx-2 transition-all duration-500"
                      >
                        <Image
                          src={`/Recruiters/${img}.png`}
                          alt="Recruiter"
                          width={120}
                          height={45}
                          className="object-contain max-h-full"
                          priority
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
                {/* <button onClick={() => openCourseDetail(COURSES[currentCourseIndex])} className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-red-600/20 btn-glow">
                  Apply Now
                </button> */}
                <button onClick={() => scrollToSection('courses')} className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-red-600/20 btn-glow text-center">
                  Explore Our Courses
                </button>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-[80%] lg:w-[30%] flex justify-center lg:justify-end mx-auto lg:mx-0"
            >
              <div className="w-full max-w-[400px] bg-[#0a0a0a] border border-white/20 rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0000] to-transparent opacity-50 z-10" />
                <h2 className="text-2xl font-black text-center mb-8 tracking-tight text-white uppercase italic">
                  Download Brochure
                </h2>
                <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, "Download Brochure Form")}>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                      Full Name
                    </label>
                    <div className="relative">
                      <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input
                        name="fullName"
                        type="text"
                        required
                        placeholder="Enter name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-3 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input
                        name="phone"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit mobile number"
                        placeholder="Enter mobile number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-3 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Enter email address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-3 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                      Interested on...
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <select name="course" required defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-10 py-3 text-sm text-white appearance-none focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all cursor-pointer">
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
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <CaptchaField />
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-3.5 rounded-xl transition-all mt-4 text-sm uppercase tracking-widest active:scale-[0.98] shadow-lg shadow-red-600/30 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Download"}
                  </button>
                </form>
              </div>
            </motion.div>
          </main>
        </section>

        {/* --- ZICA WAY SECTION --- */}
        <section
          id="aboutus"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2rem,4vw,3.5rem)] bg-[#030008]/60 border-t border-white/5"
        >
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10">
            <h2 className="text-[clamp(1.5rem,4.5vw,2.8rem)] font-black text-center mb-8 lg:mb-12 leading-[1] uppercase tracking-tighter text-white text-glow max-w-4xl mx-auto">
              Entertainment, the{" "}
              <span className="text-[#ff0000]">ZICA Way—through</span> the eyes
              of our students.
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
              <div className="w-full md:flex-1 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative flex items-center justify-center perspective-1000">
                {/* Current Image Tile */}
                <motion.div
                  key={`current-${zicaWayIndex}`}
                  initial={{ opacity: 0, rotate: -5, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -8, x: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -15, x: -100, scale: 0.8 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-[55%] sm:w-[300px] lg:w-[400px] aspect-[4/5] rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl z-20"
                >
                  <Image
                    src={`/Zica-way-carousel/${ZICA_WAY_IMAGES[zicaWayIndex]}`}
                    alt="Student Work Current"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 55vw, (max-width: 1200px) 300px, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>

                {/* Next Image Tile (Preview) */}
                <motion.div
                  key={`next-${zicaWayIndex}`}
                  initial={{ opacity: 0, rotate: 5, x: 50, scale: 0.8 }}
                  animate={{ opacity: 0.6, rotate: 8, x: 0, scale: 0.9 }}
                  exit={{ opacity: 0, rotate: 15, x: 100, scale: 0.7 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="relative w-[45%] sm:w-[250px] lg:w-[350px] aspect-[4/5] rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden border border-white/10 shadow-xl z-10 -ml-12 sm:-ml-20 lg:-ml-32 grayscale-[0.5] hover:grayscale-0 transition-all cursor-pointer"
                  onClick={() => setZicaWayIndex((prev) => (prev + 1) % ZICA_WAY_IMAGES.length)}
                >
                  <Image
                    src={`/Zica-way-carousel/${ZICA_WAY_IMAGES[(zicaWayIndex + 1) % ZICA_WAY_IMAGES.length]}`}
                    alt="Student Work Next"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, (max-width: 1200px) 250px, 350px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* Carousel Indicators (Minimalist) */}
                <div className="absolute bottom-4 md:-bottom-12 lg:-bottom-16 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 flex items-center gap-2 z-30">
                   <span className="text-xs font-bold text-gray-500 tabular-nums">0{zicaWayIndex + 1}</span>
                   <div className="w-20 h-[1px] bg-white/10 relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-[#ff0000]"
                        animate={{ width: `${((zicaWayIndex + 1) / ZICA_WAY_IMAGES.length) * 100}%` }}
                      />
                   </div>
                   <span className="text-xs font-bold text-gray-500 tabular-nums">0{ZICA_WAY_IMAGES.length}</span>
                </div>
              </div>

              <div className="w-full md:w-[45%] lg:w-[450px] space-y-8 text-center md:text-left mt-12 md:mt-0">
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                    Step Into a World of Limitless Creativity — Discover the
                    Outstanding Creations of Our ZICA Students!
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Be amazed and inspired by the exceptional talent,
                    imagination, and passion of our students as they bring ideas
                    to life across diverse creative fields. From jaw-dropping{" "}
                    <span className="text-white font-bold">VFX</span>, to
                    immersive{" "}
                    <span className="text-white font-bold">Gaming</span>,
                    stylish{" "}
                    <span className="text-white font-bold">
                      Interior and Fashion Design
                    </span>
                    , impactful{" "}
                    <span className="text-white font-bold">
                      Digital Marketing
                    </span>
                    , and stunning{" "}
                    <span className="text-white font-bold">Photography</span> —
                    every project is a testament to their dedication and skill.
                  </p>
                  <p className="text-white font-bold italic">
                    This is where the future of creative entertainment begins —
                    only at ZICA.
                  </p>
                </div>

                <div className="flex justify-center md:justify-start">
                  <button onClick={() => openLeadPopup()} className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 active:scale-95">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VIDEO SHOWCASE SECTION --- */}
        <VideoShowcase onCtaClick={() => openLeadPopup()} />

        {/* --- PROGRAMS SECTION --- */}
        <section
          id="courses"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,5vw,4.5rem)] bg-black/60 overflow-hidden border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-[1600px] mx-auto w-full"
          >
            <div className="text-center mb-12 space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] text-white text-glow mb-6">
                  Discover Our <span className="text-[#ff0000]">Programs</span>
                </h2>
                <p className="text-gray-400 text-[clamp(0.85rem,1.2vw,0.95rem)] leading-relaxed font-medium max-w-3xl mx-auto">
                  Unlock your potential with our industry-vetted creative
                  courses. From 3D Animation to Architectural Design, we provide
                  the tools to turn your imagination into a professional career.
                </p>
              </div>
              <button onClick={() => openLeadPopup()} className="bg-[#ff0000] hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-600/20 active:scale-95 btn-glow">
                Apply Now
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {[
                {
                  title: "Graphic",
                  highlight: "Designing",
                  image: "Graphic-Designing-1.png",
                  desc: "Master visual communication, branding, and typography using industry-standard tools like Adobe Photoshop, Illustrator, and InDesign.",
                  featured: true,
                },
                {
                  title: "2D",
                  highlight: "Animation",
                  image: "2D-Animation.png",
                  desc: "Learn the complete 2D production pipeline from art fundamentals to character design, background painting, and advanced digital animation.",
                  featured: true,
                },
                {
                  title: "3D",
                  highlight: "Animation",
                  image: "3D-Animation.png",
                  desc: "Dive into character modeling, texturing, rigging, and performance-driven animation in a three-dimensional space.",
                },
                {
                  title: "Motion",
                  highlight: "Graphics",
                  image: "Motion-Graphics.png",
                  desc: "Combine graphic design with animation principles to create dynamic, moving visuals for broadcast and web.",
                },
                {
                  title: "VFX",
                  highlight: "Master",
                  image: "Visual-Effects.png",
                  desc: "Master compositing, green-screen removal, 3D tracking, and dynamic simulation with Nuke and industry tools.",
                },
                {
                  title: "Game",
                  highlight: "Design",
                  image: "Game-Design.png",
                  desc: "Build interactive worlds and learn gameplay mechanics. Master Unity and Unreal Engine to create immersive gaming experiences.",
                  featured: true,
                },
                {
                  title: "3DS",
                  highlight: "Max",
                  image: "3Ds-Max.png",
                  desc: "Explore 3D modeling and rendering using Autodesk 3ds Max for architecture, products, and entertainment.",
                  featured: true,
                },
                {
                  title: "3D",
                  highlight: "Maya Course",
                  image: "3D-Maya.png",
                  desc: "Step into the world of high-end animation and visual effects. Master the full pipeline of 3D animation from character modeling to emotional expression.",
                },
                {
                  title: "Architectural",
                  highlight: "Design",
                  image: "Architectural-Design.png",
                  desc: "Learn space planning, drafting, and design using AutoCAD and Revit to produce industry-standard presentations.",
                },
                {
                  title: "Video",
                  highlight: "Editing",
                  image: "video-Editing.png",
                  desc: "Master post-production with professional cutting, color correction, and sound mixing using Premiere Pro and DaVinci Resolve.",
                },
              ].map((course, idx) => {
                const isFeatured = !!(course as any).featured;
                return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.04,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  viewport={{ once: true }}
                  onClick={() => openCourseDetail(`${course.title} ${course.highlight}`.trim())}
                  className={`group bg-[#0a0a0a] rounded-[24px] overflow-hidden shadow-2xl hover:shadow-red-600/10 transition-all cursor-pointer border border-white/10 hover:border-red-600/30 ${
                    isFeatured
                      ? 'lg:col-span-3 flex flex-col lg:flex-row'
                      : 'lg:col-span-2 flex flex-col'
                  }`}
                >
                  <div className={`relative overflow-hidden flex-shrink-0 ${
                    isFeatured
                      ? 'aspect-[4/3] lg:aspect-auto lg:w-[45%]'
                      : 'aspect-[16/10]'
                  }`}>
                    <Image
                      src={`/Program/${course.image}`}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className={`flex flex-col flex-1 justify-center ${
                    isFeatured ? 'p-6 lg:p-8' : 'p-5 lg:p-6'
                  }`}>
                    <h3 className={`font-black text-white leading-tight uppercase mb-3 ${
                      isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'
                    }`}>
                      {course.title}{" "}
                      <span className="text-[#ff0000]">{course.highlight}</span>
                    </h3>
                    <p className="text-gray-500 text-xs lg:text-sm leading-relaxed flex-1 mb-4">
                      {course.desc}
                    </p>
                    <div className="flex items-center text-red-600 font-bold uppercase tracking-[0.15em] text-[10px]">
                      <div className="relative h-4 overflow-hidden group/btn">
                        <span className="block transition-transform duration-700 ease-in-out group-hover/btn:-translate-y-full">Explore Program</span>
                        <span className="block absolute top-0 left-0 transition-transform duration-700 ease-in-out translate-y-full group-hover/btn:translate-y-0 text-red-500">Enroll Now →</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-500 group-hover:translate-x-2" />
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* --- WHY CHOOSE ZICA SECTION (DARK RE-DESIGN) --- */}
        <section
          id="why-zica"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,5vw,4.5rem)] bg-black overflow-hidden border-t border-white/5"
        >

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto relative z-10"
          >
            <div className="text-center mb-10">
              <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white text-glow">
                Why Should You Choose <br className="hidden lg:block" />
                <span className="text-[#ff0000]">ZICA Pitampura?</span>
              </h2>
              <div className="w-24 h-1 bg-[#ff0000] mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="w-full lg:w-[45%] rounded-[40px] overflow-hidden shadow-2xl relative aspect-[4/5] border border-white/10 group"
              >
                <Image
                  src="/why_choose_zica_boy.png"
                  alt="ZICA Student Animation"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              <div className="w-full lg:w-[55%] space-y-10">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 text-center sm:text-left"
                >
                  <div className="w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 relative">
                    {mounted && (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[#ff0000]">
                          {[...Array(12)].map((_, i) => (
                            <circle 
                              key={i}
                              cx={50 + 20 * Math.cos((i * Math.PI * 2) / 12)}
                              cy={50 + 20 * Math.sin((i * Math.PI * 2) / 12)}
                              r="30"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          ))}
                          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-4xl font-black leading-tight text-white">
                      Transform your creativity into a professional career in
                      Animation & VFX.
                    </h3>
                    <p className="text-gray-400 text-lg">
                      ZICA Pitampura helps you master the art of animation,
                      visual effects, and design through expert-led training and
                      real industry experience.
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    "Industry-Ready Curriculum",
                    "Modern Labs & Software",
                    "Experienced Mentor",
                    "Creative Learning Environment",
                    "100% Placement Assistance",
                    "Flexible Fee & Loan Options",
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-3 h-3 bg-red-600 flex-shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                      <span className="font-bold text-gray-200 tracking-tight transition-colors group-hover:text-white">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center lg:justify-start">
                  <motion.button
                    onClick={() => openLeadPopup()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#ff0000] hover:bg-red-700 text-white px-12 py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 active:scale-95 btn-glow"
                  >
                    Talk to Counsellor
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- REVIEWS SECTION --- */}
        <section
          id="reviews"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,5vw,4.5rem)] bg-black/60 overflow-hidden border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto relative z-10"
          >
            <div className="text-center space-y-4 mb-8 lg:mb-10">
              <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.9] text-white text-glow uppercase tracking-tighter mb-4">
                Hear From <span className="text-[#ff0000]">Our</span> Students
              </h2>
              <p className="text-gray-400 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed font-medium max-w-2xl mx-auto">
                Hear How ZICA's Industry-Focused Training and Supportive
                Environment Helped Students Achieve Their Dreams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {TESTIMONIALS.slice(0, 2).map((testi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0a0a0a] border border-white/10 rounded-[24px] p-6 lg:p-10 flex flex-col items-center text-center space-y-6 relative group hover:border-red-600/30 transition-all shadow-2xl"
                >
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(testi.star) ? "fill-current" : "text-gray-600"} ${i === Math.floor(testi.star) && testi.star % 1 !== 0 ? "fill-current opacity-50" : ""}`}
                      />
                    ))}
                  </div>
                  {testi.role && (
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">
                      {testi.role}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm lg:text-[15px] leading-relaxed italic font-medium">
                    "{testi.review}"
                  </p>
                  <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-red-600/30 overflow-hidden relative shadow-xl group-hover:border-red-600 transition-colors">
                      <Image
                        src={`/Testimonial/${testi.image}`}
                        alt={testi.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 64px, 80px"
                      />
                    </div>
                    <h3 className="text-white font-black text-sm lg:text-base tracking-widest uppercase transition-colors group-hover:text-red-600">
                      {testi.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTestimonialModalOpen(true)}
                className="group relative px-12 py-5 bg-[#ff0000] border border-red-600/50 rounded-2xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all shadow-[0_10px_40px_rgba(255,0,0,0.3)] hover:shadow-red-600/50 active:scale-95"
              >
                <span className="relative z-10 text-white group-hover:scale-110 transition-transform inline-block">View More Reviews</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>


          </motion.div>
        </section>

        {/* --- GOALS SECTION --- */}
        <section
          id="goals"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,5vw,4.5rem)] bg-black/60 border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto"
          >
            <div className="text-center mb-8 lg:mb-10 space-y-4">
              <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white uppercase tracking-tighter leading-[0.9] text-glow mb-4">
                The Right Place <br className="hidden lg:block" />
                <span className="text-[#ff0000]">Achieve Your Goals</span>
              </h2>
              <p className="text-gray-400 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed font-medium max-w-3xl mx-auto">
                India's premier institute offering comprehensive training in
                both traditional and digital animation, nurturing the next
                generation of creative professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title:
                    "India's Premier Traditional & Digital Animation Institute",
                  desc: "India's premier institute offering comprehensive training in both traditional and digital animation, nurturing the next generation of creative professionals.",
                  icon: <Layers className="w-8 h-8 text-white" />,
                },
                {
                  title: "Emphasize on pre-production which is very important",
                  desc: "Pre-production is the most critical phase of any project—it lays the foundation, ensuring clarity, efficiency, and a smooth execution.",
                  icon: <PenTool className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "Current industry standard & career focused course curriculum",
                  desc: "Our curriculum is designed to meet current industry standards, blending practical skills with career-focused training.",
                  icon: <Cpu className="w-8 h-8 text-white" />,
                },
                {
                  title: "Student Loan Facility",
                  desc: "We offer a convenient student loan facility with flexible repayment options, making quality education accessible without financial stress.",
                  icon: <Briefcase className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "Collaboration with well-known university to provide animation VFX degree",
                  desc: "We collaborate with a renowned university to offer an industry-recognized Animation and VFX degree.",
                  icon: <GraduationCap className="w-8 h-8 text-[#ff0000]" />,
                  redTitle: true,
                },
                {
                  title:
                    "Dedicated online and in-class training platform for Students",
                  desc: "We provide a dedicated online and in-class training platform, ensuring flexible, interactive, and personalized learning experiences.",
                  icon: <Globe className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "Access to world-class infrastructure & latest software",
                  desc: "Students get access to world-class infrastructure and the latest industry-standard software, enabling hands-on experience.",
                  icon: <Layout className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "Monthly & yearly activities to enhance competitive spirit among students",
                  desc: "We organize monthly and yearly activities designed to enhance the competitive spirit among students, fostering growth and teamwork.",
                  icon: <Award className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "E-Studio — an exclusive online app for you to access e-books, on the go.",
                  desc: "E-Studio is our exclusive online app that gives you easy access to e-books and learning resources, allowing you to study anytime, anywhere.",
                  icon: <Smartphone className="w-8 h-8 text-white" />,
                },
                {
                  title: "Fun-filled studio study environment",
                  desc: "Our fun-filled studio study environment blends creativity with learning, offering an inspiring space where students can engage.",
                  icon: <Users className="w-8 h-8 text-white" />,
                },
                {
                  title: "Guidance to develop your own portfolio & show reel",
                  desc: "We provide expert guidance to help you develop your own portfolio and showreel, ensuring you showcase your skills and creativity.",
                  icon: <Video className="w-8 h-8 text-white" />,
                },
                {
                  title:
                    "Opportunities for placements with top animation & VFX studios",
                  desc: "We offer exclusive placement opportunities with top animation and VFX studios, giving students a direct pathway to kickstart their careers.",
                  icon: <BookOpen className="w-8 h-8 text-white" />,
                },
              ].map((goal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-black border border-white/10 rounded-[20px] p-6 lg:p-8 space-y-5 flex flex-col hover:border-red-600/30 transition-all group"
                >
                  <div className="flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                    {goal.icon}
                  </div>
                  <div className="space-y-4">
                    <h3
                      className={`text-lg font-black uppercase tracking-tight leading-tight transition-colors ${goal.redTitle ? "text-[#ff0000]" : "text-white group-hover:text-red-600"}`}
                    >
                      {goal.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- IMPACT SECTION --- */}
        <section
          id="why-zica"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(1.5rem,3vw,2.5rem)] bg-black/60 border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto"
          >
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-center mb-4 lg:mb-6 text-white text-glow uppercase tracking-tighter leading-[0.9]">
              Our <span className="text-[#ff0000]">Impact</span>
            </h2>

            <div className="bg-[#0a0a0a] border-4 border-[#2d1b4d] rounded-[40px] p-4 lg:p-6 shadow-[0_0_50px_rgba(45,27,77,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { val: "95%+", label: "Placements" },
                  { val: "100+", label: "Recruiters" },
                  { val: "20,000+", label: "Careers" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-black border border-white/20 rounded-[24px] py-6 text-center space-y-2 hover:border-red-600/40 transition-all group cursor-default"
                  >
                    <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter group-hover:text-red-600 transition-colors duration-500">
                      {stat.val}
                    </p>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <FAQSection 
          handleFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />

        {/* --- FOOTER --- */}
        <footer className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] pt-12 pb-8 bg-black border-t border-white/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
              {/* Powered By */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h3 className="text-white font-black uppercase tracking-[0.15em] text-xs">
                    Powered by
                  </h3>
                </div>
                <div className="relative w-48 h-20 transition-all duration-500 hover:scale-105">
                  <Image
                    src="/footer/ZLL_Logo.png"
                    alt="Zee Learn Logo"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Reflect on your creative journey, evaluate your performance,
                  seek constructive feedback, and continuously enhance your
                  artistic and technical skills with us.
                </p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="text-white hover:text-red-600 cursor-pointer transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="text-white hover:text-red-600 cursor-pointer transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div className="text-white hover:text-red-600 cursor-pointer transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.981.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Placement Partner */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h3 className="text-white font-black uppercase tracking-[0.15em] text-xs">
                    Placement Partner
                  </h3>
                </div>
                <div className="relative w-48 h-20 transition-all duration-500 hover:scale-105">
                  <Image
                    src="/footer/Zee_Media_logo.png"
                    alt="Zee Media Logo"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h3 className="text-white font-black uppercase tracking-[0.15em] text-xs">
                    Quick Links
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-400 font-medium">
                  {[
                    { label: "About Us", id: "aboutus" },
                    { label: "Courses", id: "courses" },
                    { label: "Why ZICA", id: "why-zica" },
                    { label: "Goals", id: "goals" },
                    { label: "Reviews", id: "reviews" },
                    { label: "FAQ's", id: "faqs" },
                  ].map((link, i) => (
                    <li
                      key={i}
                      className="hover:text-white cursor-pointer transition-colors"
                    >
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-left bg-transparent border-none p-0 text-inherit font-inherit cursor-pointer hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h3 className="text-white font-black uppercase tracking-[0.15em] text-xs">
                    Contact Info
                  </h3>
                </div>
                <div className="space-y-6 flex flex-col items-center md:items-start">
                  <button onClick={() => openLeadPopup("Call Us", true)} className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-red-600 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider">
                      +91 7900400300
                    </span>
                  </button>
                  <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-red-600 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider">
                       info@zicapitampura.com
                    </span>
                  </div>
                  <div className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-red-600 transition-all flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider leading-relaxed text-center md:text-left">
                      1st floor, 150, Kapil Vihar,
                      <br />
                      Pitampura, Delhi 110034
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left pr-0 md:pr-24">
              <p className="text-gray-500 text-sm font-medium">
                © 2025 ZICA Pitampura. All rights reserved.
              </p>
              <div className="flex gap-2 text-gray-500 text-sm font-medium justify-center">
                <Link href="/privacy-policy" className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="hover:text-white cursor-pointer transition-colors">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </footer>


      </motion.div>

      {/* --- CINEMATIC STICKY QUICK ACCESS BAR --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[150] flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden rounded-l-3xl border-l border-y border-white/10 group/sidebar">
        {/* Call Button */}
        <motion.button
          onClick={() => openLeadPopup("Call Us", true)}
          whileHover={{ x: -10, scale: 1.15 }}
          className="w-16 h-16 bg-[#ff4d5a] flex items-center justify-center text-white relative transition-all duration-300 border-b border-white/10 group/btn cursor-pointer"
        >
          <Phone className="w-7 h-7" />
          {/* Label that is visible and slides slightly on hover */}
          <span className="absolute right-full mr-2 bg-[#ff4d5a] px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-2xl">Call Me</span>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/917900400300"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -10, scale: 1.1 }}
          className="w-16 h-16 bg-[#25d366] flex items-center justify-center text-white relative transition-all duration-300 border-b border-white/10"
        >
          <MessageCircle className="w-7 h-7 fill-white/10" />
          <span className="absolute right-full mr-4 bg-[#25d366] px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">WhatsApp</span>
        </motion.a>

        {/* Inquiry / Popup Button */}
        <motion.button
          onClick={() => openLeadPopup()}
          whileHover={{ x: -10, scale: 1.1 }}
          className="w-16 h-16 bg-[#0a0a0a] flex items-center justify-center text-white relative transition-all duration-300"
        >
          <ChevronRight className="w-7 h-7 text-red-600 animate-pulse" />
          <span className="absolute right-full mr-4 bg-[#0a0a0a] px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">Enquire Now</span>
        </motion.button>
      </div>

      {/* --- FLOATING ENQUIRY BUTTON --- */}
      <motion.button
        onClick={() => openLeadPopup("Call Us", true)}
        id="floating-enquiry-btn"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15 }}
        className="fixed bottom-8 right-8 z-[200] w-20 h-20 rounded-full shadow-[0_12px_40px_rgba(255,0,0,0.5)] flex items-center justify-center group/fab cursor-pointer"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 group-hover/fab:from-red-400 group-hover/fab:via-red-500 group-hover/fab:to-red-700 transition-all duration-500" />

        {/* Pulsing ripple */}
        <div className="absolute inset-0 rounded-full animate-ping bg-red-600/25" style={{ animationDuration: '2.5s' }} />
        <div className="absolute -inset-2 rounded-full bg-red-600/20 blur-xl animate-pulse" />

        {/* Icon */}
        <Phone className="w-9 h-9 text-white relative z-10" />

        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030008] flex items-center justify-center z-20">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>

        {/* Tooltip label */}
        <span className="absolute right-full mr-3 bg-[#0a0a0a] border border-white/10 text-white px-6 py-3 rounded-2xl text-[13px] font-bold whitespace-nowrap opacity-100 transition-all duration-300 pointer-events-none shadow-2xl">
          📞 Call Me        </span>
      </motion.button>
      <CourseDetailModal
        isOpen={isCourseDetailOpen}
        onClose={() => {
          setIsCourseDetailOpen(false);
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            window.history.pushState(null, '', '/');
          }
        }}
        course={selectedCourseData}
        variants={courseVariants}
        onVariantChange={(variant: any) => setSelectedCourseData(variant)}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
      <LeadPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitText={popupSubmitText}
        minimal={isPopupMinimal}
      />

      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        testimonials={TESTIMONIALS.slice(2)}
      />
    </div>
  );
}