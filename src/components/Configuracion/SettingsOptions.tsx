import React from "react";
import { CardUsuarios } from "./CardUsuarios";
import { Box, Divider } from "@mui/material";

export const SettingsOptions = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'row'}}>
      <CardUsuarios />
    </Box>
  );
};
