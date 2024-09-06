import { auth } from "@/auth";
import { Avatar, Box, Text,Flex } from "@radix-ui/themes";
import Clock from "../clock";
import { CubeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Header=async()=>{
    const session = await auth();
    return(
        <>
            <main className="flex items-center justify-between px-4 bg-slate-900 relative">
                <Box>
                    <Avatar src="/" fallback={"a"} size={'4'} m={'3'}/>
                    <Text>Inventory</Text>
                </Box>
                <Box >
                    <Flex align={'center'}>
                    <Clock />
                    <Link href={'/dashboard/cart'} className="p-2">
                    <CubeIcon width={'30'} height={'30'}/>
                    </Link>
                    <Text m={'3'}>{session?.user?.email}</Text>
                    <Avatar src="/" fallback={'a'} size={'4'} radius="full" />
                    </Flex>
                </Box>
            </main>
        </>
    )
}
export default Header;