"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const COURSE_SLUGS = [
  "graphic-designing",
  "2d-animation",
  "3d-animation",
  "motion-graphics",
  "3d-maya-course",
  "architectural-design",
  "vfx-master",
  "game-design",
  "3ds-max",
  "video-editing"
];

export default function SectionRedirect() {
  const router = useRouter();
  const params = useParams();
  const section = params.section as string;

  useEffect(() => {
    if (COURSE_SLUGS.includes(section)) {
      router.replace(`/?course=${section}`);
      return;
    }

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
