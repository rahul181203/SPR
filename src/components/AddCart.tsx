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
            addProd({items:[...prod.items,{
                product_id:d?.id || null,
                quantity:1,
                service_id:null,
                name:d?.name,
                category:d?.category,
                total_amount:parseInt(d?.selling_price || '0')
            }],
            totalPrice:prod.totalPrice+parseInt(d?.selling_price || '0')})
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
                product_id:null,
                name:d?.name,
                quantity:1,
                service_id:d?.id || null,
                total_amount:parseInt(d?.charge || '0')
            }],
        totalPrice:prod.totalPrice + parseInt(d?.charge || '0')})
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