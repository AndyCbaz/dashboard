import React from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { themeColors } from "../../helpers/theme/theme.colors";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIdMacGateway, setDevicesByGateways, setIdArea, setIdMacGateways, setZonasByAreas } from "../../features/cliente/clientComboMacgateways";
import DnsIcon from '@mui/icons-material/Dns';

import { getZonas } from "../../services/Areas/getZonas";
import { getDevicesByGateways } from "../../services/Gateways/getDeviceByGateway";

interface CardProp {
  index: number;
  nombre: string;
  
}

export const CardGateways: React.FC<CardProp> = ({ index, nombre }) => {
  const dispatch = useAppDispatch();
  const idmacgaetway = useAppSelector(selectIdMacGateway)
const handleSaveNewGateway = () => {
  dispatch(setIdMacGateways(index))
  getDevicesByGateways(index)
  .then((data)=>{
    if(data!==undefined){
      dispatch(setDevicesByGateways(data))
    }
  })
  
}

  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        background: index === idmacgaetway ? themeColors.GRAY3: themeColors.GRAY,
        boxShadow: 0,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
      }}
    >
      <CardActionArea
        // component={Link}
        // to="/home/areas/zonas"
        sx={{ pt: 1, pb: 1.5, px: 2 }}
        onClick={handleSaveNewGateway}
      >

        <Box sx={{ display: "flex", width: "100px", flexDirection:'column' }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DnsIcon
              sx={{ width: "40px", height: "40px", color: themeColors.BLUE1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">{nombre}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};