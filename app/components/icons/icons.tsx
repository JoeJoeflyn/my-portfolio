"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const IconLink = ({ href, img }: { href: string; img: string }) => (
  <Link
    href={href}
    className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
  >
    {React.useMemo(() => (
      <Image
        alt={img}
        loading="lazy"
        width={24}
        height={24}
        src={img}
        className="transition-opacity duration-300 hover:opacity-80"
      />
    ), [img])}
  </Link>
);
