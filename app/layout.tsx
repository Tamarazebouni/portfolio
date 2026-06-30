import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamondPremier = EB_Garamond({
  variable: "--font-garamond-premier",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tamarazebouni.com"),
  title: "Tamara Pio Zebouni",
  description: "Image portfolio of Tamara Pio Zebouni.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tamara Pio Zebouni",
    description: "Image portfolio of Tamara Pio Zebouni.",
    url: "https://tamarazebouni.com",
    siteName: "Tamara Pio Zebouni",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamondPremier.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
