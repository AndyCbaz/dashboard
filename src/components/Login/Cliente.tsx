import React, { useState, useEffect } from "react";
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
  setUser,
  selectUser,
  setPassword,
  selectPassword,
} from "../../features/userSlice";
//React Router Dom
import { useNavigate } from "react-router-dom";

export const Cliente = () => {
  //React router dom
  const navigate = useNavigate();
  //Redux
  const user = useAppSelector(selectUser);
  const password = useAppSelector(selectPassword);
  const dispatch = useAppDispatch();
  //Formulario
  const initialValues = {
    user: "",
    password: "",
    client: "",
  };
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
  const [errorMensaje, setErrorMensaje] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const { form, handleSubmit, handleChange } = useForm(
    initialValues,
    onValidate
  );
  
  //Ingresar Funcion
  const handleFunctionIngresar = () => {
    dispatch(setUser(form.user)), dispatch(setPassword(form.password));
  };

  useEffect(() => {
    if (user === "0000000000" && password === "1234") {
      setErrorMensaje("");
      setErrorStatus(false);
      navigate("/home");
    } else if (user === "0000000000" && password !== "1234") {
      setErrorMensaje("constraseña incorrecta");
      setErrorStatus(true);
    } else if (user !== "0000000000" && password === "1234") {
      setErrorMensaje("usuario incorrecto");
      setErrorStatus(true);
    } else {
      setErrorMensaje("datos incorrectos");
      setErrorStatus(true);
    }
  }, [user, password]);

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
            id="user"
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
      {errorStatus && (
        <Box>
          <Typography color="error">{errorMensaje}</Typography>
        </Box>
      )}
      {/* Boton Ingresar */}
      <Box sx={{ display: "flex", pt: 2 }}>
        <Button
          onClick={() => {
            handleFunctionIngresar();
          }}
          sx={{ width: "100%", background: themeColors.BLUE1 }}
        >
          <Typography variant="body1">Ingresar</Typography>
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Link href="loguser" underline="hover" >
          Entrar como Usuario
        </Link>
      </Box>
    </form>
  );
};
