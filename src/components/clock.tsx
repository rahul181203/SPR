"use client"
import { clockAtom, userID } from "@/store";
import { Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect } from "react";
import * as React from "react"

const pad=(n:number)=>(n<10)?`0${n}`:n;
const format=(t:Date)=>`${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`

export default function Clock({opid}:{opid:string}){
    const [user,setUser] = useAtom<string>(userID)
    const [{ lastUpdate, light }, setClock] = useAtom(clockAtom);
    const timeString = format(new Date());

    setUser(opid)

    useEffect(()=>{
        const timer = setInterval(()=>{
            setClock({lastUpdate: Date.now(), light:true})
        },1000)
        return (()=>{
            clearInterval(timer);
        })
    },[setClock])
    return(
        <>
            <Text suppressHydrationWarning>{timeString}</Text>
        </>
    )

}