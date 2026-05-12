"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SectionRedirect() {
  const router = useRouter();
  const params = useParams();
  const section = params.section as string;

  useEffect(() => {
    // Navigate to home page, then scroll to the section
    router.replace("/");
    
    // Wait for navigation, then scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `/${section}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [section, router]);

  return (
    <div className="min-h-screen bg-[#030008] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
