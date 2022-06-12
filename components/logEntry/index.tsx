import styles from "../../styles/Home.module.css";
import BasicModal from "../videoModal";
import * as React from "react";
import Button from "@mui/material/Button";
import LightCircle from "../lightCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {orange} from "@mui/material/colors";
import orangeIcon from '/public/orangeIcon.svg'

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
      <div style={{ paddingRight: "20px", marginInline: "5px" }}>
          {violence>0.7 ? (
              <svg width="30" height="30" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM18.4512 11.0501C18.5678 15.6834 18.8678 19.6251 19.3512 22.8751C19.4012 23.1251 19.6095 23.2501 19.9762 23.2501C20.3428 23.2501 20.5512 23.1251 20.6012 22.8751C20.8845 21.1584 21.1095 19.1001 21.2762 16.7001C21.4595 14.3001 21.5595 12.4084 21.5762 11.0251C21.5762 10.7418 21.4678 10.5001 21.2512 10.3001C21.0512 10.1001 20.7928 9.98343 20.4762 9.9501C20.1762 9.9001 19.8678 9.9001 19.5512 9.9501C19.2512 10.0001 18.9928 10.1251 18.7762 10.3251C18.5595 10.5251 18.4512 10.7668 18.4512 11.0501ZM18.6262 27.8501C18.9928 28.1501 19.4595 28.3001 20.0262 28.3001C20.5762 28.3001 21.0345 28.1501 21.4012 27.8501C21.7678 27.5334 21.9512 27.0918 21.9512 26.5251C21.9512 25.9418 21.7678 25.5001 21.4012 25.2001C21.0345 24.8834 20.5762 24.7251 20.0262 24.7251C19.4595 24.7251 18.9928 24.8834 18.6262 25.2001C18.2595 25.5001 18.0762 25.9418 18.0762 26.5251C18.0762 27.0918 18.2595 27.5334 18.6262 27.8501Z" fill="#FF453A"/>
              </svg>
          ):(
              <svg width="30" height="30" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM18.4512 11.0501C18.5678 15.6834 18.8678 19.6251 19.3512 22.8751C19.4012 23.1251 19.6095 23.2501 19.9762 23.2501C20.3428 23.2501 20.5512 23.1251 20.6012 22.8751C20.8845 21.1584 21.1095 19.1001 21.2762 16.7001C21.4595 14.3001 21.5595 12.4084 21.5762 11.0251C21.5762 10.7418 21.4678 10.5001 21.2512 10.3001C21.0512 10.1001 20.7928 9.98343 20.4762 9.9501C20.1762 9.9001 19.8678 9.9001 19.5512 9.9501C19.2512 10.0001 18.9928 10.1251 18.7762 10.3251C18.5595 10.5251 18.4512 10.7668 18.4512 11.0501ZM18.6262 27.8501C18.9928 28.1501 19.4595 28.3001 20.0262 28.3001C20.5762 28.3001 21.0345 28.1501 21.4012 27.8501C21.7678 27.5334 21.9512 27.0918 21.9512 26.5251C21.9512 25.9418 21.7678 25.5001 21.4012 25.2001C21.0345 24.8834 20.5762 24.7251 20.0262 24.7251C19.4595 24.7251 18.9928 24.8834 18.6262 25.2001C18.2595 25.5001 18.0762 25.9418 18.0762 26.5251C18.0762 27.0918 18.2595 27.5334 18.6262 27.8501Z" fill="#FFD60A
"/>
              </svg>
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
