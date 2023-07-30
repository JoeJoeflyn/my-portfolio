import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joe Juicer",
  description: "Joe Juicer Portfolio",
  icons: {
    icon: "/icon.ico",
  },
  verification: {
    google: "h-krulVRrLSSg-fSeJVcQMGF_1XnEb8QYSyYGw6b_t4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} img-bg`}>{children}</body>
    </html>
  );
}
