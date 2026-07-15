import type { Metadata } from "next";
import localFont from "next/font/local";
import { assetPath } from "../lib/asset-path";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter.woff2", variable: "--font-inter", weight: "100 900" });
const outfit = localFont({ src: "./fonts/outfit.woff2", variable: "--font-outfit", weight: "100 900" });

export async function generateMetadata(): Promise<Metadata> {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    metadataBase: new URL(origin),
    title: "ZenduONE Academy",
    description: "Interactive product training for Maps, Safety, Reports, and Administration.",
    icons: { icon: assetPath("/favicon.svg"), shortcut: assetPath("/favicon.svg") },
    openGraph: { title: "ZenduONE Academy", description: "Learn the work. Then do it.", images: [{ url: assetPath("/og.png"), width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", title: "ZenduONE Academy", description: "Learn the work. Then do it.", images: [assetPath("/og.png")] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${outfit.variable}`}>{children}</body></html>;
}
