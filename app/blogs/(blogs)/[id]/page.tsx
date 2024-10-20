import {
  getNotionChildrenPage,
  getNotionPage,
  getPage,
  getTableRow,
} from "@/app/api/notion";
import {
  DatabaseObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import dynamic from "next/dynamic";
const Blog = dynamic(() => import("@/app/components/blog"));

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getPage(params.id);

  return {
    title: `${
      "properties" in data &&
      data.properties.Name &&
      data.properties.Name.type === "title" &&
      data.properties.Name.title.map((item, index) => item.plain_text)
    } - Nguyen Thai Tai`,
    description:
      " All of my cool and useful websites that i have collected to share with you.",
  };
}

export async function generateStaticParams() {
  const { results } = await getNotionPage();

  return results?.map(
    (
      page:
        | PageObjectResponse
        | PartialPageObjectResponse
        | PartialDatabaseObjectResponse
        | DatabaseObjectResponse
    ) => ({
      id: `${page.id}`,
    })
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const findBlockByIdAndType = async (
    blocks: ListBlockChildrenResponse | null,
    type: string
  ) => {
    const blockId = blocks?.results.find(
      (block) => "type" in block && block.type === type
    )?.id;
    return blockId ? await getTableRow(blockId) : null;
  };

  const enhanceBlocksWithData = (
    blocks: ListBlockChildrenResponse,
    tableRow: ListBlockChildrenResponse | null,
    toggle: ListBlockChildrenResponse | null
  ) =>
    blocks?.results.map((block) => {
      if ("type" in block) {
        if (block.type === "table" && tableRow) {
          return { ...block, tableRow };
        }
        if (
          block.type === "toggle" &&
          toggle &&
          toggle.results[0] &&
          "paragraph" in toggle.results[0]
        ) {
          const paragraphBlock = toggle.results[0] as {
            paragraph: { rich_text: any[] };
          };
          const toggleBlock = block as any;
          toggleBlock.toggle = {
            ...(toggleBlock.toggle || {}),
            children: [...paragraphBlock.paragraph.rich_text],
          };
        }
      }
      return block;
    });

  const [results, heading] = await Promise.all([
    getNotionChildrenPage(params.id),
    getPage(params.id),
  ]);

  const [tableRow, toggle] = await Promise.all([
    findBlockByIdAndType(results, "table"),
    findBlockByIdAndType(
      results,

      "toggle"
    ),
  ]);

  const extendedResults = enhanceBlocksWithData(results, tableRow, toggle);

  return <Blog heading={heading} results={extendedResults} />;
}
