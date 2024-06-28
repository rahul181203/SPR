"use client"
import { AddProductAction } from "@/actions/products";
import { addProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"

export default function AddProduct(){

    const [isPending,startTransition] = useTransition();


    const form = useForm<z.infer<typeof addProductSchema>>({
        resolver:zodResolver(addProductSchema),
        defaultValues:{
            id:"",
            name:"",
            category:"",
            costprice:"",
            margin:"",
            sellingprice:"",
            units:""
        }
    })

    const handleSubmitProduct=(values:z.infer<typeof addProductSchema>)=>{
        startTransition(()=>{
            AddProductAction(values).then((data)=>{
                console.log(data?.error);
            })
        })
    }

    return(
        <>
            <Heading ml={'3'} mb={'3'}>Add Product</Heading>
            <Box className="flex justify-center items-center">
            <form onSubmit={form.handleSubmit(handleSubmitProduct)} className="w-[50%] p-3">
                <Box className='p-2'>
                    <Text>Product Id</Text>
                    <TextField.Root {...form.register("id")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Product Name</Text>
                    <TextField.Root {...form.register("name")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Product Category</Text>
                    <TextField.Root {...form.register("category")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Total Units</Text>
                    <TextField.Root {...form.register('units')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Cost Price</Text>
                    <TextField.Root {...form.register('costprice')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Margin</Text>
                    <TextField.Root {...form.register('margin')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Selling Price</Text>
                    <TextField.Root {...form.register('sellingprice')}></TextField.Root>
                </Box>
                <Box className="flex justify-end p-2">
                    <Button type="submit" color="gold">Add Product</Button>
                </Box>
            </form>
            </Box>
        </>
    )
}