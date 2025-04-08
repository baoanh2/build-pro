import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-1/2 w-full">
      <CircularProgress />
    </div>
  );
};

export default Loading;
