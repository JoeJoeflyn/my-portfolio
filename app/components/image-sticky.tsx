"use client";
import Image from "next/image";
import React from "react";


export default function ProfileSection() {
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [navbarSticky, setNavbarSticky] = React.useState(false);

  const debounce = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
  ): ((this: unknown, ...args: Parameters<F>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  React.useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;

      setNavbarSticky(prevScrollPos > currentScrollPos && currentScrollPos > 0);

      setPrevScrollPos(currentScrollPos);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const memoizedImage = React.useMemo(() => (
    <Image
      src="/images/avatar.jpg"
      alt="Avatar"
      width={128}
      height={128}
      className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
    />
  ), []);

  return (
    <div
      className={`${
        navbarSticky
          ? "sticky top-5 md:top-5 z-10 transition-all duration-75 ease-in-out h-10 w-10"
          : "relative h-16 w-16"
      } rounded-full overflow-hidden`}
    >
      {memoizedImage}
    </div>
  );
}
