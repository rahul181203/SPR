import { db } from "./lib/prisma";
import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config";

export const {handlers:{GET,POST},auth,signIn,signOut} = NextAuth({
    callbacks:{
        // async signIn({user,account}) {
        //     console.log(account);
        //     console.log(user);

        //     await db.operators.upsert({
        //         where:{
        //             email: user.email!,
        //         },
        //         create:{
        //             email: user.email as string,
        //             firstname:user['fullname'],
        //             mobilenumber: user['mobilenumber']!,
        //         },
        //         update:{
        //             firstname:user['fullname']
        //         }
        //     });

        //     return true;
        // },
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