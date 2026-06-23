import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { 
  Inter, 
  Plus_Jakarta_Sans, 
  Outfit, 
  Bricolage_Grotesque, 
  DM_Sans, 
  Instrument_Sans 
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "HMS SaaS Platform",
  description: "Modern Hospital Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`
        ${inter.variable} 
        ${jakarta.variable} 
        ${outfit.variable} 
        ${bricolage.variable} 
        ${dmSans.variable} 
        ${instrument.variable} 
        antialiased font-inter
      `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}