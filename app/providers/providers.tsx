"use client";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

        disable_session_recording: true,
      });
    }
  }, []);
  return React.useMemo(() => (
    <PostHogProvider client={posthog}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </PostHogProvider>
  ), [children]);
}
