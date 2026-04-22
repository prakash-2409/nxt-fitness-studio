import type { Metadata } from "next";
import { Bebas_Neue, Anton, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NXT Fitness Studio | Chennai's #1 Private Gym",
  description:
    "Train harder. Get results. NXT Fitness Studio is Chennai's most serious private training studio with expert coaches, premium equipment, and proven transformation programs.",
  keywords:
    "gym Chennai, private gym Chennai, personal trainer Chennai, fitness studio Chennai, weight loss Chennai, NXT Fitness",
  openGraph: {
    title: "NXT Fitness Studio | Chennai's Premier Private Gym",
    description:
      "Train at Chennai's most serious private gym. Expert coaches, premium equipment, proven transformations.",
    url: "https://www.nxtfitnessstudio.com",
    siteName: "NXT Fitness Studio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NXT Fitness Studio | Chennai's #1 Private Gym",
    description:
      "Chennai's most serious private training studio. Expert coaches, premium equipment, proven results.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${anton.variable} ${spaceMono.variable} ${inter.variable}`}
    >
      <head>
        <link rel="canonical" href="https://www.nxtfitnessstudio.com" />
      </head>
      <body
        style={{
          fontFamily: "var(--font-body)",
          background: "#080808",
          color: "#F0F0F0",
        }}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          {/* Noise texture overlay */}
          <svg className="noise-overlay" aria-hidden="true">
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
