"use server"
import { getProductById } from "@/actions/products";
import { getServiceById } from "@/actions/service";
import { db } from "@/lib/prisma";
import { da } from "@faker-js/faker";
import { cartList } from '../../../store/index';

interface CartItemData{
    opid:string
    product_id:number|null
    service_id:number|null
    quantity:number
}

export async function POST(req:Request){
    const data:CartItemData = await req.json();
    let cart;
    cart = await db.cart.findUnique({where:{operator_id:data.opid}})
    console.log(cart);
    
    let price;
    if(data.product_id){
        const product = await getProductById(data.product_id)
        price = product?.selling_price
    }
    if(data.service_id){
        const service = await getServiceById(data.service_id)
        price = service?.charge
    }
    if(!cart){
        cart = await db.cart.create({
            data:{
                operator_id:data.opid,
                total_amount:0
            }
        })
        console.log(cart);
    }
    if(cart){
        await db.cartItems.create({
            data:{
                cartId:cart.id,
                product_id:data.product_id,
                quantity:data.quantity,
                service_id:data.service_id,
                total_amount:(price! * data.quantity)
            }
        })
        await db.cart.update({
            where:{
                operator_id:data.opid,
            },
            data:{
                total_amount: cart.total_amount + (price! * data.quantity)
            }
        })
        return Response.json({msg:"added"})
    }
    return Response.json({msg:"cartID not found"})
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