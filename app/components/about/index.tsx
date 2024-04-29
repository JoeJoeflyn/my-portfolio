import { TechLogoHeaven, TechLogoHell } from "@/app/shared/constant";
import { dateFormate, isPageObjectResponse } from "@/app/shared/utils";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";

export default function About({
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
    <div className="relative px-4 sm:px-8 lg:px-12">
      <div className="mt-14 relative px-4 sm:px-8 lg:px-12">
        <div className="relative h-16 w-16">
          <Image
            fill={true}
            src="/images/avatar.jpg"
            alt="Avatar"
            className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
          />
        </div>
        <div className="grid grid-cols-5 mt-9">
          <div className="col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Fresher.
            </h1>
            <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Bonjour! I&apos;m Tai Nguyen, Juicer 21 years old, student of web
              development at FPT PolyTechnic College of CanTho. I enjoy reading
              comics and manga, playing games and sports, listening US-UK&apos;s
              song and news. It&apos;s very nice to meet y&apos;all 🖤.
            </p>
            <div className="mt-6 flex gap-6">
              <Link href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#000000"}
                  fill={"none"}
                  className="h-6 w-6 transition text-zinc-500 hover:fill-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  <path
                    d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-300 dark:hover:fill-zinc-50"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  ></path>
                </svg>
              </Link>
              <Link href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-300 dark:hover:fill-zinc-50"
                >
                  <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                </svg>
              </Link>
              <Link href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-300 dark:hover:fill-zinc-50"
                >
                  <path d="M9.593 10.971c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055.011-.581-.427-1.055-.968-1.055zm3.468 0c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055-.001-.581-.427-1.055-.968-1.055z"></path>
                  <path d="M17.678 3H4.947A1.952 1.952 0 0 0 3 4.957v12.844c0 1.083.874 1.957 1.947 1.957H15.72l-.505-1.759 1.217 1.131 1.149 1.064L19.625 22V4.957A1.952 1.952 0 0 0 17.678 3zM14.01 15.407s-.342-.408-.626-.771c1.244-.352 1.719-1.13 1.719-1.13-.39.256-.76.438-1.093.562a6.679 6.679 0 0 1-3.838.398 7.944 7.944 0 0 1-1.396-.41 5.402 5.402 0 0 1-.693-.321c-.029-.021-.057-.029-.085-.048a.117.117 0 0 1-.039-.03c-.171-.094-.266-.16-.266-.16s.456.76 1.663 1.121c-.285.36-.637.789-.637.789-2.099-.067-2.896-1.444-2.896-1.444 0-3.059 1.368-5.538 1.368-5.538 1.368-1.027 2.669-.998 2.669-.998l.095.114c-1.71.495-2.499 1.245-2.499 1.245s.21-.114.561-.275c1.016-.446 1.823-.57 2.156-.599.057-.009.105-.019.162-.019a7.756 7.756 0 0 1 4.778.893s-.751-.712-2.366-1.206l.133-.152s1.302-.029 2.669.998c0 0 1.368 2.479 1.368 5.538 0-.001-.807 1.376-2.907 1.443z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-24 md:mt-28">
          <div className="w-full inline-flex gap-3 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center gap-3 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-right">
              {TechLogoHeaven.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                >
                  <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
                  <div className="w-auto">{item.content}</div>
                </div>
              ))}
            </ul>
            <ul
              className="flex items-center gap-3 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-right"
              aria-hidden="true"
            >
              {TechLogoHeaven.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                >
                  <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
                  <div className="w-auto">{item.content}</div>
                </div>
              ))}
            </ul>
          </div>
          <div className="w-full inline-flex gap-3 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center gap-3 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-left">
              {TechLogoHell.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                >
                  <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
                  <div className="w-auto">{item.content}</div>
                </div>
              ))}
            </ul>
            <ul
              className="flex items-center gap-3 whitespace-nowrap justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-left"
              aria-hidden="true"
            >
              {TechLogoHell.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-2 h-12 p-5 rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                >
                  <div dangerouslySetInnerHTML={{ __html: item.logo }}></div>
                  <div className="w-auto">{item.content}</div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 px-8 md:mt-16 border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <article className="flex flex-col gap-16">
            {parentPages?.map((page, index) => {
              if (!isPageObjectResponse(page)) return null;
              return (
                <div
                  key={page?.id}
                  className="group relative flex flex-col items-start"
                >
                  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <Link href={`/blogs/${page?.id}`}>
                      <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span className="relative z-10">
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
                    className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
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
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    {"created_time" in page &&
                      dateFormate(page?.created_time as string)}
                  </time>
                  <Link
                    href={`/blogs/${page?.id}`}
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
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
              );
            })}
          </article>
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
                <span className="ml-3">Work</span>
              </h2>
              <ol className="mt-6 space-y-4">
                <li className="flex gap-4">
                  <div className="dark:hidden relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={1155}
                      height={1000}
                      decoding="async"
                      data-nimg={1}
                      className="h-7 w-7"
                      src="/_next/static/media/vercel-icon-dark.2ebbf9a0.svg"
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="dark:visible hidden relative mt-1 dark:flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                      alt=""
                      loading="lazy"
                      width={1155}
                      height={1000}
                      decoding="async"
                      data-nimg={1}
                      className="h-7 w-7"
                      src="/_next/static/media/vercel-icon-light.b9089c05.svg"
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <dl className="flex flex-auto flex-wrap gap-x-2">
                    <dt className="sr-only">Company</dt>
                    <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Vercel
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      Director of Sales Engineering
                    </dd>
                    <dt className="sr-only">Date</dt>
                    <dd
                      className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                      aria-label="2021 until Present"
                    >
                      <time dateTime={"2021"}>2021</time>{" "}
                      <span aria-hidden="true">—</span>{" "}
                      <time dateTime={"2024"}>Present</time>
                    </dd>
                  </dl>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
