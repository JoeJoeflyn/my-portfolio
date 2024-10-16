import {
  Career,
  FirstRow,
  IconURL,
  Intro,
  SecondRow,
  ThirdRow,
} from "@/app/shared/constant";
import { dateFormate, isPageObjectResponse } from "@/app/shared/utils";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { getGithub } from "./api/github";
import { getNotionPage } from "./api/notion";
import ImageSection from "./components/image-sticky";
import { IconLink } from "./components/icons/icons";
import { Marquee } from "./components/marquee";

export async function generateMetadata() {
  return {
    title: "About - Nguyen Thai Tai",
    description: "This is where my WakaTime metrics will be shown here.",
  };
}

export default async function Home() {
  const { results: parentPages } = await getNotionPage();
  const githubReadme = (await getGithub()) as string;

  return (
    <div className="relative px-4 mt-14 sm:px-8 lg:px-12">
      <div className="relative md:px-4 sm:px-8 lg:px-12">
        {/* image avatar */}
        <ImageSection />
        {/* intro */}
        <div className="grid grid-cols-1 md:grid-cols-5 mt-9">
          <div className="col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Fresher.
            </h1>
            <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {Intro}
            </p>
            <div className="mt-6 flex gap-6">
              {IconURL.map((item) => (
                <IconLink key={item.href} href={item.href} img={item.img} />
              ))}
            </div>
          </div>
        </div>
        {/* marquee */}
        <div className="mt-9">
          <Marquee direction="right" speed="fast">
            {FirstRow?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 dark:text-zinc-100 text-black transition-colors duration-300 hover:text-[#3c3e49] cursor-default"
              >
                <Image
                  alt={item.text}
                  loading="lazy"
                  width={46}
                  height={46}
                  src={item.href}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
                <span className="text-xl font-semibold">{item.text}</span>
              </div>
            ))}
          </Marquee>
          <Marquee direction="left" speed="normal">
            {SecondRow?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 dark:text-zinc-100 text-black transition-colors duration-300 hover:text-[#3c3e49] cursor-default"
              >
                <Image
                  alt={item.text}
                  loading="lazy"
                  width={46}
                  height={46}
                  src={item.href}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
                <span className="text-xl font-semibold">{item.text}</span>
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" speed="slow">
            {ThirdRow?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 dark:text-zinc-100 text-black transition-colors duration-300 hover:text-[#3c3e49] cursor-default"
              >
                <Image
                  alt={item.text}
                  loading="lazy"
                  width={46}
                  height={46}
                  src={item.href}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
                <span className="text-xl font-semibold">{item.text}</span>
              </div>
            ))}
          </Marquee>
        </div>
        {/* Body */}
        <div className="mx-auto max-w-7xl mt-14 md:mt-16">
          <div className="relative">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
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
                      </article>
                    );
                  })}
                </div>
                <div className="lg:pl-16 xl:pl-24">
                  <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                    <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-6 w-6 flex-none"
                      >
                        <path
                          d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                        />
                        <path
                          d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                          className="stroke-zinc-400 dark:stroke-zinc-500"
                        />
                      </svg>
                      <span className="ml-3">Career</span>
                    </h2>
                    <ol className="mt-6 space-y-4">
                      {Career.map((item, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <Image
                              alt={`${item.company} logo`}
                              loading="lazy"
                              width={200}
                              height={175}
                              className="object-contain"
                              src={item.logoSrc}
                              style={{ color: "transparent" }}
                            />
                          </div>
                          <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {item.company}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                              {item.role}
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                              aria-label={`${item.dateStart} until ${item.dateEnd}`}
                            >
                              <time dateTime={item.dateStart}>
                                {item.dateStart}
                              </time>{" "}
                              <span aria-hidden="true">—</span>{" "}
                              <time dateTime={item.dateEnd}>
                                {item.dateEnd}
                              </time>
                            </dd>
                          </dl>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 my-5">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: marked(githubReadme) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
