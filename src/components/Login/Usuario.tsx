import React, { useState } from "react";
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

export const Usuario = () => {
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
          <Button sx={{ width: "100%", background: themeColors.BLUE1 }}>
            <Typography variant="body1">Ingresar</Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
};
