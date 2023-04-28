import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { themeColors } from "../../../helpers/theme/theme.colors";
import CircleIcon from "@mui/icons-material/Circle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface CardProp {
  state: number;
  usuario: string;
  index: string;
}
export const CardByUser: React.FC<CardProp> = ({ state, usuario, index }) => {
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
      <CardActionArea
        sx={{ pt: 0.5, pb: 0.5, px: 2 }}
        component={Link}
        to={"/home/settings/usuarios"}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box>
            <PeopleAltIcon
              sx={{ color: themeColors.BLUE1, width: 50, height: 50 }}
            />
          </Box>
          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography>{usuario.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start", gap: 1 }}>
              <CircleIcon
                sx={{
                  color: state !== 1 ? themeColors.RED3 : themeColors.GREEN,
                  borderRadius: 4,
                }}
              />
              <Typography>{state == 1 ? "Activo" : "Desconectado"}</Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
