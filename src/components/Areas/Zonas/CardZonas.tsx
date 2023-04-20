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
  state: boolean;
}

export const CardZonas: React.FC<CardProp> = ({ index, state }) => {
  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        boxShadow: 10,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
        pt: 1,
        pb: 1.5,
        px: 2,
      }}
    >
      <CardActionArea component={Link} to='/home/areas/zonas/dispositivos'>
        <Box>
          <CircleIcon
            sx={{
              color: state ? themeColors.RED3 : themeColors.GREEN,
              borderRadius: 4,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DomainIcon
            sx={{ width: "50px", height: "50px", color: themeColors.BLUE1 }}
          />
        </Box>
        <Box>
          <Typography>Nombre: Bodega</Typography>
        </Box>
        <Box>
          <Typography>Id: 1</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
