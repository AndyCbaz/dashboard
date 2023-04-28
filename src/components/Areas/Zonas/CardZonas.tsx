import React from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { CardActionArea, Divider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { themeColors } from "../../../helpers/theme/theme.colors";
import DomainIcon from "@mui/icons-material/Domain";
import { Link } from "react-router-dom";

interface CardProp {
  index: number;
  nombre: string;
}

export const CardZonas: React.FC<CardProp> = ({ index, nombre }) => {
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
      <CardActionArea component={Link} to='/home/areas/zonas/dispositivos' sx={{ pt:1,pb:1.5,px:2}}>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DomainIcon
            sx={{ width: "50px", height: "50px", color: themeColors.BLUE1 }}
          />
        </Box>
        <Box>
          <Typography> {nombre}</Typography>
        </Box>
  
      </CardActionArea>
    </Card>
  );
};
