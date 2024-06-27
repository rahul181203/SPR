import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { ScrollArea } from "@radix-ui/themes";
import Head from "next/head";
import SideBar from "@/components/SideMenu/sidebar";
import Header from "@/components/Header/header";

const inter = Inter({ subsets: ["latin"] });

export default function DashBoardLayout({children}:{children:React.ReactNode}) {
  return (
    <>
    <Header/>
    <main className=" pl-[2px] pt-[25px] pr-[5px] overflow-x-hidden ">
    <SideBar/>
      <ScrollArea className="max-h-[80vh] pl-[230px] pr-[15px] overflow-x-hidden ">
        {children}
      </ScrollArea>
    </main>
    </>
  );
}

