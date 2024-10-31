const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

export const sendmsg=async(toPhone:string,msg:string)=>{
   const response = await client.messages
    .create({
        from: '+14154656766',
        to: `+91${toPhone}`,
        body:msg
    })
    console.log(response);
}
