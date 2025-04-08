import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          position: "fixed",
          bottom: 0,
          zIndex: 10,
          backgroundColor: "white",
          borderTop: "2px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          ©2011-2025 AJ Grant Building
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
