import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { ScrollArea } from "@radix-ui/themes";
import Head from "next/head";
import SideBar from "../SideMenu/sidebar";

const inter = Inter({ subsets: ["latin"] });

const DashBoardLayout=(props:any) => {
  return (
    <>
    <main className=" ml-[2px] pt-[25px] max-w-[85rem] m-auto ">
    <SideBar/>
      <ScrollArea className="max-h-[80vh]">
        {props.children}
      </ScrollArea>
    </main>
    </>
  );
}

export default DashBoardLayout
