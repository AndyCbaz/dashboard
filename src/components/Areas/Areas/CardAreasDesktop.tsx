import React, {useState} from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";

import { themeColors } from "../../../helpers/theme/theme.colors";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIdArea, setIdArea, setZonasByAreas } from "../../../features/cliente/clientComboMacgateways";

import { getZonas } from "../../../services/Areas/getZonas";
import { setNombreArea } from "../../../features/todos/search";

interface CardProp {
  index: number;
  nombre: string;
  idarea: string;
  
}

export const CardAreasDesktop: React.FC<CardProp> = ({ index, nombre, idarea }) => {

  
  const dispatch = useAppDispatch();
  const idarearedux = useAppSelector(selectIdArea);
  const handleSaveIdArea = async() => {
    localStorage.setItem("idarea", idarea);
    localStorage.setItem("nombrearea", nombre )
    dispatch(setNombreArea(nombre))
    dispatch(setIdArea(idarea));
    const data = await getZonas(Number(idarea));
    dispatch(setZonasByAreas(data))
    // console.log(idarea)
  };

  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        // boxShadow: 10,
        justifyContent:'center',
        width: "115px",
        height:'80px',
        boxShadow:0,
        background: idarea === idarearedux ? themeColors.GRAY3: themeColors.GRAY,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
      }}
    >
      <CardActionArea
        sx={{ pt: 1, pb: 1.5, px: 2 }}
        onClick={handleSaveIdArea}
      >

        <Box sx={{ display: "flex", flexDirection:'column', }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FmdGoodIcon
              sx={{ width: "30px", height: "30px", color: themeColors.BLUE1 }}
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
            <Typography variant="body1">{nombre}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
