import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/header";
import Logs from "../components/logs";
import TrafficLight from "../components/trafficLight";
import Video from "../components/video/video";
import { LogEntry } from "../models";
import styles from "../styles/Home.module.css";

const logs: LogEntry[] = [
  { source: "camera1", time: new Date().toDateString() },
  { source: "camera2", time: new Date().toDateString() },
  { source: "camera3", time: new Date().toDateString() },
  { source: "camera4", time: new Date().toDateString() },
];

const Home: NextPage = () => {
  const [prediction, setPrediction] = useState<number>(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={styles.mainContainer}>
        <Video onPrediction={setPrediction} />
        <TrafficLight prediction={prediction} />
        <Logs logs={logs} />
      </div>
    </div>
  );
};

export default Home;
