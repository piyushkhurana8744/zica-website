"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { div } from "framer-motion/client";

const COURSES = [
  "Graphic Designing",
  "2D Animation",
  "3D Animation",
  "Motion Graphics",
  "3D Maya",
  "Architectural Design",
  "VFX Master",
  "Game Design",
  "Video Editing",
];

const RECRUITERS = [
  "1st",
  "2st",
  "3rd",
  "4th",
  "1st",
  "2st",
  "3rd",
  "4th",
  "1st",
  "2st",
  "3rd",
  "4th",
];

const TRUSTED_AVATARS = [
  "1707305810351testimonial_img01.jpg",
  "1707305818392testimonial_img02.jpg",
  "1707305826339testimonial_img03.jpg",
];

const ZICA_WAY_IMAGES = [
  "img-carousel-about-us1.webp",
  "img-carousel-about-us2.webp",
  "project-img3-420x520-1.webp",
  "project-img9-420x520-2.webp",
  "robot_work_1.png",
  "robot_work_2.png",
];

const HERO_SLIDES = [
  "/hero-slides/graphic-design.png",
  "/hero-slides/2d-animation.png",
  "/hero-slides/3d-animation.png",
  "/hero-slides/motion-graphics.png",
  "/hero-slides/3d-maya.png",
  "/hero-slides/architectural-design.png",
  "/hero-slides/vfx-master.png",
  "/hero-slides/game-design.png",
  "/hero-slides/video-editing.png",
];

