import { useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";

let recorder: MediaRecorder = null;

const Streaming = ({}: Props) => {
  const video = useRef<HTMLVideoElement>(null);
  const recordedChunks = useRef([]);


  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunks.current = [event.data];
      download();
    }
  }

  function download() {
    var blob = new Blob(recordedChunks.current, {
      type: "video/webm",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }


  const recordVideo = (stream: MediaStream) => {
    const options = { mimeType: "video/webm; codecs=vp9" };
    recorder = new MediaRecorder(stream, options);
    recorder.ondataavailable = handleDataAvailable;
    recorder.start();
  }

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
    }

    setTimeout((event) => {
      stopAndStart();
    }, 9000);
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
