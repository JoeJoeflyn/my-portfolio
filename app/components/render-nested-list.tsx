import dynamic from "next/dynamic";
import React from "react";
const RenderBlock = dynamic(() => import("./render-utils"));

export default function RenderNestedList(blocks: any) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <ol>
        {value.children.map((block: any) => (
          <React.Fragment key={block.id}>
            <RenderBlock block={block} />
          </React.Fragment>
        ))}
      </ol>
    );
  }
  return (
    <ul>
      {value.children.map((block: any) => (
        <React.Fragment key={block.id}>
          <RenderBlock block={block} />
        </React.Fragment>
      ))}
    </ul>
  );
}
