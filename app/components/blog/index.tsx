"use client";
import {
  dateFormate,
  isBlockObjectResponse,
  parsingEmoji,
} from "@/app/shared/utils";
import {
  BlockObjectResponse,
  GetPageResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const RenderBlock = dynamic(() => import("@/app/components/render-utils"));

export default function Blog({
  heading,
  results,
}: {
  heading: GetPageResponse;
  results: (PartialBlockObjectResponse | BlockObjectResponse)[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="xl:relative">
              <div className="mx-auto max-w-2xl">
                <Link
                  aria-label="Go back to posts"
                  className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                  href="/blogs"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                  >
                    <path
                      d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <article>
                  <header className="flex flex-col">
                    <div className="relative my-6 group">
                      <div
                        className={`overflow-hidden ${"cover" in heading &&
                          heading?.cover !== null &&
                          "h-52"
                          } relative`}
                        ref={containerRef}
                      >
                        {"cover" in heading && heading?.cover !== null && (
                          <Image
                            priority
                            ref={imageRef}
                            src={
                              "external" in heading?.cover! &&
                                heading?.cover?.external?.url
                                ? heading.cover.external.url
                                : "file" in heading?.cover! &&
                                  heading?.cover?.file?.url
                                  ? heading.cover.file.url
                                  : ""
                            }
                            alt="Guillotined"
                            draggable={false}
                            fill
                            className="absolute object-cover"
                            sizes="(max-width: 768px) 100vw, 672px"
                          />
                        )}
                      </div>
                      {/* <div
                        className={`${
                          "cover" in heading &&
                          heading?.cover !== null &&
                          "absolute left-3 -bottom-8"
                        }`}
                      >
                        {"icon" in heading &&
                          heading.icon !== null &&
                          "emoji" in heading?.icon! && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: parsingEmoji(heading?.icon?.emoji),
                              }}
                            ></div>
                          )}
                      </div> */}
                    </div>
                    <h1 className="mt-6 md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-5xl">
                      {"properties" in heading &&
                        "Name" in heading?.properties &&
                        "title" in heading?.properties?.Name &&
                        heading?.properties?.Name?.title?.length
                        ? "plain_text" in heading?.properties?.Name?.title[0] &&
                        heading?.properties?.Name?.title[0]?.plain_text
                        : "Untitled"}
                    </h1>
                    <time className="order-first flex items-center text-base text-zinc-200 dark:text-zinc-100">
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                      <span className="ml-3">
                        {"created_time" in heading &&
                          dateFormate(heading?.created_time)}
                      </span>
                    </time>
                  </header>
                  <div className="mt-8 prose dark:prose-invert">
                    {results?.map((block) => {
                      if (!isBlockObjectResponse(block)) return null;
                      return (
                        <React.Fragment key={block.id}>
                          <RenderBlock block={block} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
