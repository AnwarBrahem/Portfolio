import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anwar Brahem — Industrial CS & Embedded Systems",
  description:
    "Portfolio of Anwar Brahem — IoT engineer, embedded systems developer, and full-stack web developer. ENETCOM Sfax.",
  keywords: ["IoT", "ESP32", "Raspberry Pi", "Next.js", "React", "Embedded Systems"],
  openGraph: {
    title: "Anwar Brahem — Portfolio",
    description: "IoT · Embedded Systems · Web Development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
