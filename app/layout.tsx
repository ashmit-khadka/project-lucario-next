import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/index.scss";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const geistSans = localFont({
  src: "../assets/fonts/Geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../assets/fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ashmit Khadka - Portfolio",
  description: "Portfolio website of Ashmit Khadka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
