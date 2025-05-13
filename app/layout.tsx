import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react"; 
import localFont from "next/font/local";

import "./globals.css";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description: "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  generator: "Next.js",
  applicationName: "Dev Overflow",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Dev Overflow",
    "programming questions",
    "developer Q&A",
    "web development",
    "JavaScript",
    "React",
    "Node.js",
    "developer community",
  ],
  authors: [
    { name: "Dmytro" },
  ],
  creator: "Dmytro",
  publisher: "Dev Overflow",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/images/site-logo.svg",
    shortcut: "/favicon.ico", 
    apple: "/apple-touch-icon.png", 
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

const RootLayout = async ({ children}: {children: ReactNode }) => {
   const session = await auth();

  return (
   <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" 
        />    
      </head>
      <SessionProvider session={session}>
       <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           {children}
         </ThemeProvider>
        <Toaster />
       </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;