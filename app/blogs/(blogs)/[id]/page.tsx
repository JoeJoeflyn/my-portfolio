import { getNotionChildrenPage, getPage, getTableRow } from "@/app/api/notion";
import Blog from "@/app/components/blog";
export default async function page({ params }: { params: { id: string } }) {
  const [results, heading] = await Promise.all([
    getNotionChildrenPage(params.id),
    getPage(params.id),
  ]);
  const tableBlockId = results?.results.find((block) => {
    if ("type" in block) return block.type === "table";
  })?.id;
  const tableRow = tableBlockId ? await getTableRow(tableBlockId) : null;
  const toggleBlockId = results?.results.find((block) => {
    if ("type" in block) return block.type === "toggle";
  })?.id;
  const toggle = toggleBlockId ? await getTableRow(toggleBlockId) : null;
  const extendedResults = results?.results.map((block) => {
    if ("type" in block && block.type === "table" && tableRow) {
      return { ...block, tableRow };
    }
    if ("type" in block && block.type === "toggle" && toggle) {
      if (
        toggle !== null &&
        "type" in toggle &&
        toggle.results[0] &&
        "paragraph" in toggle.results[0] &&
        "rich_text" in toggle.results[0].paragraph
      ) {
        (block.toggle as any).children = [
          ...toggle.results[0].paragraph.rich_text,
        ];
      }

      return block;
    }

    return block;
  });

  // console.log("hehe", JSON.stringify(extendedResults, null, 2));

  return <Blog heading={heading} results={extendedResults} />;
}
