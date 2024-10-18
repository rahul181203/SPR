import { db } from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function GET(
    req:Request,
    {params}:{params:{id:string}}
){
    const pid = Number.parseInt(params.id)
    const isProductAvailable = await db.cartItems.findMany({
        where:{product_id:pid}
    })
    const isServiceAvailable = await db.cartItems.findMany({
        where:{service_id:pid}
    })

    return Response.json({
        product:(isProductAvailable.length > 0),
        service:(isServiceAvailable.length > 0)
    })
}