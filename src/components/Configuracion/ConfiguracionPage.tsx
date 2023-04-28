import React from "react";
import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { RouterBreadcrumbs } from "./Breadcrumbs";

export const Configuracion = () => {
  return (
    <Box
      sx={{
        display: "flex", flexDirection: "column", gap: 1 
      }}
    >
      <Box><RouterBreadcrumbs/></Box>
      <Outlet/>
    </Box>
  );
};
