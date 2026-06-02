"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Star, GraduationCap, Trophy, Briefcase, Sparkles } from "lucide-react";

const YOUTUBE_VIDEO_ID = "kW7s_u0gLus";
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

interface VideoShowcaseProps {
  onCtaClick?: () => void;
}

export default function VideoShowcase({ onCtaClick }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const trustBadges = [
    {
      icon: <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
      value: "4.9/5",
      label: "Google Rating",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      value: "3000+",
      label: "Students Trained",
    },
    {
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      value: "Award",
      label: "Winning Institute",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      value: "95%+",
      label: "Placement Rate",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="video-showcase"
      className="relative z-10 w-full px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] overflow-hidden border-t border-white/5"
      style={{ background: "linear-gradient(180deg, #030008 0%, #0a0015 40%, #0d0012 60%, #030008 100%)" }}
    >
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
        {/* Top-right accent glow */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full"
        />
        {/* Bottom-left accent glow */}
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-[15%] -left-[10%] w-[400px] h-[400px] bg-red-600/10 blur-[100px] rounded-full"
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 lg:mb-14 space-y-5"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.25em]">
              Campus Life
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.95] text-white text-glow">
            See What It&apos;s Like to Be{" "}
            <br className="hidden sm:block" />
            <span className="text-[#ff0000]">a ZICA Student</span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-[clamp(0.85rem,1.3vw,1rem)] leading-relaxed font-medium max-w-2xl mx-auto">
            Take an inside look at ZICA Pitampura — our state-of-the-art labs, creative studios,
            passionate mentors, and the vibrant community that turns aspiring artists into
            industry-ready professionals.
          </p>
        </motion.div>

        {/* --- Video Container --- */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative group"
        >
          {/* Outer glow frame */}
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-purple-500/20 via-red-500/10 to-purple-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />

          {/* Video glass card */}
          <div className="video-glass relative rounded-[28px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.08)]">
            {/* Aspect ratio container */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {!isPlaying ? (
                /* --- Thumbnail State --- */
                <div
                  className="absolute inset-0 cursor-pointer group/play"
                  onClick={handlePlay}
                >
                  {/* Thumbnail image */}
                  <img
                    src={YOUTUBE_THUMBNAIL}
                    alt="Watch ZICA Pitampura Campus Tour"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                  <div className="absolute inset-0 bg-black/10 group-hover/play:bg-black/20 transition-colors duration-500" />

                  {/* Cinematic vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" />

                  {/* Animated Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {/* Outer pulse rings */}
                    <div className="absolute w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full animate-video-pulse bg-white/10" />
                    <div
                      className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full animate-video-pulse bg-white/10"
                      style={{ animationDelay: "0.4s" }}
                    />

                    {/* Play button body */}
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center z-10 transition-shadow duration-500"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,0,0,0.9) 0%, rgba(200,0,0,0.95) 100%)",
                        boxShadow: "0 8px 40px rgba(255,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                      }}
                    >
                      {/* Inner glass effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60" />
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white fill-white ml-1 relative z-10 drop-shadow-lg" />
                    </motion.div>
                  </div>

                  {/* Bottom text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Play className="w-3 h-3 text-white fill-white" />
                        <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                          Watch Now
                        </span>
                      </div>
                      <span className="text-white/60 text-xs font-medium hidden sm:block">
                        Campus Tour & Student Life at ZICA Pitampura
                      </span>
                    </div>
                  </div>

                  {/* Corner decorative lines */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
                </div>
              ) : (
                /* --- Playing State (YouTube Iframe) --- */
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="ZICA Pitampura Campus Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* --- Trust Badges --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-10 lg:mt-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group/badge relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 lg:p-6 text-center hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover/badge:scale-110 transition-transform duration-300">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-black text-white tracking-tight leading-none">
                      {badge.value}
                    </p>
                    <p className="text-[10px] lg:text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mt-1">
                      {badge.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- CTA Below Video --- */}
        {onCtaClick && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-[#ff0000] hover:bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_8px_30px_rgba(255,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,0,0,0.5)] active:scale-95 btn-glow overflow-hidden"
            >
              <span className="relative z-10">Start Your Creative Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
