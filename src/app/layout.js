import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";
=======
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/Navbar";
import CustomAlert from "@/components/CustomAlert";
>>>>>>> finalbr

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </StoreProvider>
=======
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Navbar />
          <CustomAlert />
          {children}
        </StoreProvider>
      </body>
    </html>
>>>>>>> finalbr
  );
}
