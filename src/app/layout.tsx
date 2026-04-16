import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nectar — Online Grocery Store",
  description:
    "Get your groceries delivered in as fast as one hour. Fresh vegetables, fruits, dairy, beverages and more.",
  keywords: ["grocery", "delivery", "online shopping", "fresh produce"],
  openGraph: {
    title: "Nectar — Online Grocery Store",
    description: "Get your groceries delivered in as fast as one hour.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="h-full bg-white text-[#181725] antialiased">
        {children}
      </body>
    </html>
  );
}
