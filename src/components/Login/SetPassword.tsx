import { Box, Divider } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { themeColors } from "../../helpers/theme/theme.colors";
import useForm from "../../hooks/useForm";
import { initialValues } from "../../helpers/Login/formProps";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { toast } from "react-toastify";
import { setPassword } from "../../services/DevicePage/cliente/setPassword";

export const SetPassword = ({close}:any) => {
  const { form, handleChange, handleSubmit } = useForm(initialValues);
  const idcliente = Number(localStorage.getItem("idcliente"));
  const idarea = Number(localStorage.getItem("idarea"));

  const handleShowWarning = () => {
    toast.warning("Campos de Texto Vacios");
  };
  const handleErrorSamePasswordNewAnt = () => {
    toast.warning("La Contraseña Anterior y la Nueva son las mismas");
  }
  const handleErrorSamePasswordNewNew = () => {
    toast.warning("La Contraseña nueva no coincide con su validación");
  }

  const handleSetPassword = async () => {
    if (
      form.passwordAntsetPassword === "" ||
      form.passwordNewValidation === "" ||
      form.passwordNewsetPassword === ""
    ) {
      handleShowWarning();
    }else if(
      form.passwordAntsetPassword === form.passwordNewsetPassword
    ){
      handleErrorSamePasswordNewAnt();
    }else if(form.passwordNewsetPassword !== form.passwordNewValidation){
      handleErrorSamePasswordNewNew();
    }else{
      setPassword(idcliente, form.passwordAntsetPassword, form.passwordNewValidation)
      .then((data)=>{
        if(data!==undefined){
          console.log(data)
          close();
        }
      })
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Cambiar Contraseña
          </Typography>
          <Divider />
          {/* INPUT Contraseña Anterior */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
              <Typography variant="body1">Contraseña Anterior </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,
              }}
              id="pastpassword"
              type="password"
              name="passwordAntsetPassword"
              value={form.passwordAntsetPassword}
              onChange={handleChange}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <PriorityHighIcon sx={{ color: themeColors.WARNING }} />
                </InputAdornment>
              }
            />
          </Box>
          {/* INPUT Contraseña Nueva */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
              <Typography variant="body1">Contraseña Nueva </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,
              }}
              id="newpassword"
              type="password"
              name="passwordNewsetPassword"
              value={form.passwordNewsetPassword}
              onChange={handleChange}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <PriorityHighIcon sx={{ color: themeColors.WARNING }} />
                </InputAdornment>
              }
            />
          </Box>
          {/* INPUT Contraseña Nueva Validacion */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
              <Typography variant="body1">
                Verificar Contraseña Nueva{" "}
              </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,
              }}
              id="passwordvalidation"
              type="password"
              name="passwordNewValidation"
              value={form.passwordNewValidation}
              onChange={handleChange}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <PriorityHighIcon sx={{ color: themeColors.WARNING }} />
                </InputAdornment>
              }
            />
          </Box>

          {/* </FormControl> */}
        </Box>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "50%" }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSetPassword}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
