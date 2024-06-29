"use client"
import { Box, Button, Flex, Heading, Progress, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas/index";
import { Login } from "@/actions/login";
import {useEffect, useState, useTransition} from "react"
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home(){
  
  const [isPending,startTransition] = useTransition();
  const [loading,setLoading] = useState(false)
  const [value,setValue] = useState(0);

  const router = useRouter()
  const {data:session} = useSession();

  useEffect(()=>{
    if(session){
      router.replace('/dashboard/data');
    }
  },[session,router])

  const form1 = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = (values:z.infer<typeof loginSchema>)=>{ 
    setLoading(true);
    startTransition(()=>{
      Login(values).then((data)=>{
        setLoading(false);
        console.log(data);
      })
    }) 
  }

  if(session || loading){
    return (
      <>
        <Box className="h-[100vh] w-[100vw] flex justify-center items-center">
          <Flex direction={'column'} gap={'3'}>
            <Progress duration={'10s'} />
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
            <form onSubmit={form1.handleSubmit(handleSubmitLogin)}>
            <Box className="p-2">
              <Text as="label">Email: </Text>
              <TextField.Root required placeholder="email" type="email" autoComplete="email" {...form1.register("email")}></TextField.Root>
            </Box>
            <Box className="p-2">
              <Text as="label">Password: </Text>
              <TextField.Root required placeholder="password" type="password" {...form1.register("password")}></TextField.Root>
            </Box>
            <Box className="p-2">
            <Link href={'/forgotpass'} className=" text-sm underline text-blue-400">Forgot Password?</Link>
            </Box>
            <Box className="p-2">
              <Button type="submit" className="w-full" disabled={loading} color="gold" > Login</Button>
            </Box>
            </form>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
