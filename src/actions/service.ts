"use server"
import { serviceSchema } from '../schemas/index';
import * as z from "zod"
import { db } from "@/lib/prisma";
import { redirect, RedirectType} from 'next/navigation';

export const AddServiceAction=async(values:z.infer<typeof serviceSchema>)=>{
    const validateResponse = serviceSchema.safeParse(values);
    
    if(!validateResponse.success){
        return {"error":"Invalid fields provided"};
    }

    const { name, charge } = validateResponse.data;

    const aldreadyFound = await db.service.findUnique({
        where:{
            name
        }
    })
    if(aldreadyFound){
        return {"error":"Product exists"}
    }
    try{
        await db.service.create({data:{
            name:name,
            charge:charge,
        }})
    }catch(error){
        return {"error":String(error)}
    }
    redirect('/dashboard/services')
}

export const getAllServices=async(search:string)=>{
    
    const services = await db.service.findMany({
        where:{
            name:{
                contains:search,
                mode:'insensitive'
            }
        },orderBy:{
            id:"asc"
        }
    })
    return services;
}

export const deleteService=async(id:number)=>{
    try{
        await db.service.delete({where:{
            id
        }})
    }catch(e){
        return {"error":String(e)}
    }
    redirect('/dashboard/services',RedirectType.replace)
}

export const getServiceById=async(id:number)=>{
    const service = db.service.findUnique({
        where:{
            id
        }
    })
    return service;
}