import styles from "../../styles/Home.module.css";
import BasicModal from "../videoModal";
import * as React from "react";
import Button from "@mui/material/Button";
import LightCircle from "../lightCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {orange} from "@mui/material/colors";

interface Props {
  time: string;
  source: string;
  violence: number;
  id: string;
  blob: Blob;
}

const LogEntry = ({ time, source, violence, id, blob }: Props) => {
  const text = `Model predicts violence in ${source}, ${time}`;
  const [videoPath, setVideoPath] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
    const url = URL.createObjectURL(blob);
    setVideoPath(url);
  };
  const handleClose = () => setOpen(false);

  return (
    <div id={id} className={styles.logEntry}>
      <div style={{ paddingRight: "34px", marginInline: "12px" }}>
          {violence>0.7 ? (
                  <LightCircle color="red" active={true}>
                  <PriorityHighIcon  fontSize="inherit" />
                  </LightCircle>
          ):(
              <LightCircle color="orange" active={true}>
              <PriorityHighIcon fontSize="inherit" />
              </LightCircle>
          )
          }
      </div>
      <p>{text}</p>
      <Button className="btn-primary" onClick={() => handleOpen(id)}>
        VIEW VIDEO
      </Button>
      <BasicModal
        open={open}
        handleClose={handleClose}
        path={videoPath}
        prediction={violence}
        blob={blob}
      />
    </div>
  );
};

export default LogEntry;
