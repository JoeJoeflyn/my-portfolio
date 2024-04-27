"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
interface CodeInputProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeInputProps> = (props) => {
  const { language, code } = props;
  const [buttonLabel, setButtonLabel] = React.useState("Copy"); // Step 1: State for button label

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setButtonLabel("Copied");
        setTimeout(() => {
          setButtonLabel("Copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="relative group dark:bg-[#0F081C]">
      <SyntaxHighlighter
        language={language}
        customStyle={{ padding: "2rem", margin: "1.5rem 0" }}
        style={dracula}
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className="absolute text-[#ffffffcf] top-1 right-1 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in bg-[rgb(37,37,37)] text-white/81 hover:bg-[#ffffff0e] rounded-l text-xs p-1.5 m-1 cursor-pointer"
        style={{ transition: "background 20ms ease-in 0s" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
        {buttonLabel}
      </button>
    </div>
  );
};
