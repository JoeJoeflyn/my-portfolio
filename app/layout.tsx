import type { Metadata } from "next";
import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
import { Providers } from "./providers/providers";

const baseMetadata = {
  title: "Nguyen Thai Tai",
  description: "Nguyen Thai Tai Portfolio",
  applicationName: "Nguyen Thai Tai Portfolio",
  authors: [{ name: "Nguyen Thai Tai Portfolio" }],
  keywords: [
    "Nguyen Thai Tai",
    "portfolio",
    "software engineer",
    "web developer",
    "frontend developer",
    "backend developer",
    "full-stack developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Mongoose",
    "Prisma",
    "responsive design",
    "UI/UX design",
    "API development",
  ],
  generator: "Nguyen Thai Tai Portfolio",
  creator: "Nguyen Thai Tai Portfolio",
  publisher: "Nguyen Thai Tai Portfolio",
};

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: {
      default: baseMetadata.title,
      template: `%s | ${baseMetadata.title}`,
    },
    openGraph: {
      title: baseMetadata.title,
      description: baseMetadata.description,
      url: "https://my-portfolio-three-sepia.vercel.app/",
      siteName: baseMetadata.title,
      images: ["/images/kurumi-hehe.png"],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: baseMetadata.title,
      description: baseMetadata.description,
      images: ["/images/kurumi-hehe.png"],
    },
    verification: {
      google: "h-krulVRrLSSg-fSeJVcQMGF_1XnEb8QYSyYGw6b_t4",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col bg-zinc-100 dark:bg-zinc-900">
          <div className="inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                <Providers>
                  <Header />
                  {children}
                  <Footer />
                </Providers>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
