import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next JS ChatGPT Starter</title>
      </Head>
      <h1>Welcome to the Next JS &amp; ChatGPT Starter</h1>
      <Link href='/api/auth/login'>
      Login
      </Link>
    </div>
  );
}
