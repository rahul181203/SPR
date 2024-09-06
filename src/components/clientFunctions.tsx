"use client"
import { cartList } from "@/store"
import { useAtom, useAtomValue } from "jotai"

export default function GetLength(){
    const length = useAtomValue(cartList).length
    return length;
}