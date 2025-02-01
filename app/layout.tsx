import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { StoreProvider } from "./store/storeProvider";
import 'aos/dist/aos.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Angkasangga Party-List",
  description: "ANGKASangga Para sa Manggagawang Impormal! Layunin na maipasa ang mga panukalang nagsusulong sa kapakanan ng impormal na sektor at gawin kayong ganap na entrepreneurs o 'nanopreneurs'. Gumawa ng oportunidad para sa sustenableng pangkabuhayan para sa mga ordinaryong Pilipino upang maging bahagi ng pormal na sektor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Suspense fallback={`loading...`}>
            {children}
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
