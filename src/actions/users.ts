import { db } from "@/lib/prisma";

export const getAllUsers=async(search:string)=>{
    const data = await db.user.findMany({
        where:{
            firstname:{
                contains:search,
                mode:'insensitive'
            }
        }
    })
    return data
}