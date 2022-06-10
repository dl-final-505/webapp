import styles from "../../styles/Home.module.css";
import BasicModal from "../videoModal";
import * as React from "react";
import Button from "@mui/material/Button";

interface Props {
  time: string;
  source: string;
  violence:string;
  id:string;
}

const LogEntry = ({time, source,violence,id}: Props) => {
  const text = `Model predicts violence in ${source}, ${time}`;
  const [videoPath, setVideoPath] = React.useState('');
  const [open, setOpen] = React.useState(false);
  let path="upload/"+id+".mp4";
  const handleOpen = (id:string) => {setOpen(true) ;setVideoPath(path)};
  const handleClose = () => setOpen(false);

  return (
      <div id={id} className={styles.logEntry}>
    <p>
      {text}
    </p>
        <Button className="btn-primary" onClick={()=> handleOpen(id)}>VIEW DEMO</Button>
        <BasicModal open={open} handleClose={handleClose} path={videoPath} prediction={violence}/>
      </div>
  );
};

export default LogEntry;
