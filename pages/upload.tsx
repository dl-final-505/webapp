import { useState, useCallback, FormEvent } from "react";
import { Prediction } from "./api/videos";
import Head from "next/head";
import Header from "../components/header";
import Logs from "../components/logs";
import { LogEntry } from "../models/LogEntry";
import styles from "../styles/Home.module.css";
import {v4 as uuidV4} from "uuid";

interface FormElements extends HTMLFormControlsCollection {
  video: HTMLInputElement;
}
interface VideoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Upload = () => {
  const [prediction, setPrediction] = useState<number>(0);
  const [logs,setLogs] = useState<LogEntry[]>([]);
  const [videoStream, setVideoStream] = useState<string | undefined>();
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

  const submit = useCallback((e: FormEvent<VideoFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.elements.video.files) {
      return;
    }

    const formData = new FormData();
    const videoFile = e.currentTarget.elements.video.files[0];
    formData.append("video", videoFile);

    const config: RequestInit = {
      method: "post",
      body: formData,
    };

    fetch(`/api/videos`, config)
      .then((res) => res.json())
      .then((res: Prediction) => {
        const src = URL.createObjectURL(videoFile);
        setVideoStream(src);
        setPrediction(res.prediction);
        addNewLog('upload',new Date().toDateString(),res.prediction,uuidV4(),new Blob())
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <form onSubmit={submit}>
          <input type="file" name="video" accept=".mp4"></input>
          <button>Upload</button>
        </form>
        <video src={videoStream} controls loop autoPlay muted></video>
        <Logs logs={logs} prediction={prediction} />
      </div>
    </div>
  );
};

export default Upload;
