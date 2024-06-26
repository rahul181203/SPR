"use server"
import { register } from "@/actions/register";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request){
    
    // const data = await req.json();
    const data = await req.json();
    // console.log(data.name);/
    console.log(data);
    console.log(req);
    await register(data).then((e)=>{
        console.log(e);
    })
    return Response.json({data})
}