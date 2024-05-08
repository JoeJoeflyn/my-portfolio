"use client";
import useDraggable from "@/app/hooks/useDraggableImage";
import {
  parsingEmoji,
  dateFormate,
  isBlockObjectResponse,
} from "@/app/shared/utils";
import { renderBlock } from "@/app/shared/utils/renderUtils";
import {
  BlockObjectResponse,
  GetPageResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import React from "react";

export default function Blog({
  heading,
  results,
}: {
  heading: GetPageResponse;
  results: (PartialBlockObjectResponse | BlockObjectResponse)[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const { setIsReposition, isReposition, translation, handleMouseDown } =
    useDraggable(containerRef, imageRef);

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
                      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        {"cover" in heading && heading?.cover ? (
                          isReposition ? (
                            <div className="flex items-center rounded">
                              <div
                                onClick={() => setIsReposition((prev) => !prev)}
                                role="button"
                                tabIndex={0}
                                className="user-select-none transition-background duration-20 ease-in cursor-pointer border-r border-r-[rgba(255,255,255,0.094)] flex items-center justify-center px-1.5 py-1 rounded-s bg-[#252525] hover:bg-[#2F2F2F] font-normal text-xs text-[#9B9B9B] fill-current"
                              >
                                Save position
                              </div>
                              <div
                                onClick={() => setIsReposition((prev) => !prev)}
                                role="button"
                                tabIndex={0}
                                className="user-select-none transition-background duration-20 ease-in cursor-pointer flex items-center justify-center px-1.5 py-1 rounded-e bg-[#252525] hover:bg-[#2F2F2F] font-normal text-xs text-[#9B9B9B] fill-current"
                              >
                                Cancel
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center rounded">
                              <div
                                onClick={() => setIsReposition((prev) => !prev)}
                                role="button"
                                tabIndex={0}
                                className="user-select-none transition-background duration-20 ease-in cursor-pointer border-r border-r-[rgba(255,255,255,0.094)] flex items-center justify-center px-1.5 py-1 rounded bg-[#252525] hover:bg-[#2F2F2F] font-normal text-xs text-[#9B9B9B] fill-current"
                              >
                                Reposition
                              </div>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={`overflow-hidden ${
                          "cover" in heading &&
                          heading?.cover !== null &&
                          "h-52"
                        } relative`}
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                      >
                        {"cover" in heading && heading?.cover !== null && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            ref={imageRef}
                            src={
                              "external" in heading?.cover! &&
                              heading?.cover?.external?.url
                                ? heading.cover.external.url
                                : "file" in heading?.cover! &&
                                  heading?.cover?.file?.url
                                ? heading.cover.file.url
                                : undefined
                            }
                            draggable="false"
                            alt="Guillotined"
                            style={{
                              position: "absolute",
                              top: `${
                                isReposition ? translation : translation
                              }px`,
                              left: "50%",
                              transform: "translateX(-50%)",
                              cursor: isReposition ? "move" : "default",
                            }}
                          />
                        )}
                      </div>
                      <div
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
                      </div>
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
                    <time
                      dateTime="2024-01-01"
                      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    >
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
                          {renderBlock(block)}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {/* <div className="not-prose flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-16 space-y-8">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                      Related Content
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <a
                        className="flex flex-col items-start justify-start w-full p-4 space-y-4 transition rounded-lg shadow-md hover:shadow-lg dark:bg-zinc-800 dark:hover:bg-zinc-700 group"
                        href="/newsletter/making-decisions-while-bootstrapping"
                      >
                        <div className="flex flex-col items-start justify-start w-full">
                          <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:underline ">
                            {" "}
                            Making decisions while bootstrapping
                          </h3>
                          <p className="text-base text-zinc-400 dark:text-zinc-500 ">
                            Following your energy as a compass
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-start w-full space-x-2">
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            Tue Dec 28 2021
                          </span>
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            newsletter
                          </span>
                        </div>
                      </a>
                      <a
                        className="flex flex-col items-start justify-start w-full p-4 space-y-4 transition rounded-lg shadow-md hover:shadow-lg dark:bg-zinc-800 dark:hover:bg-zinc-700 group"
                        href="/posts/bootstrap-1000"
                      >
                        <div className="flex flex-col items-start justify-start w-full">
                          <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:underline ">
                            Bootstrap 1000 Challenge
                          </h3>
                          <p className="text-base text-zinc-400 dark:text-zinc-500 ">
                            The stair-step approach for profitable side projects
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-start w-full space-x-2">
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            Fri Nov 19 2021
                          </span>
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            article
                          </span>
                        </div>
                      </a>
                      <a
                        className="flex flex-col items-start justify-start w-full p-4 space-y-4 transition rounded-lg shadow-md hover:shadow-lg dark:bg-zinc-800 dark:hover:bg-zinc-700 group"
                        href="/newsletter/rules-for-profitable-side-projects"
                      >
                        <div className="flex flex-col items-start justify-start w-full">
                          <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:underline ">
                            {" "}
                            Rules for profitable side projects
                          </h3>
                          <p className="text-base text-zinc-400 dark:text-zinc-500 ">
                            Helpful constraints if trying to make money with a
                            side project
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-start w-full space-x-2">
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            Tue Dec 28 2021
                          </span>
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                          <span className="text-base text-zinc-400 dark:text-zinc-500">
                            newsletter
                          </span>
                        </div>
                      </a>
                    </div>
                  </div> */}
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
