import React, { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { themeColors } from "../helpers/theme/theme.colors";
import Typography from "@mui/material/Typography";

//React Router Dom
import { Outlet } from "react-router-dom";

export const LoginPage = () => {


  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: themeColors.GRAY2,
      }}
    >
      <Card sx={{ borderRadius: 12, p: 6, boxShadow:4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Logo Empresa */}
          <Box sx={{ display: "flex", justifyContent:'center' }}>
            <img src="/logo2.png" style={{ width: "200px" }} />
          </Box>
          {/* Mensaje */}
          {/* <Box sx={{ display: "flex", my: 2, justifyContent: "center" }}>
            <Typography variant="body2">
              Ingrese sus credenciales para continuar
            </Typography>
          </Box> */}
          {/* Inputs */}
          <Outlet/>

        </Box>
      </Card>
    </Box>
  );
};
