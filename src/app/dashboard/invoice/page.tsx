// "use client"

import { getOrderById } from "@/actions/orders";
import { InvoiceDoc } from "@/components/invoiceDoc";
import { Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";

// import fs from "fs"
// import { InvoiceDoc } from "../../../components/invoiceDoc";
// import { compile, Footnote, PageBottom, Tailwind } from "@fileforge/react-print";
// import {FileforgeClient} from "@fileforge/client"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const invoiceId = typeof searchParams.id==="string" ? searchParams.id: undefined
    // const [data,setData] = useState()
    // useEffect(()=>{
    //   fetch("/")
    // },[])
    let data;
    if(invoiceId){
      data = await getOrderById(Number.parseInt(invoiceId));
    }

  return (
    <>
    <Box className="light-theme">
        {
          (invoiceId) && <InvoiceDoc details={data}/>
        }
    </Box>
    </>
  );
}
