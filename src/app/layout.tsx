import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Design Craft",
  description: "Product design craft.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
