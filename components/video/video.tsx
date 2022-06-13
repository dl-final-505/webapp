import { useState } from "react";
import { useInterval } from "usehooks-ts";
import styles from "../../styles/Home.module.css";
import Streaming from "../streaming/Streaming";

const Video = ({
  onPrediction,
  onSetLogs,
}: {
  onPrediction: (prediction: number) => void;
  onSetLogs: (
    source: string,
    time: string,
    violence: number,
    id: string,
    blob: Blob
  ) => void;
}) => {
  const [time, setTime] = useState<string>(new Date().toLocaleDateString());

  useInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div className={styles.video}>
      <div className={styles.liveView}>
        Live view&nbsp;<span className={styles.liveViewTime}>{time}</span>
      </div>
      <Streaming onPrediction={onPrediction} onSetLogs={onSetLogs} />
    </div>
  );
};

export default Video;
