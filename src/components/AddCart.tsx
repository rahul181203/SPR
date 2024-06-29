"use client"

import { productsList } from "@/store"
import { Button } from "@radix-ui/themes"
import { atom, useAtom } from "jotai"
import {getProductById} from "@/actions/products"
import { useState } from "react"

export default function AddCart({id}:{id:number}){

    const [prod,addProd] = useAtom(productsList);

    const addItem=(id:number)=>{
        let i = 0;
        for(i;i<prod.length;i++){
            if(prod[i].id === id){
                return window.alert('aldready exists')
            }
        }
        if(i === prod.length)
        getProductById(id).then((d)=>{
            addProd([...prod,d])
        })
    }

    const getBool = (id:number) =>{
        let i = 0;
        for(i;i<prod.length;i++){
            if(prod[i].id === id){
                return true
            }
        }
        if(i === prod.length)
        return false;
        else{
            return true;
        }
    }


    return(
        <>
            <Button disabled={getBool(id)} onClick={()=>addItem(id)} color="green">
                {
                    getBool(id)?'Added':'Add'
                }
            </Button>
        </>
    )
}