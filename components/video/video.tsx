import styles from "../../styles/Home.module.css";
import Streaming from "../streaming";

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
