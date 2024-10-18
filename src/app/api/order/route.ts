
interface OrderData{
    uid:string,
    opid:string,
    items:itemDescription[]
    total_amount:number
    transaction_type:string
}

interface itemDescription{
    product_id:number,
    service_id:number,
    quantity:number,
    total_amount:number
}

import { db } from "@/lib/prisma"

export async function POST(req:Request){
    const data:OrderData = await req.json()
    console.log(data);
    
    await db.orders.create({
        data:{
            items:{
                createMany:{
                    data:data.items
                }
            },
            operator_id:data.opid,
            customer_id:data.uid,
            tax:0,
            total_amount:data.total_amount,
            transaction_type:data.transaction_type
        }
    })

    return Response.json(data)
}