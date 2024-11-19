import { db } from "@/lib/prisma";

export async function GET(){
    const data = await db.$queryRaw`
        select TO_CHAR("createdAt"::date,'dd/mm/yyyy') as date,SUM("total_amount") as amount
        from "Orders"
        group by DATE("createdAt"::date)
        order by Date("createdAt")
    `
    return Response.json(data)
}