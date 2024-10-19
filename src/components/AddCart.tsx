"use client"

import { cartList } from "@/store"
import { Button } from "@radix-ui/themes"
import { atom, useAtom } from "jotai"
import {getProductById} from "@/actions/products"
import { CartItem, CartListInterface } from "@/interfaces"
import { getServiceById } from "@/actions/service"
import * as React from "react"


export default function AddCart({id,type}:{id:number,type:string}){

    const [prod,addProd] = useAtom<CartListInterface>(cartList);

    const addItem=async(id:number)=>{
        
        let i = 0;
        for(i;i<prod.items.length;i++){
            if(prod.items[i].product_id === id){
                return window.alert('aldready exists')
            }
        }
        if(i === prod.items.length)
        getProductById(id).then((d)=>{
            (d?.total_units! > 1) ?
            addProd({items:[...prod.items,{
                product_id:d?.id || undefined,
                quantity:1,
                service_id:undefined,
                name:d?.name,
                category:d?.category,
                total_amount:d?.selling_price
            }],
            totalPrice:prod.totalPrice+d?.selling_price!}):window.alert("Product unavailable")
        })
    }

    const addServiceItem=async(id:number)=>{
        let i = 0;
        for(i;i<prod.items.length;i++){
            if(prod.items[i].service_id === id){
                return window.alert('aldready exists')
            }
        }
        if(i === prod.items.length)
        getServiceById(id).then((d)=>{
            addProd({items:[...prod.items,{
                product_id:undefined,
                name:d?.name,
                quantity:1,
                service_id:d?.id || undefined,
                total_amount:d?.charge
            }],
        totalPrice:prod.totalPrice + d?.charge!})
        })
    }


    const getBool = (id:number) =>{
        let i = 0;
        for(i;i<prod.items.length;i++){
            if(prod.items[i].product_id === id){
                return true
            }
        }
        if(i === prod.items.length)
        return false;
        else{
            return true;
        }
    }

    const getServiceBool = (id:number) =>{
        let i = 0;
        for(i;i<prod.items.length;i++){
            if(prod.items[i].service_id === id){
                return true
            }
        }
        if(i === prod.items.length)
        return false;
        else{
            return true;
        }
    }


    return(
        <>
            <Button disabled={(type=="product")?getBool(id):getServiceBool(id)} onClick={()=>(type == "product")?addItem(id):addServiceItem(id)} color="green">
                {
                    ((type=="product")?getBool(id):getServiceBool(id))?'Added':'Add'
                }
            </Button>
        </>
    )
}