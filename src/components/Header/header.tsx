import { auth } from "@/auth";
import { Avatar, Box, Text } from "@radix-ui/themes";

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
                    <Text m={'3'}>{session?.user?.email}</Text>
                    <Avatar src="/" fallback={'a'} size={'4'} radius="full" />
                </Box>
            </main>
        </>
    )
}
export default Header;