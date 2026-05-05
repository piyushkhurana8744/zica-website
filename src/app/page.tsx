"use client";

import { useState, useEffect, useRef } from "react";
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

export default function Home() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(2);
  const [zicaWayIndex, setZicaWayIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

    const courseInterval = setInterval(() => {
      setCurrentCourseIndex((prev) => (prev + 1) % COURSES.length);
    }, 2800);

    const carouselInterval = setInterval(() => {
      setZicaWayIndex((prev) => (prev + 1) % ZICA_WAY_IMAGES.length);
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(courseInterval);
      clearInterval(carouselInterval);
    };
  }, [ZICA_WAY_IMAGES.length]);

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
          <motion.div
            style={{ y: mousePos.y / 50 }}
            className="absolute inset-0 w-full h-full"
          >
          <Image 
            src="/bg.png" 
            alt="Global Background" 
            fill 
            className="object-cover opacity-20 contrast-110 brightness-50 transition-transform duration-1000 fixed" 
            priority
          />
          </motion.div>

          {/* Animated Glow Layers */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full z-1"
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
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[100px] rounded-full z-1"
          />
        </div>

        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="relative z-10 w-full px-6 lg:px-16 flex flex-col h-screen shrink-0"
        >
          {/* Navigation */}
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between py-5 flex-shrink-0"
          >
            <Link href="#home">
              <Image
                src="/ZICA_Logo.png"
                alt="ZICA Logo"
                width={180}
                height={46}
                className="h-10 w-auto brightness-110"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-10 text-[13px] font-medium text-gray-300">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Program", href: "#program" },
                { label: "Why ZICA", href: "#why-zica" },
                { label: "Goals", href: "#goals" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQs", href: "#faqs" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-white transition-colors uppercase tracking-tight relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <button className="bg-[#ff0000] hover:bg-red-700 text-white px-7 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-red-600/20 transition-all active:scale-95 btn-glow">
              Admission Enquiry
            </button>
          </motion.nav>

          {/* Hero Main */}
          <main className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 py-4 min-h-0 relative">
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
                        <span className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none">
                          {COURSES[currentCourseIndex] || "Animation & VFX"}
                        </span>
                        <span className="text-[10px] lg:text-xs font-black text-white not-italic tracking-[0.4em] mt-2 opacity-60">
                          OFFICIAL TRAINING COURSE
                        </span>
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-gray-200 text-sm lg:text-[17px] leading-relaxed max-w-2xl font-medium drop-shadow-md">
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
              <div className="flex items-center gap-5 pt-4">
                <button className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-red-600/20">
                  Apply Now
                </button>
                <button className="border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white px-10 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all active:scale-95">
                  Explore Our Courses
                </button>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[30%] flex justify-end"
            >
              <div className="w-full max-w-[400px] bg-[#0a0a0a] border border-white/20 rounded-[32px] p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0000] to-transparent opacity-50 z-10" />
                <h2 className="text-2xl font-black text-center mb-8 tracking-tight text-white uppercase italic">
                  Download Brochure
                </h2>
                <form className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Interested on...
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white appearance-none focus:outline-none focus:border-red-600 transition-all cursor-pointer">
                        <option className="bg-black" value="Animation">
                          Animation
                        </option>
                        <option className="bg-black" value="VFX">
                          VFX Master
                        </option>
                        <option className="bg-black" value="Gaming">
                          Game Design
                        </option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <button className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all mt-4 text-sm uppercase tracking-widest active:scale-[0.98] shadow-lg shadow-red-600/30">
                    Submit Now
                  </button>
                </form>
              </div>
            </motion.div>
          </main>
        </section>

        {/* --- ZICA WAY SECTION --- */}
        <section
          id="about"
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-[#030008]/60"
        >
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-center mb-20 leading-tight text-white">
              Entertainment, the{" "}
              <span className="text-[#ff0000]">ZICA way—through</span> the eyes
              of our students.
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
              <div className="flex-1 min-h-[500px] lg:min-h-[600px] relative flex items-center justify-center gap-6 perspective-1000">
                {/* Current Image Tile */}
                <motion.div
                  key={`current-${zicaWayIndex}`}
                  initial={{ opacity: 0, rotate: -5, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -8, x: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -15, x: -100, scale: 0.8 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-[300px] lg:w-[400px] aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 shadow-2xl z-20"
                >
                  <Image
                    src={`/Zica way-carousel/${ZICA_WAY_IMAGES[zicaWayIndex]}`}
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
                  className="relative w-[250px] lg:w-[350px] aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 shadow-xl z-10 -ml-20 lg:-ml-32 grayscale-[0.5] hover:grayscale-0 transition-all cursor-pointer"
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
                <div className="absolute -bottom-16 left-0 flex items-center gap-2">
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

              <div className="w-full lg:w-[400px] space-y-8">
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

                <button className="bg-[#ff0000] hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/20 active:scale-95">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROGRAMS SECTION --- */}
        <section
          id="program"
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-black/60 overflow-hidden border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-[1600px] mx-auto w-full"
          >
            <div className="text-center mb-20 space-y-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white text-glow">
                  Discover Our <span className="text-[#ff0000]">Programs</span>
                </h2>
                <p className="text-gray-400 text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                  Unlock your potential with our industry-vetted creative
                  courses. From 3D Animation to Architectural Design, we provide
                  the tools to turn your imagination into a professional career.
                </p>
              </div>
              <button className="bg-[#ff0000] hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-600/20 active:scale-95 btn-glow">
                Enquire Now
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Graphic",
                  highlight: "Designing",
                  image: "Graphic-Designing-1.png",
                  desc: "Master visual communication, branding, and typography using industry-standard tools like Adobe Photoshop, Illustrator, and InDesign. Learn to create impactful designs for print media, digital platforms, and corporate identity.",
                },
                {
                  title: "2D",
                  highlight: "Animation",
                  image: "2D-Animation.png",
                  desc: "Learn the art of traditional and digital frame-by-frame animation. This course focuses on character development, storyboarding, and the 12 principles of animation. Bring characters and narratives to life using professional software like Toon Boom.",
                },
                {
                  title: "3D",
                  highlight: "Animation",
                  image: "3D-Animation.png",
                  desc: "Dive into character modeling, texturing, rigging, and performance-driven animation in a three-dimensional space. Create cinematic sequences and realistic movement for films, commercials, and digital content.",
                },
                {
                  title: "Motion",
                  highlight: "Graphics",
                  image: "Motion-Graphics.png",
                  desc: "Combine graphic design with animation principles to create dynamic, moving visuals. Focus on kinetic typography, logo reveals, and broadcast package design for television and web advertising using After Effects.",
                },
                {
                  title: "Visual",
                  highlight: "Effects (VFX)",
                  image: "Visual-Effects.png",
                  desc: "Acquire the skills to create movie magic. Master compositing, green-screen removal, 3D tracking, and dynamic simulation. Integrate CGI with live-action footage using Nuke and industry-leading software.",
                },
                {
                  title: "Game",
                  highlight: "Design",
                  image: "Game-Design.png",
                  desc: "Build interactive worlds and learn gameplay mechanics for modern consoles. Master Unity and Unreal Engine to create immersive gaming experiences, focusing on character interaction and storytelling.",
                },
                {
                  title: "3DS",
                  highlight: "Max",
                  image: "3Ds-Max.png",
                  desc: "Explore the world of 3D modeling and rendering using Autodesk 3ds Max. Covers basic creation to advanced lighting and realistic rendering for architecture, products, and entertainment.",
                },
                {
                  title: "3D",
                  highlight: "Maya",
                  image: "3D-Maya.png",
                  desc: "A comprehensive course in Maya for professional film and game production. Focus on advanced rigging, creature modeling, and simulation effects demanded by top global studios.",
                },
                {
                  title: "Architectural",
                  highlight: "Design",
                  image: "Architectural-Design.png",
                  desc: "Learn the technical skills to design functional spaces. Focus on site analysis, drafting, and space planning. Use AutoCAD and Revit to produce industry-standard drawings and presentations.",
                },
                {
                  title: "Video",
                  highlight: "Editing",
                  image: "video-Editing.png",
                  desc: "Master post-production storytelling. Learn professional cutting techniques, color correction, and sound mixing using Premiere Pro and DaVinci Resolve. Transform raw footage into polished final content.",
                },
              ].map((course, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.05,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-[40px] overflow-hidden flex flex-col shadow-2xl hover:shadow-red-600/10 transition-all cursor-pointer h-full border border-transparent hover:border-red-600/20"
                >
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <Image
                      src={`/Program/${course.image}`}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col flex-1 bg-white">
                    <h3 className="text-2xl lg:text-3xl font-black text-black leading-tight mb-4 uppercase">
                      {course.title} <br />
                      <span className="text-[#ff0000]">{course.highlight}</span>
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-1">
                      {course.desc}
                    </p>
                    <div className="mt-8 flex items-center text-red-600 font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs">
                      <div className="relative h-5 overflow-hidden group/btn">
                        <span className="block transition-transform duration-700 ease-in-out group-hover/btn:-translate-y-full">Explore Program</span>
                        <span className="block absolute top-0 left-0 transition-transform duration-700 ease-in-out translate-y-full group-hover/btn:translate-y-0 text-red-500">Enroll Today Now</span>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- WHY CHOOSE ZICA SECTION (DARK RE-DESIGN) --- */}
        <section
          id="about"
          className="relative z-10 w-full px-6 lg:px-16 py-40 bg-black overflow-hidden border-t border-white/5"
        >

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto relative z-10"
          >
            <div className="text-center mb-32">
              <motion.h2
                initial={{ opacity: 0, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2 }}
                className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white text-glow"
              >
                Why Should You Choose <br />
                <span className="text-[#ff0000]">ZICA Pitampura?</span>
              </motion.h2>
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
                  className="flex items-start gap-8"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
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

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ff0000] hover:bg-red-700 text-white px-12 py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 active:scale-95 btn-glow"
                >
                  Talk to Counsellor
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section
          id="testimonials"
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-black/60 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto relative z-10"
          >
            <div className="text-center space-y-4 mb-20">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-black leading-tight text-white text-glow"
              >
                Let's Hear It From <span className="text-[#ff0000]">Our</span>{" "}
                Students
              </motion.h2>
              <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
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
                  className="bg-[#0a0a0a] border border-white/10 rounded-[24px] p-8 lg:p-12 flex flex-col items-center text-center space-y-6 relative group hover:border-red-600/30 transition-all shadow-2xl"
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
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-black/60 border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto"
          >
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight text-glow">
                The Right Place to Achieve{" "}
                <span className="text-[#ff0000]">Your Goals</span>
              </h2>
              <p className="text-gray-500 text-sm lg:text-base max-w-3xl mx-auto">
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
                  className="bg-black border border-white/10 rounded-[20px] p-8 space-y-6 flex flex-col hover:border-red-600/30 transition-all group"
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
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-black/60 border-t border-white/5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black text-center mb-16 text-white text-glow"
            >
              Our <span className="text-[#ff0000]">Impact</span>
            </motion.h2>

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
                    className="bg-black border border-white/20 rounded-[24px] py-16 text-center space-y-4 hover:border-red-600/40 transition-all group cursor-default"
                  >
                    <p className="text-5xl lg:text-6xl font-black text-white tracking-tighter group-hover:text-red-600 transition-colors duration-500">
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
          className="relative z-10 w-full px-6 lg:px-16 py-32 bg-black/60"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24"
          >
            {/* FAQ Column */}
            <div className="space-y-12">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight text-glow">
                FAQs
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
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Interested on...
                  </label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                      <option value="Animation">Animation</option>
                      <option value="VFX">VFX</option>
                      <option value="Gaming">Gaming</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#ff0000] hover:bg-red-700 text-white font-black py-5 rounded-xl uppercase tracking-widest text-sm transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] btn-glow"
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 w-full px-6 lg:px-16 pt-24 pb-12 bg-black border-t border-white/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
              {/* Powered By */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4" />
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
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reflect on your creative journey, evaluate your performance,
                  seek constructive feedback, and continuously enhance your
                  artistic and technical skills with us.
                </p>
                <div className="flex items-center gap-6">
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
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4" />
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
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4" />
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
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 bg-[#ff0000] mb-4" />
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">
                    Contact Info
                  </h4>
                </div>
                <div className="space-y-6">
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
                    <span className="text-sm font-bold tracking-wider leading-relaxed">
                      1st floor, 150, Kapil Vihar,
                      <br />
                      Pitampura, Delhi 110034
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm font-medium">
                © 2025 ZICA Pitampura. All rights reserved.
              </p>
              <div className="flex gap-8 text-gray-500 text-sm font-medium">
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

        {/* --- CLASSY VERTICAL RIGHT DOCK --- */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col z-50 overflow-hidden rounded-l-2xl border border-white/10 shadow-2xl">
          {[
            {
              icon: <ChevronRight className="w-5 h-5" />,
              bg: "bg-black",
              label: "Open",
            },
            {
              icon: <Phone className="w-5 h-5" />,
              bg: "bg-[#e4405f]",
              label: "Call Us",
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              bg: "bg-[#25d366]",
              label: "WhatsApp",
            },
          ].map((btn, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: -10 }}
              className={`w-12 h-14 ${btn.bg} flex items-center justify-center cursor-pointer transition-all border-b border-white/10 last:border-b-0 group relative`}
            >
              {btn.icon}
              <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {btn.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
