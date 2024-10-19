"use server"
import { getProductById } from "@/actions/products";
import { getServiceById } from "@/actions/service";
import { db } from "@/lib/prisma";
import { da } from "@faker-js/faker";
import { cartList } from '../../../store/index';
import { data } from '../../../components/charts/piechart';

interface CartItemData{
    opid:string
    items:CartItems[]
}

interface CartItems{
    product_id:number | undefined,
    service_id:number | undefined,
    name:string,
    quantity:number,
    total_amount:number
}


export async function POST(req:Request){
    const data:CartItemData = await req.json();
    let cart;
    cart = await db.cart.findUnique({where:{operator_id:data.opid}})
    console.log(cart);

    if(!cart){
        cart = await db.cart.create({
            data:{
                operator_id:data.opid,
                total_amount:0
            }
        })
        console.log(cart);
    }

     const createCart = data.items
        .map(async(item) => {
            let product,stockAvailable;
            if(item.product_id){
                product = await db.product.findUnique(
                    {
                        where:{
                            id:item.product_id
                        }
                    }
                )
            }

            if(product){
                if(product.total_units >= item.quantity){
                    stockAvailable = true
                }else{
                    stockAvailable = false;
                    throw new Error("Item Not Available in stock")
                }
            }
            if(item.service_id){
                stockAvailable = true
            }

            if(stockAvailable){
                return await db.cart.update({
                    where:{
                        operator_id:data.opid
                    },
                    data:{
                        items:{
                            create:{
                                product_id:item.product_id,
                                service_id:item.service_id,
                                quantity:item.quantity,
                                total_amount:item.total_amount
                            }
                        },
                        total_amount:{increment:item.total_amount}
                    }
                })
            }
        });
    
        const res = await Promise.all(createCart)
        console.log(res);
    return Response.json({res})
}

// export async function GET(
//     req:Request,
//     {params}:{params:{id:string}}
// ){
//     console.log(params.id);
//     const data = await db.cart.findUnique({
//             where:{
//                 operator_id:params.id
//             },
//             select:{
//                 total_amount:true,
//                 items:{
//                     select:{
//                         id:true,
//                         product:true,
//                         service:true,
//                         quantity:true,
//                         total_amount:true
//                     }
//                 }
//             },
//         }
//     )
//     return Response.json(data)
// }

interface updateQuantity{
    cartItemId:number|null
    quantity:number|null
}

export async function PUT(req:Request){
    const data:updateQuantity = await req.json()
    if(data.quantity! < 1){
        return Response.json({msg:"Quantity should not be less than 1"})
    }
    const item = await db.cartItems.findUnique({where:{id:data.cartItemId!},include:{Cart:true}})
    let amount = (item?.total_amount!)/(item?.quantity!) * data.quantity!
    if(item){
        await db.cartItems.update({
            where:{id:data.cartItemId!},
            data:{
                quantity:data.quantity,
                total_amount:amount
            }
        })
        await db.cart.update({
            where:{id:1},
            data:{
                total_amount:((item.Cart?.total_amount!) - item.total_amount!) + amount
            }
        })
        return Response.json({msg:"success"})
    }
    return Response.json({msg:"cartitem not found"})
}

export async function DELETE(req:Request){
    const data:CartItemData = await req.json()
    const cart = await db.cart.update({where:{operator_id:data.opid},data:{total_amount:0}})
    if(cart){
        const res = await db.cartItems.deleteMany({where:{cartId:cart.id}})
        if(res){
            return Response.json({msg:"success"})
        }
    }
    return Response.json({msg:"cartitem not found"})
}