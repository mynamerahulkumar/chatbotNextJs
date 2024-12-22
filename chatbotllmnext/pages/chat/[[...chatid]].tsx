import React, { useState } from "react";
import Head from "next/head";

import { ChatSideBar } from "../../components/ChatSidebar";
export default function ChatPage() {
  const[chatMessage,setChatMessage]= useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Message Text "+chatMessage)
  }
  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
     <div className="grid h-screen grid-cols-[260px_1fr]">
      <ChatSideBar/>
      <div className="flex flex-col bg-gray-700">
    <div className="flex-1">Chat Window</div>
    <footer className="bg-gray-800 p-10"> 
     <form onSubmit={handleSubmit}>
      <fieldset className="flex gap-2">
        <textarea 
         value={chatMessage}
         onChange={(e)=>setChatMessage(e.target.value)}
         placeholder="send a message ..." className="w-full resize-none rounded-md bg-gray-700  p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500"></textarea>
        <button type="submit" className="btn">Send</button>
      </fieldset>
     </form>
    </footer>
      </div>

     </div>
      </>
  );
}
