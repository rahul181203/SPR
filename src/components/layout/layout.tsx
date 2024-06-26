import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { ScrollArea } from "@radix-ui/themes";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory-DashBoard",
  description: "Check the analytics of sales",
};

const DashBoardLayout=(props:any) => {
  return (
    <>
    <main className=" ml-[250px] pt-[25px] max-w-[85rem] m-auto ">
      <ScrollArea className="max-h-[80vh]">
        {props.children}
      </ScrollArea>
    </main>
    </>
  );
}

export default DashBoardLayout
