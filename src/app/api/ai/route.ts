import { GetReply } from "@/services/ai";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:Request){
    const question = await req.json();
    const data = await GetReply(question.question)
    return NextResponse.json(data)
}