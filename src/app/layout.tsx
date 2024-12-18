import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { MotionConfig } from "motion/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simple Form Builder",
  description: "Application to create simple forms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MotionConfig reducedMotion="user">
        <body className={`${inter.className} antialiased`}>
          <header className="relative">
            <h1 className="sr-only">form builder</h1>
          </header>
          <main className="max-w-[min(100%,90rem)] mx-auto h-full overflow-y-scroll">
            {children}
          </main>
        </body>
      </MotionConfig>
    </html>
  );
}
