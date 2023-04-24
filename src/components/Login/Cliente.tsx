import React, { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button/Button";

//Otros componentes
import useForm from "../../hooks/useForm";
import { themeColors } from "../../helpers/theme/theme.colors";
//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setClient,
  selectClient,
  setPassword,
  selectPassword,
} from "../../features/userSlice";
//React Router Dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//Helpers
import { initialValues } from "../../helpers/Login/formProps";

export const Cliente = () => {
  //React router dom
  const navigate = useNavigate();
  //Redux
  const password = useAppSelector(selectPassword);
  const cliente = useAppSelector(selectClient);
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
  const [errorMensaje, setErrorMensaje] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const { form, handleSubmit, handleChange } = useForm(
    initialValues,
    onValidate
  );

  //Ingresar Funcion
  const handleFunctionIngresarCliente = () => {
    // dispatch(setClient(form.client));
    // dispatch(setPassword(form.password));
    if (form.client === "0000000000" && form.password==='1234') {
      setErrorMensaje("");
      setErrorStatus(false);
      localStorage.setItem("cliente", form.client);
      navigate('/home')
    }
    
  };

  // useEffect(() => {
  //   if (cliente === "0000000000" && password==='1234') {
  //     setErrorMensaje("");
  //     setErrorStatus(false);
  //     localStorage.setItem("cliente", form.client);
  //     navigate('/home')
  //   }
  //   } else if(cliente === "" && password===''){
  //     setErrorMensaje("");
  //     setErrorStatus(false);
  //   } else if(cliente !== '0000000000' && password!=='1234'){
  //     setErrorMensaje('Datos Incorrectos')
  //     setErrorStatus(true)
  //   } else if(cliente !== '0000000000'){
  //     setErrorMensaje('Cliente no Existente')
  //     setErrorStatus(true)
  //   }else if(password!=='1234'){
  //     setErrorMensaje('Contraseña Incorrecta')
  //     setErrorStatus(true)
  //   }
  // }, [handleFunctionIngresarCliente]);

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
      {errorStatus && (
        <Box>
          <Typography color="error">{errorMensaje}</Typography>
        </Box>
      )}
      {/* Boton Ingresar */}
      <Box sx={{ display: "flex", pt: 2 }}>
        <Button
          onClick={() => {
            handleFunctionIngresarCliente();
          }}
          sx={{ width: "100%", background: themeColors.BLUE1 }}
        >
          <Typography variant="body1">Ingresar</Typography>
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Button component={Link} to={"/loguser"}>
          Entrar como Usuario
        </Button>
      </Box>
    </form>
  );
};
