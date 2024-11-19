
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

export const dynamic = "force-dynamic";

import { getOrders } from "@/actions/orders"
import { sendmsg } from "@/actions/twilio/sendsms";
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
    const itemsHTML = order?.items.map((i, v) => `
    <tr key="${v + 1}">
        <td>${i.product ? i.product.name : i.service?.name}</td>
        <td>$${i.product ? i.product.selling_price : i.service?.charge}</td>
        <td>${i.quantity}</td>
        <td>$${i.total_amount}</td>
    </tr>
    `).join("");
    await SendMail("Invoice",order?.customer.email!,`
        <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inventory - Order Receipt</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
                }
                .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #e0e0e0;
                }
                .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
                }
                .order-info {
                margin: 20px 0;
                }
                .order-info p {
                margin: 5px 0;
                color: #666666;
                }
                .items-table {
                width: 100%;
                border-collapse: collapse;
                }
                .items-table th, .items-table td {
                padding: 12px;
                border: 1px solid #e0e0e0;
                text-align: left;
                font-size: 14px;
                color: #333333;
                }
                .items-table th {
                background-color: #f8f8f8;
                }
                .total {
                font-weight: bold;
                font-size: 18px;
                text-align: right;
                color: #333333;
                margin-top: 20px;
                }
                .footer {
                text-align: center;
                margin-top: 30px;
                color: #888888;
                font-size: 12px;
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <div class="header">
                <h1>Inventory - Order Receipt</h1>
                </div>
                
                <div class="order-info">
                <p><strong>Order ID:</strong> #${order?.id}</p>
                <p><strong>Date:</strong> ${order?.createdAt}</p>
                <p><strong>Customer:</strong> ${order?.customer.firstname} ${order?.customer.lastname!}</p>
                <p><strong>Email:</strong> ${order?.customer.email}</p>
                </div>
                
                <table class="items-table">
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                ${
                    itemsHTML
                }
                </tbody>
                </table>
                
                <p class="total">Grand Total: $${order?.total_amount}</p>
                
                <div class="footer">
                <p>Thank you for your purchase!</p>
                <p>If you have any questions, feel free to contact us at inventory069@gmail.com</p>
                </div>
            </div>
            </body>
            </html>
        `)
    // await sendmsg(order?.customer.mobilenumber!,`
    //     Dear customer ${order?.customer.firstname} ${order?.customer.lastname},
    //     your order details are as follows:
    //     order id: ${order?.id}
    //     items:
    //     ${order?.items.map((i,v)=>
    //         `
    //             name: ${(i.product?.name)?i.product.name:i.service?.name}
    //             quantity: ${i.quantity} 
    //             totalAmount:${i.total_amount}
    //         `
    //     )}

    //     Transaction Type:${order?.transaction_type}
    //     Net Amount Paid:${order?.total_amount}
    //     Thank you for shopping with us.
    //     `)
    return Response.json(data)
}

export async function GET(req:Request){
    const data = await getOrders();
    return Response.json(data)
}