import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainWrapper from "@/components/mainWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Story Recipes",
  description: "Andy Durette's recipes",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
