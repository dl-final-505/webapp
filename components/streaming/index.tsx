import { useEffect, useRef } from "react";
import { Prediction } from "../../pages/api/videos";
import styles from "../../styles/Home.module.css";

let recorder: MediaRecorder = null;

const Streaming = ({
  onPrediction,
}: {
  onPrediction: (prediction: number) => void;
}) => {
  const video = useRef<HTMLVideoElement>(null);
  const recordedChunks = useRef([]);

  const uploadVideo = () => {
    const formData = new FormData();
    const blob = new Blob(recordedChunks.current, {
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
      });
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunks.current = [event.data];
      uploadVideo();
    }
  };

  const recordVideo = (stream: MediaStream) => {
    const options = { mimeType: "video/webm; codecs=vp9" };
    recorder = new MediaRecorder(stream, options);
    recorder.ondataavailable = handleDataAvailable;
    recorder.start();
  };

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (video.current) {
            video.current.srcObject = stream;
            recordVideo(stream);
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
        setTimeout(stopAndStart, 4000);
      }
    };

    setTimeout((event) => {
      stopAndStart();
    }, 4000);
  }, []);

  return (
    <div className={styles.video}>
      <video
        ref={video}
        autoPlay={true}
        className={styles.videoElement}
      ></video>
    </div>
  );
};

export default Streaming;
