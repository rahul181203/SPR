"use client"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react"

export default function SearchBar(){
    const params  = useSearchParams()
    const [search,setText] = useState(params.get('q')! || '');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        let timeout = setTimeout(()=>{
            if(search.length > 0){
                router.push(pathname+'?q='+search)
            }else{
                router.push(pathname)
            }
        },500)
        return ()=>{clearTimeout(timeout)}
    },[search,router,pathname])

    return (
        <>
            <TextField.Root onChange={(d)=>setText(d.target.value)}  placeholder="search by name" className="m-4 p-2">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
        </>
    )
}