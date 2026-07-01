import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICICI Card Assistant — Credit Card MITC Bot",
  description: "AI-powered assistant for ICICI Bank Credit Card queries. Get instant answers about fees, charges, reward points, billing, EMI, and more based on the official MITC document.",
  keywords: ["ICICI Bank", "credit card", "MITC", "fees", "charges", "reward points", "interest", "AI assistant"],
  authors: [{ name: "ICICI Card Assistant" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ICICI Card Assistant — Credit Card MITC Bot",
    description: "AI-powered assistant for ICICI Bank Credit Card queries based on official MITC document.",
    url: "https://icici-card-assistant.vercel.app",
    siteName: "ICICI Card Assistant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICICI Card Assistant — Credit Card MITC Bot",
    description: "AI-powered assistant for ICICI Bank Credit Card queries based on official MITC document.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
