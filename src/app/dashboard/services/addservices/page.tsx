"use client"
import { AddProductAction } from "@/actions/products";
import { AddServiceAction } from "@/actions/service";
import { addProductSchema, serviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"

export default function AddService(){

    const [isPending,startTransition] = useTransition();


    const form = useForm<z.infer<typeof serviceSchema>>({
        resolver:zodResolver(serviceSchema),
        defaultValues:{
            id:"",
            name:"",
            charge:""
        }
    })

    const handleSubmitProduct=(values:z.infer<typeof serviceSchema>)=>{
        startTransition(()=>{
            AddServiceAction(values).then((e)=>{
                console.log(e?.error);
            })
        })
    }

    return(
        <>
            <Heading ml={'3'} mb={'3'}>Add Service</Heading>
            <Box className="flex justify-center items-center">
            <form onSubmit={form.handleSubmit(handleSubmitProduct)} className="w-[50%] p-3">
                <Box className='p-2'>
                    <Text>Service Id</Text>
                    <TextField.Root required {...form.register("id")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Service Name</Text>
                    <TextField.Root required {...form.register("name")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Service Charge</Text>
                    <TextField.Root required {...form.register("charge")}></TextField.Root>
                </Box>
                <Box className="flex justify-end p-2">
                    <Button type="submit" color="gold">Add Service</Button>
                </Box>
            </form>
            </Box>
        </>
    )
}