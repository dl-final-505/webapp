import React from "react";
import styles from "../../styles/Home.module.css";

interface LightCircleProps {
  active: boolean;
  color: string;
}

const LightCircle = ({
  active,
  color,
  children,
}: React.PropsWithChildren<LightCircleProps>) => {
  return (
    <div className={styles.lightCircleContainer}>
      <div
        className={`${styles.lightCircle} ${
          active ? styles["light-circle-active"] : ""
        } ${color}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default LightCircle;
