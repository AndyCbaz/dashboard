import { Box, Divider } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import ConstructionIcon from "@mui/icons-material/Construction";
import ShowerIcon from "@mui/icons-material/Shower";
import { Button } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SaveIcon from "@mui/icons-material/Save";
import { themeColors } from "../../../helpers/theme/theme.colors";

export const NewDevice = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          gap: 1,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Agregar Dispositivo
        </Typography>
        <Divider />

        {/* INPUT NOMBRE */}
        <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
          <Typography variant="body1">NOMBRE </Typography>
        </Box>
        <Input
          sx={{
            px: 1,
            background: themeColors.GRAY2,
            borderRadius: 4,
      
          }}
          id="input-search"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <ConstructionIcon />
            </InputAdornment>
          }
        />
        {/* INPUT TEMPERATURA MAXIMA y MINIMA */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="button">TEMPERATURA MÁXIMA </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,
      
              }}
              id="input-search"
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <DeviceThermostatIcon />
                </InputAdornment>
              }
            />
          </Box>
          <Box>
            {/* INPUT TEMPERATURA MINIMA */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="button">TEMPERATURA MÍNIMA </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,

              }}
              id="input-search"
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <DeviceThermostatIcon />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        {/* INPUT HUMEDAD MAXIMA Y MINIMA */}
        <Box sx={{display:'flex', justifyContent:'space-between', gap:2}}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="button">HUMEDAD MÁXIMA </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
     
              }}
              id="input-search"
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <ShowerIcon />
                </InputAdornment>
              }
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="button">HUMEDAD MÍNIMA </Typography>
            </Box>
            <Input
              sx={{
                px: 1,
                background: themeColors.GRAY2,
                borderRadius: 4,
     
              }}
              id="input-search"
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <ShowerIcon />
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        {/* </FormControl> */}
      </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ width: "50%" }}
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </Box>
    </React.Fragment>
  );
};
