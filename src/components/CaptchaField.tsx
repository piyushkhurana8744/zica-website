"use client";

import { useState, useEffect } from "react";
import { RotateCw, ShieldCheck } from "lucide-react";

interface CaptchaFieldProps {
  className?: string;
}

export default function CaptchaField({ className = "" }: CaptchaFieldProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState("+");

  const generateChallenge = () => {
    const operations = ["+", "-", "*"];
    const selectedOp = operations[Math.floor(Math.random() * operations.length)];
    let n1 = 0;
    let n2 = 0;

    if (selectedOp === "*") {
      n1 = Math.floor(Math.random() * 8) + 3; // 3 to 10
      n2 = Math.floor(Math.random() * 7) + 3; // 3 to 9
    } else if (selectedOp === "+") {
      n1 = Math.floor(Math.random() * 40) + 11; // 11 to 50
      n2 = Math.floor(Math.random() * 40) + 11; // 11 to 50
    } else { // "-"
      n1 = Math.floor(Math.random() * 50) + 30; // 30 to 79
      n2 = Math.floor(Math.random() * 20) + 5;  // 5 to 24 (ensures positive result)
    }

    setNum1(n1);
    setNum2(n2);
    setOp(selectedOp);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
        <ShieldCheck className="w-3 h-3 text-red-500" />
        Anti-Bot Verification
      </label>

      {/* Hidden inputs to send to the server */}
      <input type="hidden" name="captchaNum1" value={num1} />
      <input type="hidden" name="captchaNum2" value={num2} />
      <input type="hidden" name="captchaOp" value={op} />

      <div className="flex items-center gap-2">
        {/* Captcha Expression Box */}
        <div className="relative flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-3 h-[42px] select-none w-[120px] overflow-hidden group shrink-0">
          {/* Captcha background noise lines */}
          <div 
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #ff0000 10px, #ff0000 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #8b5cf6 10px, #8b5cf6 11px)`
            }}
          />
          
          <span 
            className="text-sm font-black text-white italic tracking-wider relative z-10 filter drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)] transform skew-x-6 select-none"
            style={{ fontFamily: "monospace" }}
          >
            {num1}{op}{num2}
          </span>

          <button
            type="button"
            onClick={generateChallenge}
            className="text-gray-500 hover:text-white p-0.5 rounded hover:bg-white/5 transition-all duration-300 relative z-10 cursor-pointer active:scale-95 group-hover:rotate-45"
            title="Refresh Captcha"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>

        {/* Input answer field */}
        <div className="relative w-[120px] shrink-0 h-[42px]">
          <input
            name="captchaAnswer"
            type="number"
            required
            autoComplete="off"
            placeholder="Answer"
            className="w-full h-full bg-white/[0.03] border border-white/10 rounded-xl px-3 text-sm focus:border-red-600/50 focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600 text-white"
          />
        </div>
      </div>
    </div>
  );
}
