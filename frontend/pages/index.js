import Head from "next/head";
import Form from "../components/Form";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crowdfunding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1 className="mt-12 text-3xl text-transparent text-center font-bold bg-clip-text	bg-gradient-to-r from-orange-500 to-violet-700">
        Welcome to the new generation of investing
      </h1>
      <main>
        <Form />
      </main>
    </>
  );
}
