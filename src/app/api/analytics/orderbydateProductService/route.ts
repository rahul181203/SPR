import { db } from "@/lib/prisma";

declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () { return Number(this) }

export const dynamic = 'force-dynamic';

export async function GET() {

    const res = await db.$queryRaw`
        SELECT 
            TO_CHAR(o."createdAt"::date,'dd/mm/yyyy') AS order_date,
            SUM(CASE WHEN oi."product_id" IS NOT NULL THEN 1 ELSE 0 END) AS total_products_sold,
            SUM(CASE WHEN oi."service_id" IS NOT NULL THEN 1 ELSE 0 END) AS total_services_sold
        FROM 
            "Orders" o
        JOIN 
            "OrderItems" oi ON o."id" = oi."orderId"
        GROUP BY 
            DATE(o."createdAt"::date)
        ORDER BY Date(o."createdAt") asc;
    `

    return Response.json(res)

}