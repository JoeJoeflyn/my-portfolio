import { dateFormate, isPageObjectResponse } from "@/app/shared/utils";
import Link from "next/link";
import React from "react";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default function BlogSection({
  parentPages,
}: {
  parentPages: (
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  )[];
}) {
  return (
    <div className="flex flex-col gap-16">
      {parentPages?.map((page, index) => {
        if (!isPageObjectResponse(page)) return null;
        return (
          <article
            key={page?.id}
            className="group relative flex flex-col items-start"
          >
            <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              <div className="absolute -inset-y-6 -inset-x-4 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
              <Link href={`/blogs/${page?.id}`}>
                <span className="absolute -inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl"></span>
                <span className="relative">
                  {"properties" in page &&
                    page.properties.Name &&
                    page.properties.Name.type === "title" &&
                    page.properties.Name.title.map(
                      (item, index) => item.plain_text
                    )}
                </span>
              </Link>
            </h2>
            <time
              className="relative order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
              dateTime={dateFormate(
                "created_time" in page ? (page?.created_time as string) : ""
              )}
            >
              <span
                className="absolute inset-y-0 left-0 flex items-center"
                aria-hidden="true"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
              </span>
              {"created_time" in page &&
                dateFormate(page?.created_time as string)}
            </time>
            <Link
              href={`/blogs/${page?.id}`}
              aria-hidden="true"
              className="relative mt-4 flex items-center text-sm font-medium text-teal-500"
            >
              Read article
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="ml-1 h-4 w-4 stroke-current"
              >
                <path
                  d="M6.75 5.75 9.25 8l-2.5 2.25"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
