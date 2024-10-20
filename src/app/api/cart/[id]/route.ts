import { db } from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function GET(
    req:Request,
    {params}:{params:{id:string}}
){
    console.log(params.id);
    const data = await db.cart.findUnique({
            where:{
                operator_id:params.id
            },
            select:{
                total_amount:true,
                items:{
                    select:{
                        product_id:true,
                        service_id:true,
                        quantity:true,
                        total_amount:true,
                        product:{
                            select:{
                                name:true
                            }
                        },
                        service:{
                            select:{
                                name:true
                            }
                        }
                    },
                }
            },
        }
    )
    return Response.json(data)
}
