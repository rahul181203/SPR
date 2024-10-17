"use client";
import { Cross1Icon, PaperPlaneIcon, ReaderIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  TextField,
  ScrollArea,
} from "@radix-ui/themes";
import { useState, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

interface chatMsg {
  from: string;
  msg: string;
}

export const ChatOption = () => {
  const [chatBox, setChatBox] = useState(true);
  const [socket, setSocket] = useState<Socket>();
  const [text, setText] = useState("");
  const [chat, setchat] = useState<chatMsg[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("reply", (msg) => {
      console.log("recieved reply:- ", msg);
      setchat([...chat, msg]);
    });

    scrollToBottom()
    
    return () => {
      socket?.off("reply");
    };
  }, [socket, chat]);

  const handleSubmit = () => {
    socket?.emit("new message", { from: "user", msg: text });
    setchat([...chat, { from: "user", msg: text }]);
    setText("");
  };
  return (
    <>
      <Box className="fixed bottom-0 right-0 m-4">
        <Flex direction={"column"}>
          <Flex
            direction={"column"}
            hidden={chatBox}
            height={"500px"}
            width={"500px"}
            className=" bg-slate-700  rounded-lg"
            my={"5"}
          >
            <Flex
              justify={"between"}
              align={"center"}
              className=" bg-blue-700 p-3 rounded-lg"
            >
              <Heading>ChatBot</Heading>
              <Cross1Icon
                width={"20"}
                height={"20"}
                className=" cursor-pointer"
                onClick={() => setChatBox(true)}
              />
            </Flex>
            <Flex
              direction={"column"}
              gap={"4"}
              justify={"end"}
              height={"380px"}
              className="p-3"
            >
              <ScrollArea id="scroll">
                {
                    chat.map((v,i)=>{
                        return(
                            <>
                            {
                                (v.from === "user") && <Flex key={i} justify={"end"}>
                                <Text className=" bg-neutral-500 p-3">
                                  {v.msg}
                                </Text>
                              </Flex>
                            }
                            {
                                (v.from === "AI") && <Flex my={'3'} key={i}>
                                <Text className=" bg-black p-3 text-white">
                                  {v.msg}
                                </Text>
                              </Flex>
                            }
                            <div ref={messagesEndRef} />
                            </>
                        )
                    })
                }
              </ScrollArea>
            </Flex>

            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
              <Flex justify={"between"} align={"center"} className="p-3">
                <Box width={"400px"}>
                  <TextField.Root
                    size={"3"}
                    placeholder="Ask the question..."
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                  />
                </Box>
                <Button size={"3"} type="submit">
                  <PaperPlaneIcon />
                </Button>
              </Flex>
            </form>

          </Flex>
          <Flex gap={"3"} justify={"end"} align={"center"}>
            <Button
              size={"4"}
              radius="full"
              className=" cursor-pointer"
              onClick={() => setChatBox(!chatBox)}
            >
              <Flex>
                <ReaderIcon height={"30"} width={"30"} />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
