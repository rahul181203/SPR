import { BarChartIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Text,Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function SideBar(){
    return(
        <>
            <Flex direction={'column'} gap={'4'} p={'3'} className=" px-4 bg-slate-800 h-[80vh] m-4 w-[200px] rounded-md whitespace-nowrap fixed">
                <Link href={'/dashboard/data'}> <BarChartIcon width={'30'} height={'30'} className=" inline-block bg-slate-900 p-1 text-white"/> Data</Link>
                <Link href={'/dashboard/customers'}> <BarChartIcon width={'30'} height={'30'} className=" inline-block bg-slate-900 p-1 text-white"/> Customers</Link>
                <Link href={'/dashboard/products'}> <BarChartIcon width={'30'} height={'30'} className=" inline-block bg-slate-900 p-1 text-white"/> Products</Link>
                <Link href={'/dashboard/orders'}> <BarChartIcon width={'30'} height={'30'} className=" inline-block bg-slate-900 p-1 text-white"/> Orders</Link>
                <Link href={'/'}> <BarChartIcon width={'30'} height={'30'} className=" inline-block bg-slate-900 p-1 text-white"/> Sign Out</Link>
            </Flex>
        </>
    )
}