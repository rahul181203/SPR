"use server"
import { register } from "@/actions/register";
import { getAllUsers } from "@/actions/users";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const data = await getAllUsers(req.nextUrl.searchParams.get("q") || "")
    return NextResponse.json(data)
}

export async function POST(req:Request){
    const data = await req.json();
    const res = await register(data);
    return Response.json({res})
}
