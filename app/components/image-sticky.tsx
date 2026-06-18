"use client";
import Image from "next/image";
import React from "react";

export default function ProfileSection() {
  return (
    <div className="h-20 w-20 border-2 border-[var(--border-heavy)] shadow-hard overflow-hidden shrink-0">
      <Image src="/images/avatar.jpg" alt="Avatar" width={80} height={80} className="h-full w-full grayscale object-cover" priority />
    </div>
  );
}
