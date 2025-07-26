import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "700"] })

export const metadata: Metadata = {
  title: "ForIT Challenge",
  description: "Esta es mi solucion al challenge de la Academia ForIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
