import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard ASN Kabupaten Magetan",
  description: "Visualisasi data ASN Kabupaten Magetan berdasarkan Google Sheet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="batik-field" />
        {children}
      </body>
    </html>
  );
}
