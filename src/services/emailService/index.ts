import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service:"Gmail",
    port:465,
    secure:true,
    auth:{
        user:"inventory096@gmail.com",
        pass:process.env.GOOGLE_PASS_KEY
    }
})

export const SendMail=(to:string,template:string)=>{
    transport.sendMail({
        from:"inventory096@gmail.com",
        to,
        subject:"Test Msg",
        html:template,
        text:"test plain"
    })
    .then((value)=>console.log(value))
    .catch((err)=>console.log(err)
    )
}