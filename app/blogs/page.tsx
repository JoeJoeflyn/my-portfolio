import { getNotionPage } from "@/app/api/notion";
import { dateFormate } from "../shared/utils";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Blogs - Nguyen Thai Tai",
    description:
      " All of my cool and useful websites that i have collected to share with you.",
  };
}

export default async function Page() {
  const { results: parentPages } = await getNotionPage();

  return (
    <div className="sm:px-8 mt-16 sm:my-32">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                All cool and useful websites i have ever knew.
              </h1>
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                All of my cool and useful websites that i have collected to
                share with you.
              </p>
            </header>
            <div className="mt-16 sm:mt-20">
              <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                  {parentPages.map((page) => {
                    return (
                      <article
                        key={page?.id}
                        className="md:grid md:grid-cols-4 md:items-baseline"
                      >
                        <div className="md:col-span-3 group relative flex flex-col items-start">
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
                            className="relative order-first mb-3 flex items-center text-sm text-zinc-700 dark:text-zinc-300 pl-3.5"
                            dateTime={dateFormate(
                              "created_time" in page
                                ? (page?.created_time as string)
                                : ""
                            )}
                          >
                            <span
                              className="absolute inset-y-0 left-0 flex items-center"
                              aria-hidden="true"
                            >
                              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-400"></span>
                            </span>
                            {"created_time" in page &&
                              dateFormate(page?.created_time as string)}
                          </time>
                          <Link
                            href={`/blogs/${page?.id}`}
                            aria-label="Read article"
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
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
