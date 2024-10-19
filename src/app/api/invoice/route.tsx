import { InvoiceDoc } from "../../../components/invoiceDoc";
import { compile } from "@fileforge/react-print";
import React from "react";
import { SendMail } from '../../../services/emailService/index';

export const dynamic = "force-dynamic";

export async function POST(req:Request){
    const data = await req.json()
    // const html = await compile(<InvoiceDoc />)
    // SendMail("Email Sending","rahulkanakam123@gmail.com",html)
    // return Response.json(html)
}