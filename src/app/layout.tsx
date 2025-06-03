import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find recipes using Spoonacular API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark1">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
