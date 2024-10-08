"use client"
import { AddProductAction } from "@/actions/products";
import Loading from "@/app/loading";
import { addProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import * as React from "react"

export default function AddProduct(){

    const [isPending,startTransition] = useTransition();
    const [loading, setLoading] = useState(false);


    const form = useForm<z.infer<typeof addProductSchema>>({
        resolver:zodResolver(addProductSchema),
        defaultValues:{
            name:"",
            category:""
        }
    })


    const handleSubmitProduct=(values:z.infer<typeof addProductSchema>)=>{
        setLoading(true)
        console.log(values);
        startTransition(()=>{
            AddProductAction(values).then((e)=>{
                (e?.error !== undefined) ? window.alert(e?.error):window.alert('added successfully');
                setLoading(false);
            })
        })
    }

    if(loading){
        return <Loading/>
    }

    return(
        <>
            <Heading ml={'3'} mb={'3'}>Add Product</Heading>
            <Box className="flex justify-center items-center">
            <form onSubmit={form.handleSubmit(handleSubmitProduct)} className="w-[50%] p-3">
                <Box className='p-2'>
                    <Text>Product Name</Text>
                    <TextField.Root required {...form.register("name")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Product Category</Text>
                    <TextField.Root required {...form.register("category")}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Total Units</Text>
                    <TextField.Root required {...form.register('units')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Cost Price</Text>
                    <TextField.Root required {...form.register('costprice')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Margin</Text>
                    <TextField.Root required {...form.register('margin')}></TextField.Root>
                </Box>
                <Box className='p-2'>
                    <Text>Selling Price</Text>
                    <TextField.Root required {...form.register('sellingprice')}></TextField.Root>
                </Box>
                <Box className="flex justify-end p-2">
                    <Button type="submit" color="gold">Add Product</Button>
                </Box>
            </form>
            </Box>
        </>
    )
}