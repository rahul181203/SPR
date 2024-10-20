import { db } from "@/lib/prisma";

declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () { return Number(this) }
export const dynamic = 'force-dynamic';
export async function GET(){
    let lastDay = Date.now() - (24 * 60 * 60 * 1000)
    const newDate = new Date(lastDay).toISOString()

    const data:any = await db.$queryRaw`
            select name,SUM(c.quantity) from "Orders" as o
            inner join "OrderItems" as c
            on c."orderId" = o."id"
            inner join "Product" as p
            on p."id" = c."product_id"
            where o."createdAt" > TO_TIMESTAMP(${newDate},'YYYY-MM-DD')
            group by product_id,name
            order by SUM(c.quantity) desc;
        `
        
    const total_amount = await db.orders.aggregate({
        _sum:{
            total_amount:true
        },
        where:{
            createdAt:{
                gte:newDate,
            }
        }
    })

    const newCustomers = await db.user.aggregate({
        _count:{
            id:true
        },
        where:{
            createdAt:{
                gte:newDate
            }
        }
    })

    return Response.json({totalAmount:total_amount._sum.total_amount,newCustomers:newCustomers._count.id,topSelling:data[0].name})

}