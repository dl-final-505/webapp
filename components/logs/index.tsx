import { LogEntry as LogEntryModel } from "../../models/LogEntry";
import styles from "../../styles/Home.module.css";
import LogEntry from "../logEntry";

interface Props {
  logs: LogEntryModel[];
}

const Logs = ({ logs = [] }: Props) => {
  return (
    <div className={styles.logs}>
      <h3>Log events</h3>
      <div className={styles.logsList}>
        {logs.map(({ time, source }, index) => {
          return <LogEntry key={index} source={source} time={time} />;
        })}
      </div>
    </div>
  );
};

export default Logs;
