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
import { createNewMacGateway } from "../../services/Gateways/createNewGateway";
import { toast } from "react-toastify";

export const NewGateway = ({close}:any) => {
  const idcliente = localStorage.getItem("idcliente");
  const handleShowWarning = () => {
    toast.warning("Campo de Texto Vacio");
  };
  const { form, handleSubmit, handleChange } = useForm(initialValues);
  const handlecreateGateway = async () => {
    // console.log(form.nombregateway);
    // console.log(idcliente);
    if(form.nombregateway === ''){
      handleShowWarning();
    }else{
      const data = await createNewMacGateway(
        form.nombregateway,
        Number(idcliente)
      );
      if (data !== undefined) {
        console.log(data);
        close();
      }
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
            Agregar Gateway
          </Typography>
          <Divider />
          {/* INPUT NOMBRE */}
          <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
            <Typography variant="body2">Nombre </Typography>
          </Box>
          <Input
            sx={{
              px: 1,
              background: themeColors.GRAY2,
              borderRadius: 4,
            }}
            id="nombregateway"
            value={form.nombregateway}
            type="text"
            name="nombregateway"
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <ConstructionIcon />
              </InputAdornment>
            }
          />

          {/* </FormControl> */}
        </Box>
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "50%" }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handlecreateGateway}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
