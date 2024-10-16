import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-700/40">
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="pt-10 pb-16">
              <div className="relative sm:px-6">
                <div className="mx-auto max-w-2xl lg:max-w-5xl">
                  <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      <Link
                        href="/"
                        className="transition hover:text-teal-500 dark:hover:text-teal-400"
                      >
                        About
                      </Link>
                      <Link
                        href="#"
                        className="transition hover:text-teal-500 dark:hover:text-teal-400"
                      >
                        Project
                      </Link>
                      <Link
                        href="/blogs"
                        className="transition hover:text-teal-500 dark:hover:text-teal-400"
                      >
                        Blogs
                      </Link>
                      <Link
                        href="/waka-time"
                        className="transition hover:text-teal-500 dark:hover:text-teal-400"
                      >
                        WakaTime
                      </Link>
                    </div>
                    <p className="text-sm text-zinc-200 dark:text-zinc-100">
                      © 2024 Nguyen Thai Tai. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
