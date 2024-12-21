import React from "react";
import Head from "next/head";

import { ChatSideBar } from "../../components/ChatSidebar";
export default function Home() {
  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>
     <div className="grid h-screen grid-cols-[260px_1fr]">
      <ChatSideBar/>
      <div className="flex flex-col bg-gray-700">
    <div className="flex-1">Chat Window</div>
    <footer className="bg-gray-800 p-10"> footer</footer>
      </div>

     </div>
      </>
  );
}
