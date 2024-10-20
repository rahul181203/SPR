import { db } from "@/lib/prisma";

export async function GET(){
    let lastDay = Date.now() - (24 * 60 * 60 * 1000)
    const newDate = new Date(lastDay).toISOString()

    const productsCount = await db.product.groupBy({
        by:['category'],
        _sum:{
            units_sold:true,
            total_units:true
        },
        _count:{
            id:true
        }
    })

    const transactionAnalysis = await db.orders.groupBy({
        by:['transaction_type'],
        _count:{
            id:true
        }
    })

    

    return Response.json({productsCount,transactionAnalysis})

}