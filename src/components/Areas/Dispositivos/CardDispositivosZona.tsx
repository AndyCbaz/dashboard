import React from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import {  Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";


import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import { Link } from "react-router-dom";
import { themeColors } from "../../../helpers/theme/theme.colors";

interface CardProp {
  index: number;
  state: boolean;
}

export const CardDispositivosZona: React.FC<CardProp> = ({ index, state }) => {
  return (
    <Card
    key={index}
    sx={{
      display: "flex",
      boxShadow: 10,
      borderRadius: 4,
      "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },

    }}
  >
    <CardActionArea component={Link} to="/home/" sx={{ pt:1,pb:1.5,px:2}}>
      <Box>
        <CircleIcon
          sx={{
            color: state ? themeColors.RED3 : themeColors.GREEN,
            borderRadius: 4,
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <DevicesOtherIcon
          sx={{ width: "50px", height: "50px", color: themeColors.BLUE1 }}
        />
      </Box>
      <Box>
        <Typography>MAC Dispositivo: PB</Typography>
      </Box>
      <Box>
        <Typography>MAC Gateway : 1</Typography>
      </Box>
    </CardActionArea>
  </Card>
  );
};
