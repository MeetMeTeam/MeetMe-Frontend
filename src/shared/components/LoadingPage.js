import React from "react";
import styles from "../css/loadingPage.module.css";

export default function Loading() {
  return (
    <div className="absolute z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="bg-black/50 w-screen h-screen  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className={styles.loader + " absolute top-0"}></div>
      <div className="mt-6 text-white"> Something is coming... </div>
    </div>
  );
}
