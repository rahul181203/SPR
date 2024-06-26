import { Avatar, Box, Text } from "@radix-ui/themes";

export default function Header(){
    return(
        <>
            <main className="flex items-center justify-between px-4 bg-slate-900 relative">
                <Box>
                    <Avatar src="/" fallback={"a"} size={'4'} m={'3'}/>
                    <Text>Inventory</Text>
                </Box>
                <Box >
                    <Text m={'3'}>User Name</Text>
                    <Avatar src="/" fallback={'a'} size={'4'} radius="full" />
                </Box>
            </main>
        </>
    )
}