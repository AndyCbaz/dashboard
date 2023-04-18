import React from "react";
import { Box, Divider } from "@mui/material";
import { CardUsuarios } from "./CardUsuarios";

export const Configuracion = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 1,
      }}
    >
      <CardUsuarios />
    </Box>
  );
};
