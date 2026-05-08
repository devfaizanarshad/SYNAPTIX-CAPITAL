import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synaptix Capital | Strategic Capital Advisory",
  description:
    "Synaptix Capital partners with founders, investors, and businesses across M&A, capital raising, private equity, and venture capital."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
