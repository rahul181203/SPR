import Image from "next/image";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Box className="h-[100vh] w-[100vw] flex">
        <Flex p={'4'} direction={'column'} justify={'center'} align={'center'} className="rounded-lg shadow-lg bg-slate-800 w-[650px]" gap={'4'}>
          <Heading>Operator Login</Heading>
          <Flex direction={'column'} className="w-[450px] mx-auto justify-center gap-4 bg-slate-900 p-4 rounded-lg shadow-lg">
            <Text as="label">Email: </Text>
            <TextField.Root placeholder="email" type="email"></TextField.Root>
            <Text as="label">Password: </Text>
            <TextField.Root placeholder="password" type="password"></TextField.Root>
            <Link href={'/forgotpass'} className=" text-sm underline text-blue-400">Forgot Password?</Link>
            <Button color="gold">Login</Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
