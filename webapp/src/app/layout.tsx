import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lista przygotowań",
  description: "Wspólna checklista wydarzenia — zaznaczaj, notuj, zapraszaj.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
