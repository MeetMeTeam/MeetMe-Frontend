import React from "react";
import styles from "../css/snow.module.css";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";

const SnowAnimation = ({ img, count, width }) => {
  const snowflakes = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="snowflakes z-10" aria-hidden="true">
      {snowflakes.map((flake, index) => (
        <div
          key={index}
          className={
            styles.snowflake + " flex justify-center flex-col items-center"
          }
        >
          <img src={img} className={width} alt="background" />
        </div>
      ))}
    </div>
  );
};

export default SnowAnimation;
