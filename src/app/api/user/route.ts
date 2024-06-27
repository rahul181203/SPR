"use server"
import { register } from "@/actions/register";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request){
    const data = await req.json();
    const res = await register(data);
    return Response.json({res})
}