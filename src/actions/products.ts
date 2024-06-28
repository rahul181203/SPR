"use server"
import { addProductSchema } from '../schemas/index';
import * as z from "zod"
import { db } from "@/lib/prisma";
import { permanentRedirect, redirect } from 'next/navigation';

export const AddProductAction=async(values:z.infer<typeof addProductSchema>)=>{
    const validateResponse = addProductSchema.safeParse(values);
    
    if(!validateResponse.success){
        return {"error":"Invalid fields provided"};
    }

    const { id, name, category, units, costprice, sellingprice, margin } = validateResponse.data;
    console.log(id);

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
        }}).then(()=>{
            permanentRedirect('/dashboard/products')
        })
    }catch(error){
        return {"error":String(error)}
    }
}

export const getAllProducts=async(search:string)=>{
    console.log(search);
    
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