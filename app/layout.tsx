import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOL SON 0",
  description: "SOL SON 0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
