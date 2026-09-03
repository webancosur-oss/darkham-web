import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";

import StudioLoader from "@/components/StudioLoader/StudioLoader";
import StudioNav from "@/components/StudioNav/StudioNav";
import StudioSideRail from "@/components/studioRetail/StudioSideRail";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darkham — Estudio de Arquitectura",
  description:
    "Darkham es un estudio de arquitectura dedicado al diseño de espacios contemporáneos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <StudioLoader />
        <StudioSideRail />
        <StudioNav />
        {children}
      </body>
    </html>
  );
}