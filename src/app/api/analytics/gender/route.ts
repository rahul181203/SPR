import { db } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

type GenderData = {
    gender: string;
    count: number;
};

export async function GET() {
    const data:GenderData[] = await db.$queryRaw`
        select u."gender",count(*) from "Orders" as o
        inner join "User" as u
        on u."id" = o."customer_id"
        group by u."gender";
    `

    const result = data.reduce((acc: Record<string, number>, item: GenderData) => {
        acc[item.gender] = item.count;
        return acc;
    }, {});

    return Response.json(result)
}