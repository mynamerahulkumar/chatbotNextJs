import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/dist/server/api-utils";
import { getSession } from "@auth0/nextjs-auth0";
export default function Home() {
  const {isLoading,error,user}=useUser();
  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>{error.message}</div>
  }

  return (
    <>
      <Head>
        <title>Chatbot Next JS</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen  bg-gray-800 text-white text-center">
      <div>
        {!!user &&  <Link href='/api/auth/logout'>
      Logout
      </Link>
      }
      {
        !user &&(
          <>
          <Link href='/api/auth/login' className="rounded-mg bg-emerald-500 px-4 py-2 hover:bg-emerald-600">
        Login
        </Link>
        <Link href='/api/auth/signup' className="rounded-mg bg-emerald-500 px-4 py-2 hover:bg-emerald-600">
        Signup
        </Link>
          </>
        )
         
      }
      </div>
      </div>
     
      </>
  );
}

export const getServerSideProps=async(ctx)=>{
  const session= await getSession(ctx.req,ctx.res);
  if(!!session){
    return{
      redirect:{
        destination:'/chat'
      }
    }
  }
  return{
    props:{}
  }
}
