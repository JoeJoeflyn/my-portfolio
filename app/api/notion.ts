import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
  timeoutMs: 180 * 1000,
});

export const getNotionPage = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_PAGE_ID as string,
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

export const getNotionChildrenPage = async (id: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: id,
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

export const getPage = async (id: string) => {
  const response = await notion.pages.retrieve({ page_id: id });

  return response;
};

export const getTableRow = async (id: string) => {
  const response = await notion.blocks.children.list({
    block_id: id,
  });

  return response;
};
