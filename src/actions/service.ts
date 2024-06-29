"use server"
import { serviceSchema } from '../schemas/index';
import * as z from "zod"
import { db } from "@/lib/prisma";
import { permanentRedirect} from 'next/navigation';

export const AddServiceAction=async(values:z.infer<typeof serviceSchema>)=>{
    const validateResponse = serviceSchema.safeParse(values);
    
    if(!validateResponse.success){
        return {"error":"Invalid fields provided"};
    }

    const { id, name, charge } = validateResponse.data;

    const aldreadyFound = await db.service.findUnique({
        where:{
            id
        }
    })

    if(aldreadyFound){
        return {"error":"Product id exists"}
    }
    try{
        await db.service.create({data:{
            id:id,
            name:name,
            charge:charge,
        }}).then(()=>{
            permanentRedirect('/dashboard/services')
        })
    }catch(error){
        return {"error":String(error)}
    }
}

export const getAllServices=async(search:string)=>{
    
    const services = await db.service.findMany({
        where:{
            name:{
                contains:search,
                mode:'insensitive'
            }
        }
    })
    return services;
}