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
import { createArea } from "../../services/Areas/crearArea";
import useForm from "../../hooks/useForm";
import { initialValues } from "../../helpers/Login/formProps";
import { toast } from "react-toastify";

export const NewArea = ({close}:any) => {
  const idcliente = Number(localStorage.getItem("idcliente"));
  const { form, handleChange, handleSubmit } = useForm(initialValues);
  const handleShowWarning = () => {
    toast.warning("Campo de Texto Vacio");
  };

  const handleCreateArea = async () => {
    if(form.nombreareacreate === ''){
      handleShowWarning();
    }else{
      createArea(form.nombreareacreate, idcliente).then((data) => {
        if (data !== undefined) {
          console.log(data);
          close();
        }
      });
    }
    // console.log(form.nombreareacreate)
    // console.log(idcliente)
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
            Agregar Área
          </Typography>
          <Divider />
          {/* INPUT NOMBRE */}
          <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
            <Typography variant="body1">Nombre </Typography>
          </Box>
          <Input
            sx={{
              px: 1,
              background: themeColors.GRAY2,
              borderRadius: 4,
              // border: "solid",
              // borderColor: themeColors.DARKGRAY,
            }}
            id="nombreareacreate"
            type="text"
            name="nombreareacreate"
            value={form.nombreareacreate}
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <ConstructionIcon />
              </InputAdornment>
            }
          />
         
        </Box>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "50%" }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleCreateArea}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
