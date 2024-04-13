import React from "react";
import styles from "../css/firework.module.css";

const FireworkAnimation = ({ img, count }) => {
  return (
    <div className={"w-screen absolute z-[100000]  " + styles.pyro}>
      <div className={styles.before}></div>
      <div className={styles.after}></div>
    </div>
  );
};

export default FireworkAnimation;
