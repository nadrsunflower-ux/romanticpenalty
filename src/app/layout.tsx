import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Newsreader } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Romantic Penalty? — 논문 발표",
  description:
    "Tong, Li & Park (2026). A romantic penalty? Female entrepreneurship and relationship initiation in online dating. 첨단기술비즈니스학과 4기 유선화",
};

export const viewport: Viewport = {
  themeColor: "#121115",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${instrumentSerif.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="h-full">
        <TooltipProvider delay={350}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
