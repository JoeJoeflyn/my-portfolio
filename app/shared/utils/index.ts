import {
  BlockObjectResponse,
  GetPageResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import twemoji from "twemoji";
import { NotionBlock } from "../interface";

export const dateFormate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const isBlockObjectResponse = (
  block: PartialBlockObjectResponse | BlockObjectResponse | GetPageResponse
): block is BlockObjectResponse => {
  return "type" in block;
};

export const isPageObjectResponse = (page: any): page is NotionBlock => {
  const basicCheck =
    page &&
    "object" in page &&
    page.object === "page" &&
    "id" in page &&
    typeof page.id === "string" &&
    "created_time" in page &&
    typeof page.created_time === "string" &&
    "url" in page &&
    typeof page.url === "string";

  // Additional check for the Name property structure
  const hasName =
    "properties" in page &&
    "Name" in page.properties &&
    "title" in page.properties.Name &&
    page.properties.Name.title.length > 0 &&
    "plain_text" in page.properties.Name.title[0] &&
    typeof page.properties.Name.title[0].plain_text === "string";

  return basicCheck && hasName;
};

export default function parsingEmoji(emoji: string) {
  return twemoji.parse(emoji);
}
