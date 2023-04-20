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
  setClient,
  setPassword,
  setUser
} from "../../features/userSlice";

export const LogOut = () => {
  //REDUX
  const dispatch = useAppDispatch();
  //HANDLE CERRAR SESION
  const handleLogout = () => {
    localStorage.removeItem('cliente')
    dispatch(setClient(''));
    dispatch(setPassword(''));
    dispatch(setUser(''));
  }

  return (

      <Card sx={{ borderRadius: 4, p: 6 }}>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
          <Box sx={{textAlign:'center'}}>
            <Typography variant="h5">Esta seguro que desea salir?</Typography>
          </Box>
          <Box>
            <Button onClick={handleLogout} sx={{background:themeColors.BLUE1}}>
              <Typography>Cerrar Sesión</Typography>
            </Button>
          </Box>
        </Box>
      </Card>
    
  );
};
