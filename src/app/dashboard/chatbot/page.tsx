"use client"
import * as React from "react"
import { Socket,io } from "socket.io-client";
import { json } from "stream/consumers";

interface chatMsg{
    from:string,
    msg:string
}

export default function ChatBot(){
    const [socket,setSocket] = React.useState<Socket>();
    const [text,setText] = React.useState("");
    const [chat,setchat] = React.useState<chatMsg[]>([])

    React.useEffect(()=>{
        const newSocket = io('https://websocketinventory.vercel.app')
        setSocket(newSocket)
        return(()=>{
            newSocket.disconnect()
        })
    },[])

    React.useEffect(()=>{

        socket?.on("reply",(msg)=>{
            console.log("recieved reply:- ",msg);
            setchat([...chat,msg])
        })

        return(()=>{
            socket?.off("reply")
        })

    },[socket,chat])

    const handleSubmit=()=>{
        socket?.emit("new message",{from:"user",msg:text})
        setchat([...chat,{from:"user",msg:text}])
        setText("")
    }

    return(
        <>
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
                <input className="border text-white m-3" type="text" value={text} onChange={(txt)=>setText(txt.target.value)}/>
                <button type="submit">Send</button>
            </form>
            {
                chat.map((e,i)=>{
                    return <p key={i}>{`${e.from} -> ${e.msg}`}</p>
                })
            }
        </>
    )
}