"use client";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "../button";
import { links } from "@/app/shared/constant";

export default function Header() {
  const [navbarSticky, setNavbarSticky] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const pathname = usePathname();

  const debounce = React.useCallback(
    <T extends (...args: any[]) => any>(func: T, delay: number) => {
      let timeoutId: NodeJS.Timeout | undefined;
      return (...args: Parameters<T>): void => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  React.useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;
      setNavbarSticky(
        prevScrollPos >= currentScrollPos || currentScrollPos === 0
      );
      prevScrollPos = currentScrollPos;
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [debounce]);

  return (
    <nav
      className={`px-4 z-10 sm:px-8 lg:px-12 ${
        navbarSticky
          ? "sticky top-0 z-10 pt-6 transition-all duration-75 ease-in-out"
          : "relative"
      }`}
    >
      <div
        className={`${
          navbarSticky ? "" : "m-6"
        } dark:text-[#f4f4f5] pointer-events-auto hidden md:block`}
      >
        <div className="flex gap-4">
          <div className="flex-grow"></div>
          <div className="flex flex-1 justify-end md:justify-center items-center">
            <div className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
              {links.map(({ href, label }) => (
                <div key={href}>
                  <a
                    href={href}
                    className={`relative block px-3 py-2 transition hover:text-teal-500 ${
                      pathname === href ? "text-teal-500" : ""
                    } dark:hover:text-teal-400`}
                  >
                    {label}
                    {pathname === href && (
                      <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            <Button />
          </div>
        </div>
      </div>
      <div
        className={`"top-0 z-10 h-16 md:pt-6 ${navbarSticky ? "" : "mt-6"}`}
        style={{ position: "sticky" }}
      >
        <div className="sm:px-8 w-full">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="relative flex gap-4">
                  <div className="flex flex-1"></div>
                  <div className="flex flex-1 justify-end md:justify-center">
                    <div
                      className="pointer-events-auto md:hidden"
                      data-headlessui-state=""
                    >
                      <button
                        className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                        id="headlessui-popover-button-:Rqb6:"
                        onClick={() => setMenu((prev) => !prev)}
                        type="button"
                        aria-expanded="false"
                        data-headlessui-state=""
                      >
                        Menu
                        <svg
                          viewBox="0 0 8 6"
                          aria-hidden="true"
                          className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                        >
                          <path
                            d="M1.75 1.75 4 4.25l2.25-2.5"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    {menu ? (
                      <div>
                        <div
                          className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80 opacity-100"
                          id="headlessui-popover-overlay-:r47:"
                          aria-hidden="true"
                          data-headlessui-state="open"
                        ></div>
                        <div
                          className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100 scale-100"
                          id="headlessui-popover-panel-:Rqb6H1:"
                          tabIndex={-1}
                          data-headlessui-state="open"
                        >
                          <div className="flex flex-row-reverse items-center justify-between">
                            <button
                              aria-label="Close menu"
                              className="-m-1 p-1"
                              onClick={() => setMenu((prev) => !prev)}
                              type="button"
                              data-headlessui-state="open"
                              tabIndex={0}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                              >
                                <path
                                  d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </button>
                            <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                              Navigation
                            </h2>
                          </div>
                          <nav className="mt-6">
                            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                              <li>
                                <a
                                  className="block py-2"
                                  data-headlessui-state="open"
                                  href="/"
                                >
                                  About
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block py-2"
                                  data-headlessui-state="open"
                                  href="/projects"
                                >
                                  Projects
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block py-2"
                                  data-headlessui-state="open"
                                  href="/blogs"
                                >
                                  Blogs
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block py-2"
                                  data-headlessui-state="open"
                                  href="/waka-time"
                                >
                                  WakaTime
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="lg:hidden flex justify-end md:flex-1">
                    <div className="pointer-events-auto">
                      <div className="lg:hidden flex justify-end md:flex-1">
                        <div className="pointer-events-auto">
                          <Button />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
