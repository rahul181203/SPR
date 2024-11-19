import { db } from "@/lib/prisma";

declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () { return Number(this) }

export async function GET(){
    // const data = await db.orderItems.groupBy({
    //     by:["service_id"],
    //     _sum:{
    //         quantity:true
    //     }
    // })
    const data2 = await db.$queryRaw`
        select s."name",sum(o."quantity") from "OrderItems" as o
        right join "Service" as s
        on o."service_id"=s."id"
        group by s."name";
    `
    return Response.json(data2)
}