"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Type definitions for Cloudflare Turnstile API
interface TurnstileOptions {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  "error-callback"?: (error?: any) => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  tabindex?: number;
}

interface TurnstileObject {
  render: (container: string | HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

declare global {
  interface Window {
    turnstile?: TurnstileObject;
  }
}

interface TurnstileFieldProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

export default function TurnstileField({
  onVerify,
  onExpire,
  onError,
  className = "",
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useState("");

  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined in environment variables.");
      return;
    }

    const initTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (newToken: string) => {
              setToken(newToken);
              onVerifyRef.current(newToken);
            },
            "error-callback": () => {
              setToken("");
              onErrorRef.current?.();
            },
            "expired-callback": () => {
              setToken("");
              onExpireRef.current?.();
            },
            "timeout-callback": () => {
              setToken("");
              onExpireRef.current?.();
            },
            theme: "dark",
            size: "normal",
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.error("Failed to render Cloudflare Turnstile widget:", e);
        }
      }
    };

    if (window.turnstile) {
      initTurnstile();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          initTurnstile();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore removal errors on unmount
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, scriptLoaded]);

  return (
    <div className={`space-y-2 ${className}`}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={containerRef} className="cf-turnstile-wrapper min-h-[65px] flex justify-center sm:justify-start" />
      {/* Hidden input to ensure form submission includes turnstile token */}
      <input type="hidden" name="turnstileToken" value={token} />
    </div>
  );
}
