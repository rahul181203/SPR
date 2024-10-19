import { UserDTO } from "@/interfaces"
import { db } from "@/lib/prisma"

export async function POST(req:Request){
    const data:UserDTO = await req.json()
    await db.user.create({data:{
        firstname:data.firstname,
        lastname:data.lastname,
        email:data.email,
        mobilenumber:data.mobilenumber,
        gender:data.gender
    }})
    return Response.json({msg:"user added"})
}