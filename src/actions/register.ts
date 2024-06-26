"use server"

import { registerSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/prisma";
import { getUserByEmail } from "@/data/users";

export const register = async (values:z.infer<typeof registerSchema>)=>{
    console.log(values);
    
    const validateResponse = registerSchema.safeParse(values);

    if(!validateResponse.success){
        return {error:"Invalid fields"}
    }

    const {email, password, fullname,mobile} = validateResponse.data;
    const hashedpassword = await bcrypt.hash(password,10)
    console.log(hashedpassword);

    const exsistingUser = await getUserByEmail(email);

    if(exsistingUser){
        return {error: "Email aldready exists"}
    }

    await db.operators.create({
        data:{
            email,
            firstname:fullname,
            password:hashedpassword,
            mobilenumber:mobile,
        }
    })

    console.log("created");
    

    return {success:"user created"}
}