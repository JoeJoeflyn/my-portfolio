import type { Metadata } from "next";
import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
import { Providers } from "./providers/providers";

export const metadata: Metadata = {
  title: "Nguyen Thai Tai",
  description: "Nguyen Thai Tai Portfolio",
  icons: {
    icon: "/icon.ico",
  },
  verification: {
    google: "h-krulVRrLSSg-fSeJVcQMGF_1XnEb8QYSyYGw6b_t4",
  },
  robots: {
    index: true,
    googleBot: {
      notranslate: true,
      nositelinkssearchbox: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-full flex-col bg-zinc-100 dark:bg-zinc-900">
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
