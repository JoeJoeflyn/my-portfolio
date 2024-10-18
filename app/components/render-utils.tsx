import { CodeBlock } from "@/app/components/code-block";
import FaviconDisplay from "@/app/components/favIcon";
import Text from "@/app/components/text";
import "highlight.js/styles/github.css";
import Link from "next/link";
import React from "react";
import { Tweet } from "react-tweet";
import RenderNestedList from "./render-nested-list";

export default function RenderBlock({ block }: any) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="my-6">
          <Text title={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="my-6 font-semibold text-3xl">
          <Text title={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="my-6 font-semibold text-2xl">
          <Text title={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="my-6 font-semibold text-xl">
          <Text title={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul className="my-2">
          {value.children.map((child: any) => (
            <li key={child.id}>
              <RenderBlock block={child} />
            </li>
          ))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="my-2 list-decimal">
          {value.children.map((child: any) => (
            <React.Fragment key={child.id}>
              <li key={child.id}>
                <RenderBlock block={child} />
              </li>
            </React.Fragment>
          ))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <ul>
          <li className="my-2" key={block.id}>
            <Text title={value.rich_text} />
            {!!value.children && RenderNestedList(block)}
          </li>
        </ul>
      );
    case "to_do":
      return (
        <div>
          <label className="flex gap-1 items-center line-through" htmlFor={id}>
            <div
              contentEditable="false"
              data-content-editable-void="true"
              data-text-edit-side="start"
              className="user-select-none mr-0.5 w-6 flex items-center justify-center flex-grow-0 flex-shrink-0 min-h-[calc(1.5em+6px)]"
            >
              <div className="pseudoHover pseudoActive relative flex-shrink-0 flex-grow-0 w-4 h-4 flex items-center justify-center transition-background duration-200 ease-out bg-blue-600">
                <div aria-hidden="true">
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 14 14"
                    className="check w-3 h-3 block fill-current flex-shrink-0"
                  >
                    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
                  </svg>
                </div>
                <input
                  aria-labelledby=":ris:"
                  type="checkbox"
                  className="absolute opacity-0 w-4 h-4 top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text title={block?.toggle?.rich_text} />
          </summary>
          <div className="mx-4">
            <Text title={block?.toggle?.children} />
          </div>
        </details>
      );
    case "child_page":
      return (
        <Link
          href={`/blogs/${block?.id}`}
          className="flex items-center mt-4 hover:bg-[#ffffff0e] rounded"
        >
          <div className="px-1.5 py-1">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis font-normal leading-snug border-b border-[#ffffff21] border-opacity-13">
              page here
            </div>
          </div>
        </Link>
      );
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img className="mx-auto" src={src} alt={caption} />
          }
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote className="my-4" key={id}>
          <div className="border-l-2 break-words border-current pl-3.5 pr-3.5 w-full">
            {value.rich_text[0].plain_text}
          </div>
        </blockquote>
      );
    case "code":
      return <CodeBlock language="tsx" code={value.rich_text[0].plain_text} />;
    case "file": {
      const srcFile =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className="py-0.5 px-1 dark:hover:cursor-pointer dark:hover:bg-[#ffffff1a] dark:hover:rounded-sm hover:cursor-pointer hover:rounded-sm hover:bg-[#37352f14]">
            📎
            <Link className="text-inherit" href={srcFile} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = value.url;
      const url = new URL(href);
      const domain = url.hostname;
      return (
        <div className="my-4">
          <div className="w-full max-w-[761px] mt-1 mb-0 flex">
            <div className="flex w-full bg-white bg-opacity-5 rounded">
              <div
                role="button"
                tabIndex={0}
                className="w-full cursor-pointer transition duration-75 ease-in select-none relative flex items-center justify-between p-3 rounded"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path>
                  </svg>
                  <div className="truncate">Add a web bookmark</div>
                </div>
                <div className="absolute top-1 right-1 opacity-0 transition-opacity duration-200 ease-in">
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer fill-current text-white text-opacity-44"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex hover:bg-[#ffffff0e]">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              role="link"
              className="flex color-inherit no-underline select-none cursor-pointer flex-grow min-w-0 flex-wrap-reverse items-stretch text-left overflow-hidden border border-solid border-white border-opacity-13 rounded relative fill-current"
            >
              <div className="flex-1 overflow-hidden p-3 text-left">
                <div className="truncate text-white text-opacity-81 mb-0.5">
                  {domain}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <FaviconDisplay href={href} />
                  <div className="truncate text-white text-opacity-81">
                    {href}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    }
    case "table": {
      return (
        <table className="border dark:border-[#2F2F2F] border-[#E9E9E7] border-collapse text-sm dark:bg-transparent my-6">
          <tbody>
            {block?.tableRow.results?.map((rowBlock: any, rowIndex: number) => (
              <tr key={rowBlock.id}>
                {rowBlock.table_row.cells.map(
                  (cell: any, cellIndex: number) => {
                    const CellElement =
                      rowIndex === 0 && value.has_column_header ? "th" : "td";
                    const commonClasses =
                      "border dark:border-[#2F2F2F] border-[#E9E9E7] px-8 py-2 font-normal";
                    const thClasses = `${commonClasses} dark:bg-[#ffffff08] bg-[#F7F6F3]`;
                    return (
                      <CellElement
                        key={`${rowBlock.id}-${cellIndex}`}
                        className={
                          CellElement === "th" ? thClasses : commonClasses
                        }
                      >
                        <Text title={cell} />
                      </CellElement>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className="flex">
          {block.children.map((childBlock: any) => (
            <React.Fragment key={childBlock.id}>
              {RenderBlock(childBlock)}
            </React.Fragment>
          ))}
        </div>
      );
    }
    case "column": {
      return (
        <ul>
          {block.children.map((child: any) => (
            <React.Fragment key={child.id}>
              <li key={child.id}>
                <RenderBlock block={child} />
              </li>
            </React.Fragment>
          ))}
        </ul>
      );
    }
    case "embed":
      const parts = value.url.split("/");
      const tweetId = parts[parts.length - 1];

      return (
        <div className="flex justify-center">
          <Tweet id={tweetId} />
        </div>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}
