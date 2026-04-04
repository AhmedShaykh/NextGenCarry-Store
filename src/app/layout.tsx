import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Mulish } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXTGEN CARRY",
  description: "NEXTGEN CARRY E-COMMERCE WEBSITE",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${Mulish.className} h-full antialiased`}
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
};