import { db } from "./lib/prisma";
import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config";

export const {handlers:{GET,POST},auth,signIn,signOut}=NextAuth({
    callbacks:{
        async signIn({user,account,profile}) {
            console.log(account);
            if(!profile?.email){
                throw new Error("No account")
            }

            await db.operators.upsert({
                where:{
                    email: profile.email,
                },
                create:{
                    email: profile.email as string,
                    firstname:profile.name,
                    mobilenumber: profile.phone_number as string,
                },
                update:{
                    firstname:profile.name
                }
            });
            return true;
        },
        async session({token,session}){
            console.log({sessionToken:token,session});
            if(token.sub && session.user){
              session.user.id= token.sub;
            }
            return session;
          },
          async jwt({token}){
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy:"jwt"},
    ...authConfig
})