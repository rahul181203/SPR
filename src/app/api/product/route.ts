"use server"
import { getProductById } from "@/actions/products";
import { NextApiRequest } from "next";

export async function GET(req:Request){
    // const data = await req.json();
    // const {pid} = req.query;
    // console.log(pid);
    // const res = await getProductById(data);
    return Response.json({res:"success"})
}
