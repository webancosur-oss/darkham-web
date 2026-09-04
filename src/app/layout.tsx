import type { Metadata } from "next";
import { Oswald } from "next/font/google";

import "./globals.css";

import StudioLoader from "@/components/StudioLoader/StudioLoader";
import StudioNav from "@/components/StudioNav/StudioNav";
import StudioSideRail from "@/components/studioRetail/StudioSideRail";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
      <body className={oswald.variable}>
        <StudioLoader />
        <StudioSideRail />
        <StudioNav />
        {children}
      </body>
    </html>
  );
}