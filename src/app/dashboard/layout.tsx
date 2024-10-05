import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Box, ScrollArea,Text } from "@radix-ui/themes";
import Head from "next/head";
import SideBar from "@/components/SideMenu/sidebar";
import Header from "@/components/Header/header";
import { Suspense } from "react";
import Loading from "../loading";
import { useAtom } from "jotai";
import { cartList } from "@/store";
import { GoToCartButton } from "@/components/CartButton";
import * as React from "react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Inventory - Dashboard',
  description: 'Check the sales data',
}

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
    <Header/>
    <main className=" pl-[2px] pt-[25px] pr-[5px] overflow-x-hidden ">
    <SideBar/>
    <Suspense fallback={<Loading/>}>
      <Box className="max-h-[85vh] pl-[230px] pr-[15px] ">
      <ScrollArea >
          {children}
        </ScrollArea>
      </Box>
    </Suspense>
    </main>
    </>
  );
}