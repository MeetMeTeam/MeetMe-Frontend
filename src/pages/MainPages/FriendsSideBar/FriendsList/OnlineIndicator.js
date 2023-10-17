import React from "react";
import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const OnlineIndicator = () => {
  return (
    <Box
      sx={{
        color: "#3ba55d",
        bottom: "-10px",
        position: "absolute",
        right: "-10px",
      }}
    >
      <FiberManualRecordIcon />
    </Box>
  );
};

export default OnlineIndicator;
