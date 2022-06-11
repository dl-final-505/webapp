import styles from "../../styles/Home.module.css";
import LightCircle from "../lightCircle";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface Props {
  prediction: number;
}

const TrafficLight = ({ prediction }: Props) => {
  return (
    <div>
      <div className={styles.lightCirclesContainer}>
        <LightCircle color="green" active={prediction > 0 && prediction <= 0.5}>
          <CheckIcon fontSize="inherit" />
        </LightCircle>
        <LightCircle
          color="orange"
          active={prediction > 0.5 && prediction <= 0.7}
        >
          <PriorityHighIcon fontSize="inherit" />
        </LightCircle>
        <LightCircle color="red" active={prediction > 0.7 && prediction <= 1}>
          <PriorityHighIcon fontSize="inherit" />
        </LightCircle>
      </div>
      <h3 className={styles.lightCircleText}>
        Prediction score = {Math.round(prediction * 100)}%
      </h3>
    </div>
  );
};

export default TrafficLight;
