"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowLeft, MessageCircle, Phone } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen w-full bg-[#030008] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/bg.png')] opacity-10 bg-cover bg-center" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl px-6 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", damping: 12 }}
          className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-600/30 shadow-[0_0_30px_rgba(255,0,0,0.2)]"
        >
          <CheckCircle2 className="w-12 h-12 text-red-600" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase italic tracking-tighter leading-none mb-6 text-glow">
          Thank <span className="text-red-600">You!</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10">
          Your inquiry has been successfully received. One of our industry experts will reach out to you within <span className="text-white font-bold">24 hours</span> to guide your creative journey.
        </p>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <motion.a 
            href="tel:+917900400300"
            whileHover={{ y: -5 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-left group transition-all hover:bg-white/10 cursor-pointer"
          >
            <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Call Me Now</p>
              <p className="text-sm font-bold">+91 79004 00300</p>
            </div>
          </motion.a>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-left group transition-all hover:bg-white/10"
          >
            <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center group-hover:bg-green-600/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">WhatsApp Us</p>
              <p className="text-sm font-bold">Message our Counselor</p>
            </div>
          </motion.div>
        </div>

        {/* Back to Home */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-red-600/30 transition-all btn-glow"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Website
          </motion.button>
        </Link>
      </motion.div>

      {/* Brand Logo Bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10"
      >
        <Image src="/ZICA_LOGO.jpg" alt="ZICA" width={100} height={26} />
      </motion.div>
    </div>
  );
}
