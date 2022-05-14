import styles from "../../styles/Home.module.css";

interface LightCircleProps {
  active: boolean;
  color: string;
  text: string;
}

const LightCircle = ({active, color, text}: LightCircleProps) => {
  return (
    <div className={styles.lightCircleContainer}>
      <div className={styles.lightCircle} style={{backgroundColor: active ? color : 'white'}}></div>
      <h5 className={styles.lightCircleText}>{text}</h5>
    </div>
  );
};

export default LightCircle;
