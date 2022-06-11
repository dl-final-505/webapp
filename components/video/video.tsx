import { FormEvent, useCallback, useState } from "react";
import { Prediction } from "../../pages/api/videos";
import styles from "../../styles/Home.module.css";
import Streaming from "../streaming";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
  return (
    <div className={styles.video}>
      <Streaming onPrediction={onPrediction} onSetLogs={onSetLogs} />
    </div>
  );
};

export default Video;
