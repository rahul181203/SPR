"use server"
import { getAllProducts, getProductById } from "@/actions/products";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const res = await getAllProducts(req.nextUrl.searchParams.get("q") || "");
    return Response.json(res)
}
