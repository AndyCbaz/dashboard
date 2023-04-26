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
  setClave,
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

  const { form, handleSubmit, handleChange } = useForm(
    initialValues,
    onValidate
  );
  const handleShowLoginUserToast = () => {
    toast.error("Usuario no Valido");
  };

  const handleFunctionIngresarUsuario = () => {
    // dispatch(setUser(form.user));
    if (form.user === "usuarioB") {
      localStorage.setItem("usuario", form.user);
      setErrorStatus(true);
      setErrorMensaje("");
      dispatch(setClave(""));
      dispatch(setUsuario(form.user));
      dispatch(setClientCI(""));
      getDataLoginUser(form.user)
        .then((data) => {
          dispatch(setDataUsuario(data));
          getDataUser(data.idusuario, data.idcliente)
            .then((data) => {
              dispatch(setUserDataGlobal(data));
              let devices: any = [];
              for (let i = 0; i < data.areas.length; i++) {
                for (let j = 0; j < data.areas[i].zonas.length; j++) {
                  for (
                    let k = 0;
                    k < data.areas[i].zonas[j].dispositivos.length;
                    k++
                  ) {
                    getDataDevicesResumen(
                      data.areas[i].zonas[j].dispositivos[k].idmacgateway,
                      data.areas[i].zonas[j].dispositivos[k].iddispositivo
                    ).then((data) => {
                      devices.push(data);
                      dispatch(setDevicesResumen(devices));
                    });
                  }
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
      navigate("/home");
    } else {
      handleShowLoginUserToast();
    }
    // } else if (usuario === "") {
    //   setErrorStatus(false);
    //   setErrorMensaje("");
    // } else {
    //   setErrorMensaje("usuario no registrado");
    //   setErrorStatus(true);
    // }
  };

  // useEffect(() => {
  //   if (usuario === "usuarioB") {
  //     localStorage.setItem("usuario", usuario);
  //     navigate("/home");
  //     setErrorStatus(true);
  //     setErrorMensaje("");
  //   } else if (usuario === "") {
  //     setErrorStatus(false);
  //     setErrorMensaje("");
  //   } else {
  //     setErrorMensaje("usuario no registrado");
  //     setErrorStatus(true);
  //   }
  // }, [handleFunctionIngresarUsuario]);

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
        {errorStatus ? (
          <Box>
            <Typography color="error">{errorMensaje}</Typography>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Toast />
    </form>
  );
};
