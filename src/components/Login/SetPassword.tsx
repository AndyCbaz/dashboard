import React, { useEffect, useState } from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
//Otros componentes
import useForm from "../../hooks/useForm";
import { themeColors } from "../../helpers/theme/theme.colors";
//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUsuario,
  setUsuario,
  setClientCI,
  setDataUsuario,
} from "../../features/userSlice";
import { setDevicesResumen } from "../../features/userDataSlice";

//React Router Dom
import { useNavigate } from "react-router-dom";
//Helpers
import { initialValues } from "../../helpers/Login/formProps";
import { getDataLoginUser } from "../../services/DevicePage/getDataLoginUser";
import { getDataUser } from "../../services/DevicePage/getDataUser";
import Toast from "../../components/Toast/Toast";
import { toast } from "react-toastify";

export const SetPassword = () => {
  //Redux
  const dispatch = useAppDispatch();
  const usuario = useAppSelector(selectUsuario);
  //React router dom
  const navigate = useNavigate();
  //Formulario
  // const initialValues = {
  //   user: localStorage.getItem('cliente'),
  //   password: "",
  //   client: localStorage.getItem('usuario'),
  // };
  //Require Formulario (Por completar)
  const onValidate = (form: any) => {
    let isError = false;
    let errors = { user: "" };

    if (!form.user.trim()) {
      errors.user = "Ingrese un usuario para continuar";
      isError = true;
    }
    return isError ? errors : "";
  };

  const { form, handleChange, handleSubmit } = useForm(initialValues);
  const handleIngreseCampo = () => {
    toast.error("Campo de Texto Vacio");
  };

  const handleFunctionSetPassword = async () => {
    if (
      form.ciclientesetPassword === "" ||
      form.passwordAntsetPassword === "" ||
      form.passwordNewsetPassword === ""
    ) {
      handleIngreseCampo();
    } else {
      console.log("api");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <Typography>CI/Cliente</Typography>
          <Input
            id="cliente"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            value={form.ciclientesetPassword}
            type="text"
            name="ciclientesetPassword"
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <Typography>Clave Anterior</Typography>
          <Input
            id="claveanterior"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            value={form.passwordAntsetPassword}
            type="password"
            name="passwordAntsetPassword"
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <Typography>Clave Nueva</Typography>
          <Input
            id="clavenueva"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            value={form.passwordNewsetPassword}
            type="password"
            name="passwordNewsetPassword"
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ display: "flex", pt: 2 }}>
          <Button
            onClick={handleFunctionSetPassword}
            sx={{
              width: "100%",
              background: themeColors.BLUE1,
              color: "white",
              "&:hover": { color: "black", background: themeColors.BLUE2 },
            }}
          >
            <Typography variant="body1">Cambiar Clave</Typography>
          </Button>
        </Box>
      </Box>
      <Toast />
    </form>
  );
};
