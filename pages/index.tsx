import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/header";
import Logs from "../components/logs";
import Video from "../components/video/video";
import { LogEntry } from "../models/LogEntry";
import styles from "../styles/Home.module.css";
import Cameras from "../components/cameras";

const Home: NextPage = () => {
  const [prediction, setPrediction] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addNewLog = (
    source: string,
    time: string,
    violence: number,
    id: string,
    blob: Blob
  ) => {
    if (violence > 0.5) {
      let predict = Math.round((violence + Number.EPSILON) * 100) / 100;

      const log: LogEntry = {
        source,
        time,
        id,
        violence: predict,
        blob,
      };
      setLogs((prevLogs) => [...prevLogs, log]);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EyeVision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <div className={styles.mainContainer}>
        <Video onPrediction={setPrediction} onSetLogs={addNewLog} />
        <Cameras />
        <Logs logs={logs} prediction={prediction} />
      </div>
    </div>
  );
};

export default Home;
