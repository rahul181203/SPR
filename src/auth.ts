import { db } from "./lib/prisma";
import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config";


export const {handlers:{GET,POST},auth,signIn,signOut} = NextAuth({
    callbacks:{
        async signIn({user,account,profile}) {
            console.log(account);
            console.log(user);
            console.log(profile);
            

            await db.operators.upsert({
                where:{
                    email: user.email!,
                },
                create:{
                    email: user.email as string,
                    firstname:user.name,
                    mobilenumber: "",
                },
                update:{
                    firstname:user.name
                }
            });

            return true;
        },
        async session({token,session}){
            if(token.sub && session.user){
                session.user.id= token.sub;
            }
            return session;
        },

        async jwt({token,user}){
            if(user){
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy:"jwt"},
    ...authConfig
})