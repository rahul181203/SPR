import { db } from "@/lib/prisma";

export const getOrders=async()=>{
    const orders = await db.orders.findMany({
        include:{
            customer:{
                select:{
                    firstname:true,
                    email:true,
                    mobilenumber:true
                }
            },
            items:{
                include:{
                    service:{
                        select:{
                            name:true,
                            charge:true
                        }
                    },
                    product:{
                        select:{
                            name:true,
                            category:true,
                            selling_price:true
                        }
                    },
                }
            }
        }
    })
    return orders;
}



export const getOrderById=async(id:number)=>{
    const orders = await db.orders.findUnique({
        where:{
            id
        },
        include:{
            customer:{
                select:{
                    firstname:true,
                    email:true,
                    mobilenumber:true
                }
            },
            items:{
                include:{
                    service:{
                        select:{
                            name:true,
                            charge:true
                        }
                    },
                    product:{
                        select:{
                            name:true,
                            category:true,
                            selling_price:true
                        }
                    },
                }
            }
        }
    })
    return orders;
}
