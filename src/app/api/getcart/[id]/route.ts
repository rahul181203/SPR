import { db } from "@/lib/prisma";

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
                    },
                }
            },
        }
    )
    return Response.json(data)
}
