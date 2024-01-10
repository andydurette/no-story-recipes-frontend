import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
        <Navbar />
        <main className="min-h-[calc(100vh-120px)] h-full mx-auto bg-heavy-grey flex">
          <div className="flex min-h-full flex-col items-center w-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
