import  { LogEntry as LogEntryModel } from "../../models/LogEntry";
import styles from "../../styles/Home.module.css";
import LogEntry from "../logEntry";
import {useState} from "react";
import BasicModal from "../videoModal";
import * as React from "react";
import TrafficLight from "../trafficLight";

interface Props {
  logs: LogEntryModel[];
  prediction:number
}


const Logs = ({logs = [],prediction}: Props,) => {

    return (
    <div className={styles.logs}>
        <TrafficLight prediction={prediction} />
      <h3>Log events</h3>
      <div className={styles.logsList}>
        {logs.map(({time, source,violence,id,blob}, index) => {

          return (
            <LogEntry key={index} source={source} time={time} violence={violence} id={id} blob={blob}/>
          );
        }).reverse()}
      </div>
    </div>
  );
};

export default Logs;
