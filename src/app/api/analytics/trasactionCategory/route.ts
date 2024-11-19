import { db } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

interface Transaction {
    category: string;
    transaction_type: "card" | "cash";
    transaction_count: number;
  }
  
  interface TransformedTransaction {
    category: string;
    card_count: number;
    cash_count: number;
  }
  

export async function GET() {

    const data:Transaction[] = await db.$queryRaw`
        SELECT 
            p."category",
            o."transaction_type",
            COUNT(*) AS transaction_count
        FROM 
            "OrderItems" oi
        JOIN 
            "Product" p ON oi."product_id" = p."id"
        JOIN 
            "Orders" o ON oi."orderId" = o."id"
        GROUP BY 
            p."category",
            o."transaction_type"
        ORDER BY 
            p."category",
            o."transaction_type";
    `

    const transformedData = transformData(data);

    return Response.json(transformedData)

}

function transformData(data: Transaction[]): TransformedTransaction[] {
    return data.reduce((acc: TransformedTransaction[], { category, transaction_type, transaction_count }) => {
      const existingCategory = acc.find(item => item.category === category);
      
      const count = typeof transaction_count === 'bigint' ? Number(transaction_count) : transaction_count;
  
      if (existingCategory) {
        if (transaction_type === "card") {
          existingCategory.card_count += count;
        } else if (transaction_type === "cash") {
          existingCategory.cash_count += count;
        }
      } else {
        acc.push({
          category,
          card_count: transaction_type === "card" ? count : 0,
          cash_count: transaction_type === "cash" ? count : 0
        });
      }
  
      return acc;
    }, []);
  }