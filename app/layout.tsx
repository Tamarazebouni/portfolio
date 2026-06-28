import type { Metadata } from "next";
import { Cardo } from "next/font/google";
import "./globals.css";

const cardo = Cardo({
  variable: "--font-cardo",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tamara Pio Zebouni",
  description: "Image portfolio of Tamara Pio Zebouni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cardo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
