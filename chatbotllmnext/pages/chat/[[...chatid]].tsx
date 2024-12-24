import React, { useState } from "react";
import Head from "next/head";

import { ChatSideBar } from "../../components/ChatSidebar";
import { streamReader } from "openai-edge-stream";
export default function ChatPage() {
  const[messageText,setMessageText]= useState("");
   const [incomingMessage, setIncomingMessage] = useState("");
  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log("Message Text "+messageText)
    const response=await fetch(`/api/chat/sendMessage`,{
      method:"POST",
      headers:{
        "content-type":"application/json",

      },
      body:JSON.stringify({message:messageText})
      
    });
    console.log("Data-"+response);

    const data= response.body;
    if(!data){
      return ;
    }
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const reader = response.body.getReader();
    console.log("reader-"+reader)
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      console.log("reader-read"+reader)

      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      console.log("Value-"+value)
      const chunkValue = decoder.decode(value, { stream: true });
      setIncomingMessage((s) => `${s}${chunkValue}`);
    }
    console.log("Message Text "+messageText)
  }
  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
     <div className="grid h-screen grid-cols-[260px_1fr]">
      <ChatSideBar/>
      <div className="flex flex-col bg-gray-700">
    <div className="flex-1 text-white">{incomingMessage}</div>
    <footer className="bg-gray-800 p-10"> 
     <form onSubmit={handleSubmit}>
      <fieldset className="flex gap-2">
        <textarea 
         value={messageText}
         onChange={(e)=>setMessageText(e.target.value)}
         placeholder="send a message ..." className="w-full resize-none rounded-md bg-gray-700  p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500">
         </textarea>
        <button type="submit" className="btn">Send</button>
      </fieldset>
     </form>
    </footer>
      </div>

     </div>
      </>
  );
}
