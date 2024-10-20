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
        COALESCE(orders.date, users.date) as date,
        COALESCE(orders.count, 0) as order,
        COALESCE(users.count, 0) as user
        FROM (
            SELECT 
                TO_CHAR("createdAt"::date, 'dd/mm/yyyy') as date, 
                COUNT(*) as count 
            FROM "Orders"
            GROUP BY DATE("createdAt"::date)
        ) as orders
        FULL OUTER JOIN (
            SELECT 
                TO_CHAR("createdAt"::date, 'dd/mm/yyyy') as date, 
                COUNT(*) as count 
            FROM "User"
            GROUP BY DATE("createdAt"::date)
        ) as users
        ON orders.date = users.date
        ORDER BY TO_DATE(COALESCE(orders.date, users.date), 'dd/mm/yyyy') ASC;
    `

    return Response.json(res)

}