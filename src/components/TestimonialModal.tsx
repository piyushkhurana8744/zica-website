"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  review: string;
  star: number;
  image: string;
  role?: string;
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
}

export default function TestimonialModal({ isOpen, onClose, testimonials }: TestimonialModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(255,0,0,0.2)] flex flex-col"
          >
            {/* BACKGROUND GRAPHICS */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,0,0.1),transparent_70%)]" />
              <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Student <span className="text-red-600">Success Stories</span>
                </h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Voices of our creative community</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/5 hover:bg-red-600 border border-white/10 rounded-full flex items-center justify-center text-white transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {testimonials.map((testi, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6 relative group hover:border-red-600/30 transition-all hover:bg-white/[0.04]"
                  >
                    <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-red-600/10 transition-colors" />
                    
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(testi.star) ? 'fill-current' : 'text-gray-600'} ${i === Math.floor(testi.star) && testi.star % 1 !== 0 ? 'fill-current opacity-50' : ''}`} />
                      ))}
                    </div>

                    {testi.role && (
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">{testi.role}</p>
                    )}

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic relative z-10">
                      "{testi.review}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="w-14 h-14 rounded-full border-2 border-red-600/30 overflow-hidden relative shadow-lg group-hover:border-red-600 transition-colors">
                        <Image
                          src={`/Testimonial/${testi.image}`}
                          alt={testi.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-wider group-hover:text-red-600 transition-colors">
                          {testi.name}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Verified Student</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-black/60 border-t border-white/10 text-center">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Join 3,000+ Success Stories at ZICA Pitampura</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
