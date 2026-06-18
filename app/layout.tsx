import type { Metadata } from "next";
import { Be_Vietnam_Pro, Courier_Prime } from "next/font/google";
import Footer from "./components/footer";
import Header from "./components/header";
import { getBaseUrl } from "./lib/base-url";
import "./globals.css";
import { Providers } from "./providers/providers";

const display = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const baseMetadata = {
  title: "Nguyen Thai Tai",
  description: "Nguyen Thai Tai Portfolio — Web Developer & Designer",
  applicationName: "Nguyen Thai Tai",
  authors: [{ name: "Nguyen Thai Tai" }],
  keywords: [
    "Nguyen Thai Tai", "portfolio", "web developer", "frontend",
    "TypeScript", "React", "Next.js", "Node.js", "design",
  ],
  creator: "Nguyen Thai Tai",
  publisher: "Nguyen Thai Tai",
};

export async function generateMetadata(): Promise<Metadata> {
  const base = await getBaseUrl();
  return {
    ...baseMetadata,
    metadataBase: new URL(base),
    title: { default: baseMetadata.title, template: `%s | ${baseMetadata.title}` },
    openGraph: {
      title: baseMetadata.title, description: baseMetadata.description,
      siteName: baseMetadata.title, images: "/images/avatar.jpg",
      locale: "en_US", type: "website",
    },
    twitter: {
      card: "summary_large_image", title: baseMetadata.title,
      description: baseMetadata.description, images: "/images/avatar.jpg",
    },
    verification: { google: "h-krulVRrLSSg-fSeJVcQMGF_1XnEb8QYSyYGw6b_t4" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} font-body antialiased`}>
        <div className="grid-bg" />
        <Providers>
          <div className="relative z-0 flex flex-col min-h-screen page-enter">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
