import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import CustomAlert from "@/components/CustomAlert";
import { CONST_APP_NAME } from "@/utils/constant";

export const metadata = {
  title: CONST_APP_NAME, // Set your app name
  description: "Collaborate in real-time",
  icons: {
    icon: "/favicon.ico", // Use the ICO file for better support
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <StoreProvider>
          <div className="">
            <CustomAlert />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
