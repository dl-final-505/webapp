import styles from "../../styles/Home.module.css";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";

const Cameras = () => {
  return (
    <div className={styles.cameras}>
      <div className={styles.camera}>
        <p>Camera 2</p>
        <video loop autoPlay muted width="320" height="240">
          <source src="/Violence.mp4" />
        </video>
      </div>
      <div className={styles.camera}>
        <p>Camera 3</p>
        <video loop autoPlay muted width="320" height="240">
          <source src="/NoViolence.mp4" />
        </video>
      </div>
      <div className={styles.camera}>
        <p>Camera 4</p>
        <div className={styles.disconnectedCamera}>
          <p style={{ color: "white" }}>Disconnected</p>
          <PowerOutlinedIcon style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};

export default Cameras;
