import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD Preview",
  description: "Live Markdown previewer with GFM support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
