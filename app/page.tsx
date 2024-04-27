import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getNotionPage } from "./api/notion";
import About from "./components/about";

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
