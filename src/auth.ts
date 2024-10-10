import { db } from "./lib/prisma";
import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config";
import { SendMail } from "./services/emailService";
import { LoginTemplate } from "./services/emailService/templates";
import os from "node:os"
import { headers } from "next/headers";

export const {handlers:{GET,POST},auth,signIn,signOut} = NextAuth({
    callbacks:{
        async signIn({user,account,profile}) {

            const u = await db.operators.upsert({
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
            const head = headers()
            const ip = (head.get('x-forwarded-for') ?? "127.0.0.1").split(",")[0]
            SendMail(u.email!, LoginTemplate({
                ip,
                date:new Date().toLocaleString(),
                device:os.platform()
            }))
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