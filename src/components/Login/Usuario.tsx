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
import { setUserDataGlobal } from "../../features/userDataSlice";
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";
import Toast from "../../components/Toast/Toast";
import { toast } from "react-toastify";

export const Usuario = () => {
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
  const [errorMensaje, setErrorMensaje] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const { form, handleChange, handleSubmit } = useForm(initialValues);
  const handleIngreseUsuario = () => {
    toast.error("Campo de Texto Vacio");
  };

  const handleFunctionIngresarUsuario = async () => {
    if (form.user !== "") {
      const data = await getDataLoginUser(form.user);
      if (data !== undefined) {
        localStorage.setItem('usuario',data.nombreusuario)
        localStorage.setItem('idcliente',data.idcliente)
        localStorage.setItem('idusuario',data.idusuario)
        dispatch(setClientCI(""));
        dispatch(setUsuario(form.user));
        dispatch(setDataUsuario(data))
        navigate("/home");
      }
    } else {
      handleIngreseUsuario();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <Typography>CI/Usuario</Typography>
          <Input
            id="user"
            sx={{
              background: themeColors.GRAY2,
              borderRadius: 8,
              p: 0.5,
            }}
            value={form.user}
            type="text"
            name="user"
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
            onClick={handleFunctionIngresarUsuario}
            sx={{ width: "100%", background: themeColors.BLUE1 }}
          >
            <Typography variant="body1">Ingresar</Typography>
          </Button>
        </Box>
      </Box>
      <Toast />
    </form>
  );
};
