"use server"
import { addProductSchema } from '../schemas/index';
import * as z from "zod"
import { db } from "@/lib/prisma";
import { permanentRedirect, redirect, RedirectType } from 'next/navigation';

export const AddProductAction=async(values:z.infer<typeof addProductSchema>)=>{
    const validateResponse = addProductSchema.safeParse(values);
    
    if(!validateResponse.success){
        return {"error":"Invalid fields provided"};
    }

    const { id, name, category, units, costprice, sellingprice, margin } = validateResponse.data;

    const aldreadyFound = await db.product.findUnique({
        where:{
            id
        }
    })

    if(aldreadyFound){
        return {"error":"Product id exists"}
    }
    try{
        await db.product.create({data:{
            id:id,
            name:name,
            category:category,
            cost_price:costprice,
            selling_price:sellingprice,
            margin:margin,
            total_units:units
        }})
    }catch(error){
        return {"error":String(error)}
    }
    redirect('/dashboard/products')
}

export const getAllProducts=async(search:string)=>{
    
    const products = await db.product.findMany({
        where:{
            name:{
                contains:search,
                mode:'insensitive'
            }
        }
    })
    return products;
}

export const deleteProduct=async(id:string)=>{
    try{
        await db.product.delete({where:{
            id
        }})
    }catch(e){
        return {"error":String(e)}
    }
    redirect('/dashboard/products',RedirectType.replace)
}