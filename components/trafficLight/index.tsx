import styles from "../../styles/Home.module.css";
import LightCircle from "../lightCircle";

interface Props {
  prediction: number;
}

const TrafficLight = ({ prediction }: Props) => {
  return (
    <div className={styles.trafficLight}>
      <div className={styles.lightCirclesContainer}>
        <LightCircle
          text="All safe"
          color="green"
          active={prediction > 0 && prediction <= 0.5}
        />
        <LightCircle
          text="Suspicion of violence"
          color="orange"
          active={prediction > 0.5 && prediction <= 0.7}
        />
        <LightCircle
          text="Violence"
          color="red"
          active={prediction > 0.7 && prediction <= 1}
        />
      </div>
      <h3 className={styles.lightCircleText}>
        Prediction score = {Math.round(prediction * 100)}%
      </h3>
    </div>
  );
};

export default TrafficLight;
