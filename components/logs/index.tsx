import { LogEntry as LogEntryModel } from "../../models/LogEntry";
import styles from "../../styles/Home.module.css";
import LogEntry from "../logEntry";
import { useState } from "react";
import BasicModal from "../videoModal";
import * as React from "react";
import TrafficLight from "../trafficLight/trafficLight";
import Button from "@mui/material/Button";

interface Props {
  logs: LogEntryModel[];
  prediction: number;
}

const Logs = ({ logs = [], prediction }: Props) => {
  return (

    <div className={styles.logs}>
      <TrafficLight prediction={prediction} />
      <h3>Log Events - Live</h3>
        <h4 >camera 1</h4>
      <div className={styles.logsList}>
        {logs
          .map(({ time, source, violence, id, blob }, index) => {
            return (
              <LogEntry
                key={index}
                source={source}
                time={time}
                violence={violence}
                id={id}
                blob={blob}
              />
            );
          })
          .reverse()}
      </div>
        <div style={{textAlignLast: "center"}}>
            <Button style={{marginTop:'20px' ,fontSize:'12px'}} variant="contained">Export To File</Button>
        </div>ֿ
    </div>

);
};

export default Logs;
