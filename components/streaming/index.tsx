import React, { useCallback, useEffect, useRef } from "react";
import { Prediction } from "../../pages/api/videos";
import styles from "../../styles/Home.module.css";

const Streaming = ({
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
  const video = useRef<HTMLVideoElement>(null);

  const uploadVideo = useCallback(
    (chunks: BlobPart[], url: Blob) => {
      const formData = new FormData();

      const blob = new Blob(chunks, {
        type: "video/webm",
      });
      formData.append("video", blob);

      const config: RequestInit = {
        method: "post",
        body: formData,
      };

      fetch(`/api/videos`, config)
        .then((res) => res.json())
        .then((res: Prediction) => {
          onPrediction(res.prediction);
          console.log(blob);
          onSetLogs("camera1", res.time, res.prediction, res.id, url);
        });
    },
    [onPrediction, onSetLogs]
  );

  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        const blob = event.data;

        uploadVideo([event.data], blob);
        console.log("url", blob);
      }
    },
    [uploadVideo]
  );

  useEffect(() => {
    let timerId: any = null;
    let recorder: MediaRecorder | null = null;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (video.current) {
            video.current.srcObject = stream;
            const options = { mimeType: "video/webm; codecs=vp9" };
            recorder = new MediaRecorder(stream, options);
            recorder.ondataavailable = handleDataAvailable;
            recorder.start();
          }
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }

    const stopAndStart = () => {
      if (recorder?.state === "recording") {
        recorder?.stop();
        recorder?.start();
        timerId = setTimeout(stopAndStart, 4000);
      }
    };

    timerId = setTimeout((event) => {
      stopAndStart();
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [handleDataAvailable]);

  return (
    <div className={styles.video}>
      <video
        height={"initial"}
        ref={video}
        autoPlay={true}
        className={styles.videoElement}
      ></video>
    </div>
  );
};

export default Streaming;
