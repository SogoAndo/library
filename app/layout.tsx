import type { Metadata } from "next";
import "./globals.css";
import FrontMenuLayout from "./layout/frontmenu";

export const metadata: Metadata = {
  title: "図書管理システム",
  description: "Frontend exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <FrontMenuLayout>{children}</FrontMenuLayout>
      </body>
    </html>
  );
}
