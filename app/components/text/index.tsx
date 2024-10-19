"use client";
import Link from "next/link";

export default function Text({ title }: { title: any[] }) {
  if (!title || title.length === 0) {
    return null;
  }

  return (
    <>
      {title.map((value, index) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;

        const codeStyle = code
          ? "font-mono py-0.5 px-1 rounded-sm bg-[#87837826]"
          : "";

        return (
          <span
            className={[
              bold ? "font-bold" : "",
              code ? codeStyle : "",
              italic ? "italic" : "",
              strikethrough ? "line-through" : "",
              underline ? "underline" : "",
            ].join(" ")}
            style={color !== "default" ? { color } : {}}
            key={`${text.content}-${index}`}
          >
            {text.link ? (
              <Link
                className="hover:text-[rgb(45,212,191)]"
                href={text.link.url}
              >
                {text.content}
              </Link>
            ) : (
              text.content
            )}
          </span>
        );
      })}
    </>
  );
}
