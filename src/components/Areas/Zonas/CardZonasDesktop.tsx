import React from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { CardActionArea, Divider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { themeColors } from "../../../helpers/theme/theme.colors";
import DomainIcon from "@mui/icons-material/Domain";
import { Link } from "react-router-dom";
import { getDevicesByZonas } from "../../../services/Areas/getDevicesByZonas";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectIdZona,
  setDevicesByZonas,
  setIdZona,
} from "../../../features/cliente/clientComboMacgateways";

interface CardProp {
  index: number;
  nombre: string;
  idzona: string;
}

export const CardZonasDesktop: React.FC<CardProp> = ({
  index,
  nombre,
  idzona,
}) => {
  const dispatch = useAppDispatch();
  const idzonaredux = useAppSelector(selectIdZona);
  const handledevicesbyzona = async () => {
    localStorage.setItem("idzona", idzona);
    localStorage.setItem("nombrezona",nombre)
    dispatch(setIdZona(idzona));
    const data = await getDevicesByZonas(Number(idzona));
    if (data !== undefined) {
      dispatch(setDevicesByZonas(data));
      // console.log(data)
    }
  };

  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        width: "118px",
        background:
          idzona === idzonaredux ? themeColors.GRAY3 : themeColors.GRAY,
        // boxShadow: 10,
        boxShadow:0,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
      }}
    >
      <CardActionArea
        onClick={handledevicesbyzona}
        sx={{ pt: 1, pb: 1.5, px: 2 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DomainIcon
            sx={{ width: "50px", height: "50px", color: themeColors.BLUE1 }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography> {nombre}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
