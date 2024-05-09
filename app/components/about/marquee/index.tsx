import { TechLogoHeaven, TechLogoHell } from "@/app/shared/constant";
import React from "react";

export default function Marquee() {
  return (
    <div className="flex flex-col gap-3 mt-24 md:mt-28">
      <div className="w-full inline-flex py-2 gap-5 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex items-center gap-5 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-right">
          {TechLogoHeaven.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
            >
              <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
              <div className="w-auto">{item.content}</div>
            </div>
          ))}
        </ul>
        <ul
          className="flex items-center gap-5 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-right"
          aria-hidden="true"
        >
          {TechLogoHeaven.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
            >
              <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
              <div className="w-auto">{item.content}</div>
            </div>
          ))}
        </ul>
      </div>
      <div className="w-full inline-flex py-2 gap-5 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex items-center gap-5 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-left">
          {TechLogoHell.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
            >
              <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
              <div className="w-auto">{item.content}</div>
            </div>
          ))}
        </ul>
        <ul
          className="flex items-center gap-5 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-left"
          aria-hidden="true"
        >
          {TechLogoHell.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
            >
              <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
              <div className="w-auto">{item.content}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
