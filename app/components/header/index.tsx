"use client";
import { useTheme } from "next-themes";
import React from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  return (
    <nav className="relative px-4 sm:px-8 lg:px-12">
      <div className="m-6 dark:text-[#f4f4f5] pointer-events-auto hidden md:block">
        <div className="flex gap-4">
          <div className="flex-grow"></div>
          <div className="flex flex-1 justify-end md:justify-center items-center">
            <div className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
              <div>
                <a
                  href="/"
                  className="relative block px-3 py-2 transition text-teal-500 dark:text-teal-400"
                >
                  About
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Project
                </a>
              </div>
              <div>
                <a
                  href="/blogs"
                  className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Blogs
                </a>
              </div>
              <div>
                <a
                  href="/waka-time"
                  className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                >
                  WakaTime
                </a>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
            >
              {loaded ? (
                theme === "dark" ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500"
                  >
                    <path
                      d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 transition fill-zinc-100 stroke-zinc-500 group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                )
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
