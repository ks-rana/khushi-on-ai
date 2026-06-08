import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";

// Display: Fraunces — a characterful, high-contrast editorial serif with an
// optical-size axis. Used for the hero, station numbers, and headings.
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

// Body: Newsreader — a screen-optimized reading serif in the Distill / longform
// tradition. Carries all running prose.
export const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

// Detail: JetBrains Mono — labels, station tags, data figures, citation markers.
// The "instrument panel" voice against the warm serif.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
