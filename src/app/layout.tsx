import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/ui/header";

export const metadata: Metadata = {
  title: "Library Management",
  description: "Web application to manage books in the library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-mono antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
