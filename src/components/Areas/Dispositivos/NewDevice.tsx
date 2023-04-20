import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import ConstructionIcon from "@mui/icons-material/Construction";
import ShowerIcon from "@mui/icons-material/Shower";
import { Button } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SaveIcon from "@mui/icons-material/Save";
import { themeColors } from "../../../helpers/theme/theme.colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const NewDevice = () => {
  const [user, setUser] = useState('');
  const [area, setArea] = useState('');
  const [zona, setZona] = useState('');

  const handleChangeSelectUser = (event:SelectChangeEvent) => {
    setUser(event.target.value);
  };
  const handleChangeSelectArea = (event:SelectChangeEvent) => {
    setArea(event.target.value);
  };
  const handleChangeSelectZona = (event:SelectChangeEvent) => {
    setZona(event.target.value);
  };
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
          <Typography variant="body1">MAC </Typography>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* USUARIO */}
          <Box sx={{display:'flex', flexDirection:'column', gap:1, width:'80px', textAlign:'center'}}>
            <Box>
              <Typography>USUARIO</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-simple-select-label">ID</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="Age"
                  onChange={handleChangeSelectUser}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          {/* AREA */}
          <Box sx={{display:'flex', flexDirection:'column', gap:1, width:'80px', textAlign:'center'}}>
            <Box>
              <Typography>ÁREA</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-simple-select-label">ID</InputLabel>
                <Select
                  labelId="area"
                  id="areaId"
                  value={area}
                  label="Age"
                  onChange={handleChangeSelectArea}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          {/* ZONA */}
          <Box sx={{display:'flex', flexDirection:'column', gap:1, width:'80px', textAlign:'center'}}>
            <Box>
              <Typography>ZONA</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-simple-select-label">ID</InputLabel>
                <Select
                  labelId="zona"
                  id="demo-simple-select"
                  value={zona}
                  label="Zona"
                  onChange={handleChangeSelectZona}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
 
        </Box>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
