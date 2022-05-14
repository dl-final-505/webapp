import { LegacyRef, useEffect, useRef } from "react";
import { LogEntry as LogEntryModel } from "../../models";
import styles from "../../styles/Home.module.css";
import LogEntry from "../logEntry";

interface Props {
}

const Streaming = ({}: Props) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (video.current) {
            video.current.srcObject = stream;
          }
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }, []);

  return (
    <div className={styles.Streaming}>
      <video
        ref={video}
        autoPlay={true}
        className={styles.videoElement}
      ></video>
    </div>
  );
};

export default Streaming;
