import authConfig from "./auth.config"
import NextAuth from "next-auth";
import { DEFAULT_REDIRECT_PATH,apiAuthPrefix, publicRoutes,protectedRoutes } from "./routes";

const {auth} = NextAuth(authConfig);

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedin = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isPrivateRoute = protectedRoutes.includes(nextUrl.pathname)
    
    if(isApiAuthRoute){
        if(isLoggedin) return Response.redirect(new URL(DEFAULT_REDIRECT_PATH,nextUrl))
        return;
    }

    // if(isLoggedin && "/"){
    //     return Response.redirect(new URL(DEFAULT_REDIRECT_PATH,nextUrl))
    // }

    if(!isLoggedin && isPrivateRoute){
        return Response.redirect(new URL("/",nextUrl))
    }
    return;
})

export const config={
    matcher:["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}