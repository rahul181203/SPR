"use client"
import { Box, Button, Flex, Heading, Progress, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas/index";
import { Login } from "@/actions/login";
import {useEffect, useTransition} from "react"
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home(){
  
  const [isPending,startTransition] = useTransition();

  const router = useRouter()
  const {data:session} = useSession();

  useEffect(()=>{
    if(session){
      router.replace('/dashboard/data');
    }
  },[session])

  const form1 = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = (values:z.infer<typeof loginSchema>)=>{ 
    startTransition(()=>{
      Login(values).then((data)=>{
        console.log(data);
      })
    }) 
  }

  if(session){
    return (
      <>
        <Box className="h-[100vh] w-[100vw] flex justify-center items-center">
          <Flex direction={'column'} gap={'3'}>
            <Progress/>
            <Heading as="h4">Redirecting to Dashboard ...</Heading>
          </Flex>
        </Box>
      </>
    )
  }

  

  return (
    <>
      <Box className="h-[100vh] w-[100vw] flex">
        <Flex p={'4'} direction={'column'} justify={'center'} align={'center'} className="rounded-lg shadow-lg bg-slate-800 w-[650px] h-[100%]" gap={'4'}>
          <Heading>Operator Login</Heading>
          <Flex direction={'column'} className="w-[450px] mx-auto justify-center gap-4 bg-slate-900 p-4 rounded-lg shadow-lg">
            {/* <form className="flex-col gap-4"> */}
            <Text as="label">Email: </Text>
            <TextField.Root placeholder="email" type="email" autoComplete="email" {...form1.register("email")}></TextField.Root>
            <Text as="label">Password: </Text>
            <TextField.Root placeholder="password" type="password" {...form1.register("password")}></TextField.Root>
            <Link href={'/forgotpass'} className=" text-sm underline text-blue-400">Forgot Password?</Link>
            <Button color="gold" onClick={form1.handleSubmit(handleSubmitLogin)}> Login</Button>
            {/* </form> */}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
