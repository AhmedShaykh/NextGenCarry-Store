import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Mulish } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGenCarry Store",
  description: "NextGenCarry E-Commerce Store",
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
      lang="en"
      suppressHydrationWarning={true}
      className={`${Mulish.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
};