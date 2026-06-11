import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { display, serif, mono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khushi-on-ai.vercel.app"),
  title: "Khushi on AI — an interactive essay",
  description:
    "Five questions I actually investigated about artificial intelligence, seen through a psychology lens — including a live experiment in whether a machine can pass as human.",
  authors: [{ name: "Khushi Suresh Rana" }],
  openGraph: {
    title: "Khushi on AI — an interactive essay",
    description:
      "Five questions about AI through a psychology lens, plus a live experiment in machine humanness.",
    type: "article",
    url: "https://khushi-on-ai.vercel.app",
    siteName: "Khushi on AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushi on AI — an interactive essay",
    description:
      "Five questions about AI through a psychology lens, plus a live experiment in machine humanness.",
  },
};

// Set the theme before first paint so there's no flash. Defaults to the warm
// dark theme; honors a saved choice, otherwise the system preference.
const themeInit = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
