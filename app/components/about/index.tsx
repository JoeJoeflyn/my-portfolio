import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import BlogSection from "./blogSection";
import Career from "./career";
import ImageSection from "./imageSection";
import Introduction from "./introduction";
import Marquee from "./marquee";

export default function About({
  parentPages,
  githubReadme,
}: {
  parentPages: (
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  )[];
  githubReadme: string;
}) {
  return (
    <div className="relative px-4 mt-14 sm:px-8 lg:px-12">
      <div className="relative md:px-4 sm:px-8 lg:px-12">
        {/* image avatar */}
        <ImageSection />
        {/* intro */}
        <Introduction />
        {/* marquee */}
        <Marquee />
        {/* Body */}
        <div className="mx-auto max-w-7xl mt-24 md:mt-28">
          <div className="relative">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                <BlogSection parentPages={parentPages} />
                <Career githubReadme={githubReadme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
