import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getNotionPage } from "./api/notion";
import About from "./components/about";

export async function generateMetadata() {
  return {
    title: "About - Nguyen Thai Tai",
    description: "This is where my WakaTime metrics will be shown here.",
  };
}

export default async function Home() {
  const { results: parentPages } = await getNotionPage();

  return (
    <About
      parentPages={
        parentPages as (
          | PageObjectResponse
          | PartialPageObjectResponse
          | PartialDatabaseObjectResponse
          | DatabaseObjectResponse
        )[]
      }
    />
  );
}
