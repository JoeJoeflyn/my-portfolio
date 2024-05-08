import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import BlogSection from "./blogSection";
import Career from "./career";
import ProfileSection from "./imageSection";
import Introduction from "./introduction";
import Marquee from "./marquee";

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
        {/* image avatar */}
        <ProfileSection />
        {/* intro */}
        <Introduction />
        {/* marquee */}
        <Marquee />
        {/* Body */}
        <div className="grid grid-cols-2 px-8 md:mt-16 border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <BlogSection parentPages={parentPages} />
          <div className="lg:pl-16 xl:pl-24">
            <Career />
          </div>
        </div>
      </div>
    </div>
  );
}
