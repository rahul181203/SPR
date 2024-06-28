import { signOut } from "@/auth";
import { ArchiveIcon, BarChartIcon, CardStackIcon, CubeIcon, ExitFullScreenIcon, ExitIcon, GearIcon, PersonIcon, PieChartIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Text,Flex,Button } from "@radix-ui/themes";
import Link from "next/link";

export default function SideBar(){
    return(
        <>
            <Flex direction={'column'} gap={'4'} p={'3'} className=" px-4 bg-slate-800 h-[85vh] mx-4 w-[200px] rounded-md whitespace-nowrap fixed z-50 justify-around">
                <Link className="flex items-center gap-2"  href={'/dashboard/data'}> <PieChartIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Data</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/customers'}> <PersonIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Customers</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/products'}> <ArchiveIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Products</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/services'}> <GearIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Services</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/orders'}> <CubeIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Orders</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/referals'}> <UpdateIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Referals</Link>
                <Link className="flex items-center gap-2"  href={'/dashboard/transactions'}> <CardStackIcon width={'30'} height={'30'} className=" inline-block  p-1 text-white"/> Transactions</Link>
                <form action={async ()=>{
                        "use server"
                        await signOut({redirectTo:'/'});
                    }}>
                    <button className="flex items-center gap-2" > <ExitIcon width={'30'} height={'30'} className=" p-1 text-white"/> Sign Out</button>
                </form>
                
            </Flex>
        </>
    )
}