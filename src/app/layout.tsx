import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hackX 11.0 — Sri Lanka's Premier National Startup Challenge",
  description: "Where university students turn bold ideas into real ventures. Backed by the nation. Built by students. Eleven years running.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-black text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
