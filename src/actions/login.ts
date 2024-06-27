"use server"

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_PATH } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const Login = async (values:z.infer<typeof loginSchema>)=>{
    const validateResponse = loginSchema.safeParse(values);

    if(!validateResponse.success){
        return {error:"Invalid fields"}
    }
    
    const {email, password} = validateResponse.data;
    try{
        await signIn("credentials",{email,password,redirectTo:DEFAULT_REDIRECT_PATH});
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"}
                default:
                    return {error:"Something went wrong"}
            }
        }
        throw error;
    }
}