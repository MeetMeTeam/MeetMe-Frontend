import React from "react";
import styles from "../css/firework.module.css";

const FireworkAnimation = ({ img, count }) => {
  return (
    <div class={"w-screen absolute z-[100000]  " + styles.pyro}>
      <div class={styles.before}></div>
      <div class={styles.after}></div>
    </div>
  );
};

export default FireworkAnimation;
