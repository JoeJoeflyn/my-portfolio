"use client";
import { ColorScheme } from "@/app/shared/constant";
import React from "react";
import { ProgressBar as ProgressBarComponent } from "react-progressbar-fancy";

export default function ProgressBar({
  score,
  label,
  text,
}: {
  score: number;
  label: string;
  text: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="group relative col-span-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProgressBarComponent
        className="col-span-3"
        primaryColor={ColorScheme[label as keyof typeof ColorScheme]?.primary}
        secondaryColor={ColorScheme[label as keyof typeof ColorScheme]?.primary}
        hideText
        darkTheme
        score={score}
      />
      {isHovered && (
        <div className="absolute -top-2.5 -right-20 z-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 flex items-center">
          <span className="absolute bg-gray-800 h-3 w-3 -left-1.5 transform rotate-45"></span>
          {text}
        </div>
      )}
    </div>
  );
}
