import { LogEntry as LogEntryModel } from "../../models";
import styles from "../../styles/Home.module.css";
import LogEntry from "../logEntry";
import {useState} from "react";
import BasicModal from "../videoModal";
import * as React from "react";

interface Props {
  logs: LogEntryModel[];
}


const Logs = ({logs = []}: Props) => {

    return (
    <div className={styles.logs}>
      <h3>Log events</h3>
      <div className={styles.logsList}>
        {logs.map(({time, source,violence,id}, index) => {

          return (
            <LogEntry key={index} source={source} time={time} violence={violence} id={id}/>
          );
        })}
      </div>
    </div>
  );
};

export default Logs;
