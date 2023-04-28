import React from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card";
//Otros componentes
import { themeColors } from "../../helpers/theme/theme.colors";
//REDUX
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setClientCI,
  setUsuario,
  setDataUsuario,
  setDataCliente,
} from "../../features/userSlice";
import {
  setDevicesResumen,
  setUserDataGlobal,
} from "../../features/userDataSlice";
//React Router Dom
import { useNavigate } from "react-router-dom";
import { setDataResultDevice } from "../../features/userResultsSlice";

export const LogOut = () => {
  //reac-router-dom
  const navigate = useNavigate();
  //REDUX
  const dispatch = useAppDispatch();
  //HANDLE CERRAR SESION
  const handleLogout = () => {
    localStorage.setItem("cliente", "");
    localStorage.setItem("usuario", "");
    localStorage.setItem("idcliente", "");
    localStorage.setItem("empresa", "");
    dispatch(setClientCI(""));
    dispatch(setUsuario(""));
    dispatch(setUserDataGlobal([]));
    dispatch(setDevicesResumen([]));
    dispatch(setDataUsuario([]));
    dispatch(setDataCliente([]));
    navigate("/");
  };

  return (
    <Card sx={{ borderRadius: 4, p: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">Esta seguro que desea salir?</Typography>
        </Box>
        <Box>
          <Button onClick={handleLogout} sx={{ background: themeColors.BLUE1 }}>
            <Typography>Cerrar Sesión</Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
