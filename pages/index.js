import Head from "next/head";
import Header from "../components/Header";
// import Map from "../components/Map";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Head>
        <title>IP Address Tracker - Adion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <Header className="flex-1" />
      </div>
      {/* <Map /> */}
    </div>
  );
}
