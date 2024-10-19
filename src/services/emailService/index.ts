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

export const SendMail=async(subject:string,to:string,template:string)=>{
    const {response} = await transport.sendMail({
        from:"inventory096@gmail.com",
        to,
        subject,
        html:template,
    })
    console.log(response);
}