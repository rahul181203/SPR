
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

import { getOrders } from "@/actions/orders"
import { InvoiceDoc } from "@/components/invoiceDoc"
import { db } from "@/lib/prisma"
import { SendMail } from "@/services/emailService"
import { compile } from "@fileforge/react-print"

export async function POST(req:Request){
    const data:OrderData = await req.json()
    console.log(data);

    const updatePromises = data.items
        .filter(item => item.product_id !== null)  // Filter out non-product items
        .map(item => db.product.update({
        where: { id: item.product_id },
        data:{units_sold:{increment:item.quantity},total_units:{decrement:item.quantity}}
        }));
    
    const da = await db.$transaction(updatePromises)
    console.log(da);
    
    const res = await db.orders.create({
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

    const order = await db.orders.findUnique({where:{id:res.id},include:{customer:true,items:{include:{product:true,service:true}}}})
    console.log(order);
    const html = await compile(<InvoiceDoc details={order}/>)
    SendMail("Invoice",order?.customer.email!,html)
    // return Response.json(html)
    return Response.json(data)
}

export async function GET(req:Request){
    const data = await getOrders();
    return Response.json(data)
}