import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./data/users";

export default {

    pages:{
        signIn:'/',
        signOut:'/'
    },
    providers:[
        Credentials({
            async authorize(credentials) {
                const valdateFields = loginSchema.safeParse(credentials)
                if(valdateFields.success){
                    const {email,password} = valdateFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;
                    const passMatch = await bcrypt.compare(password,user.password);
                    if(passMatch){
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
    secret:process.env.AUTH_SECRET,
} satisfies NextAuthConfig