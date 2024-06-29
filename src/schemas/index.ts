import * as z from "zod";

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"password is required"
    })
})

export const registerSchema = z.object({
    fullname:z.string(),
    email:z.string().email(),
    mobile:z.string(),
    password:z.string()
})

export const addProductSchema = z.object({
    name:z.string(),
    category:z.string(),
    units:z.string(),
    costprice:z.string(),
    margin:z.string(),
    sellingprice:z.string(),
})

export const serviceSchema = z.object({
    name:z.string(),
    charge:z.string()
})