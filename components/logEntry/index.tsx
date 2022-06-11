import styles from "../../styles/Home.module.css";
import BasicModal from "../videoModal";
import * as React from "react";
import Button from "@mui/material/Button";
import LightCircle from "../lightCircle";
import {red} from "@mui/material/colors";


interface Props {
  time: string;
  source: string;
  violence:string;
  id:string;
  blob:Blob ,
}

const LogEntry = ({time, source,violence,id,blob}: Props) => {
  const text = `Model predicts violence in ${source}, ${time}`;
  let path="/.uploads/"+id+".mp4";
  const [videoPath, setVideoPath] = React.useState(path);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id:string) => {setOpen(true) ;const url=URL.createObjectURL(blob);setVideoPath(url)};
  const handleClose = () => setOpen(false);

  return (
      <div id={id} className={styles.logEntry}>
        <div style={{    paddingRight: '34px' ,marginInline :'12px'}} >
            <LightCircle active={true} color='red'/>
        </div>
    <p>
      {text}
    </p>
        <Button className="btn-primary"  onClick={()=> handleOpen(id)}>VIEW VIDEO</Button>
        <BasicModal open={open} handleClose={handleClose} path={videoPath} prediction={violence} blob={blob}/>
      </div>
  );
};

export default LogEntry;
