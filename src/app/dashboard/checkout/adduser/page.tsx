"use client"
import Loading from "@/app/loading";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useState, useTransition } from "react";
import * as React from "react"
import { UserDTO } from "@/interfaces";



export default function AddProduct(){

    const [isPending,startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState<UserDTO>({
        id:"",
        firstname:"",
        lastname:"",
        email:"",
        mobilenumber:"",
        gender:""
    })


    const handleSubmit=()=>{
        setLoading(true)
        console.log(user);
        fetch("/api/customer",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res)=>console.log(res.json()))
        .then((data)=>console.log("data",data)
        )
        setLoading(false)
    }

    if(loading){
        return <Loading/>
    }

    return(
        <>
            <Heading ml={'3'} mb={'3'}>Add User</Heading>
            <Box className="flex justify-center items-center">
            <form onSubmit={()=>handleSubmit()} className="w-[50%] p-3">
                <Box className='p-2'>
                    <Text>First Name</Text>
                    <TextField.Root required onChange={(e)=>{
                        setUser({
                            ...user,
                            firstname:e.target.value
                        }
                    )
                    }}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Last Name</Text>
                    <TextField.Root required onChange={(e)=>{
                        setUser({
                            ...user,
                            lastname:e.target.value
                        }
                    )
                    }}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Email</Text>
                    <TextField.Root required onChange={(e)=>{
                        setUser({
                            ...user,
                            email:e.target.value
                        }
                    )
                    }}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Mobile Number</Text>
                    <TextField.Root required onChange={(e)=>{
                        setUser({
                            ...user,
                            mobilenumber:e.target.value
                        }
                    )
                    }}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Gender</Text>
                    <TextField.Root required onChange={(e)=>{
                        setUser({
                            ...user,
                            gender:e.target.value
                        }
                    )
                    }}></TextField.Root>
                </Box>
        
                <Box className="flex justify-end p-2">
                    <Button type="submit" color="gold">Add User</Button>
                </Box>
            </form>
            </Box>
        </>
    )
}