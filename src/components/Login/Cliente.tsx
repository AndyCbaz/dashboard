import React, { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button/Button";
//toast
import Toast from "../../components/Toast/Toast";
import { toast } from "react-toastify";

//Otros componentes
import useForm from "../../hooks/useForm";
import { themeColors } from "../../helpers/theme/theme.colors";
//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setDataCliente,
  setClientCI,
  setUsuario,
} from "../../features/userSlice";
//React Router Dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//Helpers
import { initialValues } from "../../helpers/Login/formProps";
import { getDataLoginClient } from "../../services/DevicePage/getDataLoginClient";

export const Cliente = () => {
  //React router dom
  const navigate = useNavigate();
  //Redux
  // const password = useAppSelector(selectPassword);
  // const cliente = useAppSelector(selectClient);
  const dispatch = useAppDispatch();
  //Formulario

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

  const handleCamposVacios = () => {
    toast.error("Campos de Texto Vacios");
  };
  const { form, handleSubmit, handleChange } = useForm(initialValues);

  //Ingresar Funcion
  const handleButtonIngresar = () => {
    if (form.client !== "" && form.password !== "") {
      dispatch(setClientCI(form.client));
      dispatch(setUsuario(""));
      getDataLoginClient(form.client, form.password).then((data) => {
        if (data !== undefined) {
          localStorage.setItem("cliente", data.nombre);
          localStorage.setItem("idcliente", data.idcliente);
          localStorage.setItem("empresa", data.empresa);
          dispatch(setDataCliente(data));
          navigate("/home");
        }
      });
    } else {
      handleCamposVacios();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>CI/Cliente</Typography>
          <Input
            id="client"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            value={form.client}
            type="text"
            name="client"
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Password</Typography>
          <Input
            id="password"
            type="password"
            value={form.password}
            name="password"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            disableUnderline
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
        </Box>
      </Box>

      {/* Boton Ingresar */}
      <Box sx={{ display: "flex", pt: 2 }}>
        {/* <Button
          onClick={() => {
            handleButtonIngresar();
          }}
          sx={{ width: "100%", background: themeColors.BLUE1, color:'white' }}
        >
          <Typography variant="body1">Ingresar</Typography>
        </Button> */}
        <Button
          sx={{
            width: "100%",
            background: themeColors.BLUE1,
            color: "white",
            "&:hover": { color: "black", background:themeColors.BLUE2 },
          }}
          onClick={() => {
            handleButtonIngresar();
          }}
        >
          Ingresar
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Button component={Link} to={"/loguser"}>
          Entrar como Usuario
        </Button>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Button component={Link} to={"/register"}>
          Registro
        </Button>
      </Box> */}
      <Toast />
    </form>
  );
};
