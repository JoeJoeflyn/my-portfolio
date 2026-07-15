"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INTRO } from "@/app/shared/constant";

type Line = {
  id: number;
  type: "cmd" | "out" | "ok" | "err";
  text: string;
};

type FocusProject = {
  name: string;
  description: string;
  url: string;
  language: string;
  pushedAt: string;
};

type Props = {
  focusProject?: FocusProject | null;
};

const COMMANDS: Record<string, string[]> = {
  help: [
    "available commands:",
    "  whoami          — who you are",
    "  ls              — list sections",
    "  cat intro.txt   — read intro",
    "  focus           — what I'm building now",
    "  projects        — jump to projects",
    "  contact         — how to reach me",
    "  clear           — clear screen",
  ],
  whoami: ["Nguyen Thai Tai — full-stack web developer, Ho Chi Minh City."],
  ls: ["about/", "projects/", "experience/", "github/", "contact/", "intro.txt"],
  "cat intro.txt": [INTRO],
  projects: ["-> routing to /projects ..."],
  contact: [
    "email: thaitainguyen336@gmail.com",
    "github: github.com/JoeJoeflyn",
    "linkedin: linkedin.com/in/tai-nguyen-106a1624b",
  ],
  clear: [],
};

let lineId = 0;
function nextId() {
  return ++lineId;
}

export default function InteractiveTerminal({ focusProject }: Props) {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for the initial command
  useEffect(() => {
    const phrase = "cat intro.txt";
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(phrase.slice(0, i));
      if (i >= phrase.length) {
        clearInterval(timer);
        setTimeout(() => {
          setTypingDone(true);
          setTimeout(() => setShowOutput(true), 200);
        }, 300);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom when new lines added
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, showOutput]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const cmdLine: Line = {
      id: nextId(),
      type: "cmd",
      text: trimmed,
    };

    if (trimmed.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    if (trimmed.toLowerCase() === "focus") {
      const focusLines: Line[] = focusProject
        ? [
            { id: nextId(), type: "ok" as const, text: `>> currently building: ${focusProject.name}` },
            { id: nextId(), type: "ok" as const, text: `   ${focusProject.description}` },
            { id: nextId(), type: "ok" as const, text: `   language: ${focusProject.language}` },
            { id: nextId(), type: "ok" as const, text: `   last push: ${focusProject.pushedAt}` },
            { id: nextId(), type: "ok" as const, text: `   repo: ${focusProject.url}` },
          ]
        : [{ id: nextId(), type: "err" as const, text: "no focused project set" }];
      setLines((prev) => [...prev, cmdLine, ...focusLines]);
      return;
    }

    const result = COMMANDS[trimmed.toLowerCase()];
    const outLines: Line[] = result
      ? result.map((text) => ({
          id: nextId(),
          type: "ok" as const,
          text,
        }))
      : [
          {
            id: nextId(),
            type: "err" as const,
            text: `command not found: ${trimmed}`,
          },
          { id: nextId(), type: "err" as const, text: 'type "help" for commands' },
        ];

    setLines((prev) => [...prev, cmdLine, ...outLines]);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = input;
        setInput("");
        runCommand(cmd);
      }
    },
    [input, runCommand]
  );

  return (
    <div
      className="w-full max-w-3xl border-2 border-[var(--border-heavy)] bg-[#0c0c0c] shadow-[6px_6px_0_var(--border-heavy)]"
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b-2 border-[var(--border-heavy)] bg-[var(--surface)] px-4 py-2.5">
        <span className="h-3 w-3 border-2 border-[var(--border-heavy)] bg-[#ff5f56]" />
        <span className="h-3 w-3 border-2 border-[var(--border-heavy)] bg-[#ffbd2e]" />
        <span className="h-3 w-3 border-2 border-[var(--border-heavy)] bg-[#27c93f]" />
        <span className="ml-2 font-body text-xs tracking-wider text-[var(--text-muted)]">
          guest@portfolio: ~
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={bodyRef}
        className="max-h-[340px] min-h-[280px] overflow-y-auto px-6 py-5 font-body text-sm leading-relaxed"
      >
        <div className="text-[var(--text-muted)]">
          Last login: Wed Jul 15 09:41:02 on tty1
        </div>

        {/* Initial typed command */}
        <div className="mt-1 flex">
          <span className="text-[var(--yellow)]">$&nbsp;</span>
          <span>{typed}</span>
          {!typingDone && (
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--yellow)]" />
          )}
        </div>

        {/* Output of cat intro.txt */}
        {showOutput && (
          <div className="mt-2 animate-fade-in">
            {INTRO.split(". ").map((sentence, i, arr) => (
              <div key={i} className="text-[var(--text-secondary)]">
                {sentence}
                {i < arr.length - 1 ? "." : ""}
              </div>
            ))}
          </div>
        )}

        {/* User command history */}
        {lines.map((line) => (
          <div key={line.id} className="mt-1">
            {line.type === "cmd" ? (
              <div className="flex">
                <span className="text-[var(--yellow)]">$&nbsp;</span>
                <span>{line.text}</span>
              </div>
            ) : line.type === "err" ? (
              <div className="text-[#ef4444]">{line.text}</div>
            ) : line.text.startsWith("->") ? (
              <div className="text-[var(--yellow)]">
                {line.text}
                <Link
                  href="/projects"
                  className="ml-2 underline underline-offset-2 hover:text-[var(--text-primary)]"
                >
                  [go]
                </Link>
              </div>
            ) : (
              <div className="text-[var(--text-secondary)]">{line.text}</div>
            )}
          </div>
        ))}

        {/* Active input */}
        {showOutput && (
          <div className="mt-1 flex items-center">
            <span className="text-[var(--yellow)]">$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 border-none bg-transparent text-[var(--text-primary)] outline-none caret-[var(--yellow)]"
              placeholder='type a command (try: whoami, ls, help)'
            />
          </div>
        )}
      </div>
    </div>
  );
}
