import styles from "../../styles/Home.module.css";

interface Props {
  time: string;
  source: string;
}

const LogEntry = ({time, source}: Props) => {
  const text = `Model predicts violence in ${source}, ${time}`; 

  return (
    <p className={styles.logEntry}>
      {text}
    </p>
  );
};

export default LogEntry;
