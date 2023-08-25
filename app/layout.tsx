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
  title: "Joe Juicer portfolio, this is the place where i show my journey",
  description:
    "Bonjour 👋! I am Joe Juicer 21 years old 🇻🇳, student of web development at FPT Polytechnic College of CanTho.",
  // Should write more information in description tag above
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
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}
