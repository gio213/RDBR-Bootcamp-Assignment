import type { Metadata } from "next";
import { Geist_Mono, Inter, Noto_Sans } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redberry Bootcamp",
  description: "Redberry Bootcamp XI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full  flex flex-col">
        <Header
          isAuth={true}
          user={{
            name: "Giorgi",
            avatarUrl:
              "https://gravatar.com/avatar/5bf39e5af5c6b623282f240568b3eee3?s=400&d=robohash&r=x",
          }}
        />
        <main className="flex-1 bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
