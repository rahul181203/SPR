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
    units:z.coerce.number(),
    costprice:z.coerce.number(),
    margin:z.coerce.number(),
    sellingprice:z.coerce.number(),
})

export const serviceSchema = z.object({
    name:z.string(),
    charge:z.coerce.number()
})