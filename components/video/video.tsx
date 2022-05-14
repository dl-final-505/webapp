import { FormEvent, useCallback } from "react";
import styles from "../../styles/Home.module.css";

interface FormElements extends HTMLFormControlsCollection {
  video: HTMLInputElement;
}
interface VideoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Video = () => {
  const submit = useCallback((e: FormEvent<VideoFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.elements.video.files) {
      return;
    }

    const formData = new FormData();
    formData.append("video", e.currentTarget.elements.video.files[0]);

    const config: RequestInit = {
      method: "post",
      body: formData,
    };

    fetch(`/api/videos`, config)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <div className={styles.video}>
      <form onSubmit={submit}>
        <input type="file" name="video" accept=".mp4"></input>
        <button>Upload</button>
      </form>
    </div>
  );
};

export default Video;
