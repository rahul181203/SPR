import { db } from "@/lib/prisma";

type GenderData = {
    gender: string;
    count: number;
};

export async function GET() {
    const data:GenderData[] = await db.$queryRaw`
        select u."gender",count(*) from "User" as u
        group by u."gender";
    `

    const result = data.reduce((acc: Record<string, number>, item: GenderData) => {
        acc[item.gender] = item.count;
        return acc;
    }, {});

    return Response.json(result)
}