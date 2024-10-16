"use client";
import React from "react";
import { ColorScheme } from "@/app/shared/constant";
import { ProgressBar as ProgressBarComponent } from "react-progressbar-fancy";

interface ProgressBarProps {
  score: number;
  label: string;
  text: string;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(
  ({ score, label, text }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);

    const colorScheme = React.useMemo(
      () => ColorScheme[label as keyof typeof ColorScheme]?.primary,
      [label]
    );

    return (
      <div
        className="group relative col-span-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ProgressBarComponent
          className="col-span-3"
          primaryColor={colorScheme}
          secondaryColor={colorScheme}
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
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
