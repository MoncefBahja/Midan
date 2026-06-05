import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar"; // <-- Importi l-Navbar hna
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MidanSaaS - Booking Terrains",
  description: "Réservez vos terrains de sport en quelques clics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"       
    suppressHydrationWarning // <-- أضف هذا السطر هنا
    className="h-full bg-gray-50">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900`}>
        {/* L-Navbar kat-7tt hna bach tkon dima f l-foq */}
        <Navbar />
        
        {/* L-Pages dyalk kamlin ghadi ybanu hna dakhil l-{children} */}
        {children}
      </body>
    </html>
  );
}


