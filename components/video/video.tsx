import { FormEvent, useCallback, useState } from "react";
import { Prediction } from "../../pages/api/videos";
import styles from "../../styles/Home.module.css";

interface FormElements extends HTMLFormControlsCollection {
  video: HTMLInputElement;
}
interface VideoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Video = ({
  onPrediction,
}: {
  onPrediction: (prediction: number) => void;
}) => {
  const [videoStream, setVideoStream] = useState<string | undefined>();

  const submit = useCallback(
    (e: FormEvent<VideoFormElement>) => {
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
          onPrediction(res.prediction);
        });
    },
    [onPrediction]
  );

  return (
    <div className={styles.video}>
      <form onSubmit={submit}>
        <input type="file" name="video" accept=".mp4"></input>
        <button>Upload</button>
      </form>
      <video src={videoStream} controls loop autoPlay muted></video>
    </div>
  );
};

export default Video;