export default function Home() {
  const router = useRouter();
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(2);
  const [zicaWayIndex, setZicaWayIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      course: formData.get('course'),
      formType: formType
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      
      if (result.success) {
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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = target.closest('button') || 
                       target.closest('a') || 
                       target.closest('input') || 
                       target.closest('select') ||
                       target.getAttribute('role') === 'button';
      
      const isMedia = target.closest('img') || target.closest('video');

      if (isPointer) {
        setCursorVariant("pointer");
      } else if (isMedia) {
        setCursorVariant("media");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

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
      setIsPopupOpen(true);
    };

    // 2. Scroll Trigger (20% or 600px)
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = totalHeight > 0 ? scrolled / totalHeight : 0;
      
      if (scrollPercentage > 0.2 || scrolled > 600) {
        console.log("Scroll threshold met, showing popup");
        triggerPopup();
        window.removeEventListener("scroll", handleScroll);
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
      window.addEventListener("mouseleave", handleExitIntent);
    }, 200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseleave", handleExitIntent);
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
              <Link href="#home" className="relative z-[110] group">
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-red-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
                  <Image
                    src="/ZICA-LOGO-PNG.png"
                    alt="ZICA Logo"
                    width={220}
                    height={56}
                    className="h-10 lg:h-14 w-auto brightness-125 transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] relative z-10"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Center: Navigation — Glassmorphism Pill */}
            <div className="hidden lg:flex flex-none items-center justify-center relative">
              <div className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full px-2 py-1.5 relative overflow-hidden">
                {/* Animated gradient border glow */}
                <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,0,0,0.1), rgba(168,85,247,0.1), transparent)', backgroundSize: '200% 100%', animation: 'gradient-shift 4s linear infinite' }} />
                
                {[
                  { label: "About", href: "#about" },
                  { label: "Programs", href: "#program" },
                  { label: "Why ZICA", href: "#why-zica" },
                  { label: "Goals", href: "#goals" },
                  { label: "Reviews", href: "#testimonials" },
                  { label: "FAQs", href: "#faqs" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="relative px-5 py-2.5 text-[13px] font-black text-gray-300 uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:text-white hover:bg-white/[0.08] group/link"
                    >
                      {item.label}
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 rounded-full transition-all duration-500 group-hover/link:w-[50%]" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex-1 flex justify-end">
                {/* Enroll Now Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPopupOpen(true)}
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
                      { label: "About Us", href: "#about" },
                      { label: "Programs", href: "#program" },
                      { label: "Why ZICA", href: "#why-zica" },
                      { label: "Goals", href: "#goals" },
                      { label: "Reviews", href: "#testimonials" },
                      { label: "FAQs", href: "#faqs" },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ delay: 0.1 + idx * 0.07, duration: 0.4 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-3xl font-black text-white uppercase tracking-tighter hover:text-[#ff0000] transition-colors relative group"
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </motion.div>
                    ))}
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => { setIsMenuOpen(false); setIsPopupOpen(true); }}
                      className="mt-6 bg-[#ff0000] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl shadow-red-600/30 hover:bg-red-600 transition-all"
                    >
                      Enquire Now
                    </motion.button>
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
              <div className="flex items-center gap-4 py-2">
                <div className="flex -space-x-3">
                  {TRUSTED_AVATARS.map((img) => (
                    <div
                      key={img}
                      className="w-11 h-11 rounded-full border-2 border-black overflow-hidden relative shadow-lg"
                    >
                      <Image
                        src={`/Trusted by/${img}`}
                        alt="Student"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-[13px]">
                  <p className="text-gray-400">Trusted by:</p>
                  <p className="font-bold">3k+ students</p>
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
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
                <button onClick={() => setIsPopupOpen(true)} className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-red-600/20 btn-glow">
                  Apply Now
                </button>
                <Link href="#program" className="border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 text-center">
                  Explore Our Courses
                </Link>
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
                <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e, "Hero Brochure Form")}>
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
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
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
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
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
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 group/input">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                      Interested on...
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                      <select name="course" defaultValue="Animation" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-sm text-white appearance-none focus:outline-none focus:border-red-600/50 focus:bg-white/[0.08] transition-all cursor-pointer">
                        <option className="bg-black" value="Animation">Animation</option>
                        <option className="bg-black" value="VFX - Visual Effects">VFX - Visual Effects</option>
                        <option className="bg-black" value="Gaming">Gaming</option>
                        <option className="bg-black" value="Graphic Design">Graphic Design</option>
                        <option className="bg-black" value="Motion Graphics">Motion Graphics</option>
                        <option className="bg-black" value="Video Editing">Video Editing</option>
                        <option className="bg-black" value="Unreal Engine">Unreal Engine</option>
                        <option className="bg-black" value="Blender Mastery">Blender Mastery</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all mt-4 text-sm uppercase tracking-widest active:scale-[0.98] shadow-lg shadow-red-600/30 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit Now"}
                  </button>
                </form>
              </div>
            </motion.div>
          </main>
        </section>

        {/* --- ZICA WAY SECTION --- */}
        <section
          id="about"
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
                  <button onClick={() => setIsPopupOpen(true)} className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 active:scale-95">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROGRAMS SECTION --- */}
        <section
          id="program"
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
              <button onClick={() => setIsPopupOpen(true)} className="bg-[#ff0000] hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-600/20 active:scale-95 btn-glow">
                Enquire Now
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
                  desc: "Learn the art of traditional and digital frame-by-frame animation with character development, storyboarding, and the 12 principles of animation.",
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
                  title: "Visual",
                  highlight: "Effects (VFX)",
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
                  highlight: "Maya",
                  image: "3D-Maya.png",
                  desc: "A comprehensive course in Maya for professional film and game production with advanced rigging and simulation.",
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
          id="about"
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
                    onClick={() => setIsPopupOpen(true)}
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

        {/* --- TESTIMONIALS SECTION --- */}
        <section
          id="testimonials"
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
              {[
                {
                  name: "SHANEL MORAES",
                  img: "1707305845930testimonial_img05.jpg",
                  rating: 4.5,
                  quote:
                    "ZICA has been an amazing place to be at; the teachers, as well as the staff have been very helpful since the beginning. Throughout the years I spent here, I have grown abundantly in knowledge and learnt various techniques used in the actual Animation field.",
                },
                {
                  name: "SUMIT BADONIYA",
                  img: "1707305855603testimonial_img06.jpg",
                  rating: 5,
                  role: "NY VFXWAALA AS 3D ARTIST",
                  quote:
                    "I would like to thank ZICA for providing quality education and guidance. Their focus on each student truly makes a difference. Specialized faculties helped us grow in our chosen creative fields. Their support and expertise played a big role in our development.",
                },
              ].map((testi, idx) => (
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
                        className={`w-5 h-5 ${i < Math.floor(testi.rating) ? "fill-current" : "text-gray-600"} ${i === 4 && testi.rating === 4.5 ? "fill-current opacity-50" : ""}`}
                      />
                    ))}
                  </div>
                  {testi.role && (
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                      {testi.role}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm lg:text-[15px] leading-relaxed italic font-medium">
                    "{testi.quote}"
                  </p>
                  <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-red-600/30 overflow-hidden relative shadow-xl group-hover:border-red-600 transition-colors">
                      <Image
                        src={`/Testimonial/${testi.img}`}
                        alt={testi.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-white font-black text-sm lg:text-base tracking-widest uppercase transition-colors group-hover:text-red-600">
                      {testi.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
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
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-center mb-6 lg:mb-8 text-white text-glow uppercase tracking-tighter leading-[0.9]">
              Our <span className="text-[#ff0000]">Impact</span>
            </h2>

            <div className="bg-[#0a0a0a] border-4 border-[#2d1b4d] rounded-[40px] p-4 lg:p-6 shadow-[0_0_50px_rgba(45,27,77,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="bg-black border border-white/20 rounded-[24px] py-8 text-center space-y-3 hover:border-red-600/40 transition-all group cursor-default"
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

        {/* --- FAQS & CONTACT SECTION --- */}
        <section
          id="faqs"
          className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3.5rem,8vw,6rem)] bg-black/60 border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24"
          >
            {/* FAQ Column */}
            <div className="space-y-12">
              <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white uppercase tracking-tighter leading-[0.9] text-glow">

                Got <span className="text-[#ff0000]">Questions?</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Are drawing skills compulsory for doing the animation Program?",
                    a: "For 2D animation, drawing skills are a must. If you’re more interested in 3D animation, you can manage without drawing.",
                  },
                  {
                    q: "Which course I should prefer after Grade 12th?",
                    a: "After 12th you should opt for a career-oriented program. The duration of the program should be 2 years or more.",
                  },
                  {
                    q: "What type of Courses available at ZICA? What is the difference between 1 Year & 2 Year Program?",
                    a: "ZICA has programs from 2D animation course, 3D animation course, Visual Effects Course, Graphic design course, Web design course, Interior design course, Fashion Design Course etc. The duration of the program varies from 3 months to 3 years. \n\nTwo-to-three-year programs are career oriented and comprehensive programs for 10th or 12th pass students. One year programs are very focused industry standard programs for the students who are studying or completed Graduation or Post-Graduation.",
                  },
                  {
                    q: "Is your faculty from Industry?",
                    a: "YYes. We hire faculties with a minimum of 2 years of production and 2 years of training experience.",
                  },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <div
                      onClick={() =>
                        setExpandedFaq(expandedFaq === idx ? null : idx)
                      }
                      className="border border-white/20 rounded-xl px-6 py-5 flex items-center justify-between cursor-pointer hover:border-red-600/40 transition-all bg-black/50 backdrop-blur-sm group"
                    >
                      <p className="text-sm lg:text-base font-bold text-gray-200 group-hover:text-white transition-colors">
                        {faq.q}
                      </p>
                      {expandedFaq === idx ? (
                        <div className="w-5 h-0.5 bg-red-600" />
                      ) : (
                        <div className="text-xl text-white group-hover:text-red-600 transition-colors">
                          +
                        </div>
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
              <h3 className="text-4xl font-black text-white text-center uppercase italic text-glow">
                Enquiry Now
              </h3>
              <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, "Footer Enquiry Form")}>
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-red-600 transition-colors">
                    Interested on...
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-focus-within/input:text-red-600 transition-colors" />
                    <select name="course" defaultValue="Animation" className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-10 py-4 text-white focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                      <option className="bg-black" value="Animation">Animation</option>
                      <option className="bg-black" value="VFX - Visual Effects">VFX - Visual Effects</option>
                      <option className="bg-black" value="Gaming">Gaming</option>
                      <option className="bg-black" value="Graphic Design">Graphic Design</option>
                      <option className="bg-black" value="Motion Graphics">Motion Graphics</option>
                      <option className="bg-black" value="Video Editing">Video Editing</option>
                      <option className="bg-black" value="Unreal Engine">Unreal Engine</option>
                      <option className="bg-black" value="Blender Mastery">Blender Mastery</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-5 rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] btn-glow disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] pt-24 pb-12 bg-black border-t border-white/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-center md:text-left">
              {/* Powered By */}
              <div className="flex flex-col items-center md:items-start space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">
                    Powered by
                  </h4>
                </div>
                <div className="relative w-48 h-20">
                  <Image
                    src="/footer/ZLL_Logo.png"
                    alt="Zee Learn Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Reflect on your creative journey, evaluate your performance,
                  seek constructive feedback, and continuously enhance your
                  artistic and technical skills with us.
                </p>
                <div className="flex items-center gap-6 justify-center md:justify-start">
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
              <div className="flex flex-col items-center md:items-start space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">
                    Placement Partner
                  </h4>
                </div>
                <div className="relative w-48 h-20">
                  <Image
                    src="/footer/Zee_Media_logo.png"
                    alt="Zee Media Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col items-center md:items-start space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">
                    Quick Links
                  </h4>
                </div>
                <ul className="space-y-4 text-gray-400 font-medium">
                  {[
                    { label: "About Us", href: "#about" },
                    { label: "Our Program", href: "#program" },
                    { label: "Why ZICA", href: "#why-zica" },
                    { label: "Goals", href: "#goals" },
                    { label: "Testimonials", href: "#testimonials" },
                    { label: "FAQ's", href: "#faqs" },
                  ].map((link, i) => (
                    <li
                      key={i}
                      className="hover:text-white cursor-pointer transition-colors"
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center md:items-start space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4 mx-auto md:mx-0" />
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">
                    Contact Info
                  </h4>
                </div>
                <div className="space-y-6 flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-red-600 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider">
                      +91 7900400300
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 group-hover:bg-red-600 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider">
                      info@Pitampura.com
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

            <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
              <p className="text-gray-500 text-sm font-medium">
                © 2025 ZICA Pitampura. All rights reserved.
              </p>
              <div className="flex gap-8 text-gray-500 text-sm font-medium justify-center">
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms and Conditions
                </span>
              </div>
            </div>
          </div>
        </footer>


      </motion.div>
      {/* --- SMART CINEMATIC POPUP --- */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Popup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.4)] flex flex-col lg:flex-row group"
            >
              {/* LEFT SIDE: BRANDING & GRAPHICS (Desktop Only) */}
              <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden border-r border-white/5">
                <Image 
                  src="/Program/Visual-Effects.png" 
                  alt="ZICA Visuals" 
                  fill 
                  className="object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-[3s] ease-out"
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
                            <Image src={`/Trusted by/${img}`} alt="Student" fill className="object-cover" />
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

              {/* RIGHT SIDE: FORM */}
              <div className="w-full lg:w-[55%] relative flex flex-col">
                {/* Premium Background Graphics */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,0,0.08),transparent_70%)]" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full animate-pulse" />
                  <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-50 hover:scale-110 active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-full">
                  <div className="mb-10 lg:hidden">
                     <h2 className="text-4xl font-black text-white uppercase italic leading-none tracking-tighter mb-4">
                      Download <br />
                      <span className="text-[#ff0000]">Brochure</span>
                    </h2>
                    <div className="w-12 h-1 bg-[#ff0000]" />
                  </div>

                  <div className="hidden lg:block mb-10">
                     <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                      Ready to Start?
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest">Submit your enquiry below</p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e, "Popup Enquiry Form")}>
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
                            <option value="VFX">VFX</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Graphics">Graphics</option>
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
                      {isSubmitting ? "Processing..." : "Enquire Now"}
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

      {/* --- CINEMATIC STICKY QUICK ACCESS BAR --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[150] flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden rounded-l-3xl border-l border-y border-white/10 group/sidebar">
        {/* Call Button */}
        <motion.a
          href="tel:+917900400300"
          whileHover={{ x: -10 }}
          className="w-14 h-16 bg-[#ff4d5a] flex items-center justify-center text-white relative transition-all duration-300 border-b border-white/10"
        >
          <Phone className="w-6 h-6" />
          {/* Label that slides out on hover */}
          <span className="absolute right-full mr-4 bg-[#ff4d5a] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">Call Us</span>
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/917900400300"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -10 }}
          className="w-14 h-16 bg-[#25d366] flex items-center justify-center text-white relative transition-all duration-300 border-b border-white/10"
        >
          <MessageCircle className="w-6 h-6 fill-white/10" />
          <span className="absolute right-full mr-4 bg-[#25d366] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">WhatsApp</span>
        </motion.a>

        {/* Inquiry / Popup Button */}
        <motion.button
          onClick={() => setIsPopupOpen(true)}
          whileHover={{ x: -10 }}
          className="w-14 h-16 bg-[#0a0a0a] flex items-center justify-center text-white relative transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-red-600 animate-pulse" />
          <span className="absolute right-full mr-4 bg-[#0a0a0a] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">Enquire Now</span>
        </motion.button>
      </div>

      {/* --- FLOATING ENQUIRY BUTTON --- */}
      <motion.button
        id="floating-enquiry-btn"
        onClick={() => setIsPopupOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', damping: 18, stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[200] w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(255,0,0,0.4)] flex items-center justify-center group/fab cursor-pointer"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 group-hover/fab:from-red-400 group-hover/fab:via-red-500 group-hover/fab:to-red-700 transition-all duration-500" />

        {/* Pulsing ripple */}
        <div className="absolute inset-0 rounded-full animate-ping bg-red-600/25" style={{ animationDuration: '2.5s' }} />
        <div className="absolute -inset-1.5 rounded-full bg-red-600/15 blur-lg animate-pulse" />

        {/* Icon */}
        <Phone className="w-7 h-7 text-white relative z-10" />

        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030008] flex items-center justify-center z-20">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>

        {/* Tooltip label */}
        <span className="absolute right-full mr-4 bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap opacity-0 group-hover/fab:opacity-100 transition-all duration-300 pointer-events-none shadow-xl translate-x-2 group-hover/fab:translate-x-0">
          📞 Call Us        </span>
      </motion.button>
    </div>
  );
}