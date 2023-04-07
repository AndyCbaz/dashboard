import { Box } from "@mui/material";
import React from "react";

export const LogoSection = () => {
  return (
    <Box sx={{marginRight: 4, width: "200px", height: "100%"}}>
      <img
        src="logo-de-prueba.jpeg"
        alt="logo"
        style={{ width: "100%", height: "100%", scale: '75%' }}
      />
    </Box>
  );
};
