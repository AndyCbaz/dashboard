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

//React Router Dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//Helpers
import { initialValues } from "../../helpers/Login/formProps";
import { getDataLoginClient } from "../../services/DevicePage/getDataLoginClient";
import { createClient } from "../../services/DevicePage/cliente/createClient";

export const NewClient = () => {
  //React router dom
  const navigate = useNavigate();
  //Redux
  // const password = useAppSelector(selectPassword);
  // const cliente = useAppSelector(selectClient);
  const dispatch = useAppDispatch();
  //Formulario

  //Require Formulario (Por completar)
  //   const onValidate = (form: any) => {
  //     let isError = false;
  //     let errors = { user: "" };

  //     if (!form.user.trim()) {
  //       errors.user = "Ingrese un usuario para continuar";
  //       isError = true;
  //     }
  //     return isError ? errors : "";
  //   };

  const { form, handleSubmit, handleChange } = useForm(initialValues);

  //   const handleShowLoginClientToast = () => {
  //     toast.error("Cliente no Valido");
  //   };
  //   const handleShowLoginClientCredencialesToast = () => {
  //     toast.error("Credenciales no Validas");
  //   };
  //   const handleShowLoginClientContraseñaToast = () => {
  //     toast.error("Contraseña no Valida");
  //   };

  //Ingresar Funcion
  const handleCreateNewClient = () => {
    createClient(form.clientregister,form.claveregister,form.nombreregister,form.empresaregister,form.directionregister,form.ciudadregister,form.telefonoregister,form.celularregister,form.emailregister)
    .then((data)=>{console.log(data)})

  };




  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Registro de Cliente</Typography>
        </Box>
        {/* cedula y clave */}
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "400px" }}
        >
          {/* cedula */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   border:'solid',
              //   width:'35%'
            }}
          >
            <Typography>CI/Cliente</Typography>
            <Input
              id="clientregister"
              sx={{
                background: themeColors.GRAY2,
                borderRadius: 8,
                p: 0.5,
              }}
              value={form.clientregister}
              type="text"
              name="clientregister"
              onChange={handleChange}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Box>
          {/* clave */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Contraseña</Typography>
            <Input
              id="passwordregister"
              sx={{
                background: themeColors.GRAY2,
                borderRadius: 8,
                p: 0.5,
              }}
              value={form.claveregister}
              type="password"
              name="claveregister"
              onChange={handleChange}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        {/* nombre y empresa */}
        <Box sx={{ display: "flex", gap: 2, width: "400px" }}>
          {/* nombre */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Nombre</Typography>
            <Input
              id="nombreregister"
              type="text"
              value={form.nombreregister}
              name="nombreregister"
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
          {/* empresa */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Empresa</Typography>
            <Input
              id="empresaregister"
              type="text"
              value={form.empresaregister}
              name="empresaregister"
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
        {/* direccion y ciudad */}
        <Box sx={{ display: "flex", gap: 2, width: "400px" }}>
          {/* direccion */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Dirección</Typography>
            <Input
              id="directionregister"
              type="text"
              value={form.directionregister}
              name="directionregister"
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
          {/* empresa */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Ciudad</Typography>
            <Input
              id="ciudadregister"
              type="text"
              value={form.ciudadregister}
              name="ciudadregister"
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
        {/* telefono y celular */}
        <Box sx={{ display: "flex", gap: 2, width: "400px" }}>
          {/* telefono */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Teléfono</Typography>
            <Input
              id="telefonoregister"
              type="number"
              value={form.telefonoregister}
              name="telefonoregister"
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
          {/* celular */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   width:'35%'
            }}
          >
            <Typography>Celular</Typography>
            <Input
              id="celularregister"
              type="number"
              value={form.celularregister}
              name="celularregister"
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
        {/* email */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography>Email</Typography>
            <Input
              id="emailregister"
              type="email"
              value={form.emailregister}
              name="emailregister"
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
      </Box>

      {/* Boton Ingresar */}
      <Box sx={{ display: "flex", pt: 2 }}>
        <Button
          onClick={() => {
            handleCreateNewClient();
          }}
          sx={{ width: "100%", background: themeColors.BLUE1 }}
        >
          <Typography variant="body1">Registrar</Typography>
        </Button>
      </Box>
      <Toast />
    </form>
  );
};
