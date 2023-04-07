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

export const NewZone = () => {
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
          Agregar Zona
        </Typography>
        <Divider />
        {/* INPUT NOMBRE */}
        <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
          <Typography variant="body1">NOMBRE </Typography>
        </Box>
        <Input
          sx={{
            px: 1,
            background: themeColors.GRAY,
            borderRadius: 4,
            border: "solid",
            borderColor: themeColors.BLUE1,
          }}
          id="input-search"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <ConstructionIcon />
            </InputAdornment>
          }
        />
        {/* INPUT AREA */}

        <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
          <Typography variant="body1">ÁREA: </Typography>
        </Box>
        <Input
          sx={{
            px: 1,
            background: themeColors.GRAY,
            borderRadius: 4,
            border: "solid",
            borderColor: themeColors.BLUE1,
          }}
          id="input-search"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <HomeRepairServiceIcon />
            </InputAdornment>
          }
        />
        {/* INPUT GATEWAY */}
        <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
          <Typography variant="body1">Gateway: </Typography>
        </Box>
        <Input
          sx={{
            px: 1,
            background: themeColors.GRAY,
            borderRadius: 4,
            border: "solid",
            borderColor: themeColors.BLUE1,
          }}
          id="input-search"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <CellTowerIcon />
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
        >
          Guardar
        </Button>
      </Box>
    </React.Fragment>
  );
};
