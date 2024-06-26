import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Header from "../components/Header/header";
import SideBar from "../components/SideMenu/sidebar";
import DashBoardLayout from '../components/layout/layout';
import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory",
  description: "Check the analytics of sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-[100vw] h-[100vh] ${inter.className}`}>
        <Theme appearance="dark">
          <Header/>
          <SideBar/>
          {/* <Login/> */}
          <DashBoardLayout>
            {children}
          </DashBoardLayout>
        </Theme>
      </body>
    </html>
  );
}
