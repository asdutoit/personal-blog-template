import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import { Footer } from "@/app/components/layout/Footer";
import { ToastProvider } from "@/app/components/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Doe - Developer & Cloud Engineer",
  description:
    "Personal blog and portfolio showcasing development projects, cloud engineering insights, and technical expertise.",
  keywords: [
    "developer",
    "cloud engineer",
    "aws",
    "react",
    "typescript",
    "nextjs",
  ],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  metadataBase: new URL("https://stephendutoit.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stephendutoit.dev",
    title: "John Doe - Developer & Cloud Engineer",
    description:
      "Personal blog and portfolio showcasing development projects, cloud engineering insights, and technical expertise.",
    siteName: "John Doe",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Developer & Cloud Engineer",
    description:
      "Personal blog and portfolio showcasing development projects, cloud engineering insights, and technical expertise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-gray-50 dark:bg-gray-950`}
      >
        <ThemeProvider defaultTheme="system">
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Navbar />
              <div className="">{children}</div>
            </main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
