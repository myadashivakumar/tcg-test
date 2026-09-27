import "./globals.css";
import { Playfair_Display, Dancing_Script } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dancing",
});

export const metadata = {
  title: "TTCG — Telugu Community Group",
  description: "Telugu Community Group: connecting Telugu families in Pune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${dancing.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
