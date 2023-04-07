import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { themeColors } from "../../../helpers/theme/theme.colors";
import CircleIcon from "@mui/icons-material/Circle";
import RatingCustom from "./Rating";
import IndicadorHorizontal from "./IndicadorHorizontal";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ShowerIcon from '@mui/icons-material/Shower';

interface CardProp {
  index: number;
}

export const CardDispositivos: React.FC<CardProp> = ({ index }) => {
  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        boxShadow: 10,
        borderRadius: 3,
        width: { xs: "90%", sm: "45%" },
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", mt:1 }}
        component={Link}
        to="/resultados"
      >
        {/* Area de Indicadores Visuales */}
        <Box sx={{ display: "flex", width: "100%", alignItems: 'center' }}>
          {/* Indicador de dipositivo conectado o desconectado */}
          <Box sx={{ flexGrow: 1,pl:2, display: 'flex' }}>
            <CircleIcon sx={{ color: themeColors.RED2, borderRadius: 4 }} />
          </Box>
          {/* Indicador de Señal */}
          <Box sx={{ flexGrow: 1, pr:2, display:'flex', justifyContent:'end', alignItems: 'center' }}>
            <RatingCustom value={1} />
          </Box>
        </Box>
        {/* Contenido de Card */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "solid",
          }}
        >
          {/* Label */}
          <Box>
            <Typography variant="h5">Termohigrómetro</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Zona </Typography>
          </Box>
          <Divider/>
          {/* Variable Temeratura */}
          <Box
            sx={{
              // border: "solid",
              p: 0.5,
              display: "flex",
              flexDirection: " column",
              // border:'solid',
              gap: 0.5,
            }}
          >
            <Box sx={{display:'flex', alignItems:'center'}}>
            <Typography sx={{flexGrow: 1}}>Temperatura </Typography>
            <DeviceThermostatIcon /> 
            </Box>
            <IndicadorHorizontal
              maxValue={100}
              currentValue={25}
              color={themeColors.BLUE1}
              unidad="°C"
            />
            {/* <Box> */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  px: 2,
                  py:1,
                }}
              >
                <Typography variant="h5" sx={{ lineHeight: 0.6 }}>
                  22°C <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    MÁXIMO
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ p: 0, m: 0, t: 2, lineHeight: 0.6 }}
                >
                  48°C <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    MÍNIMO
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ p: 0, m: 0, t: 2, lineHeight: 0.6 }}
                >
                  50°C <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    PROMEDIO
                  </span>
                </Typography>
              </Box>
            {/* </Box> */}
          </Box>
          <Divider/>
          {/* Variable Humedad */}
          <Box
            sx={{
              // border: "solid",
              p: 0.5,
              display: "flex",
              flexDirection: " column",
              gap: 0.5,
            }}
          >
            <Box sx={{display:'flex', alignItems:'center'}}>
            <Typography sx={{flexGrow: 1}}>Humedad</Typography>
            <ShowerIcon />
            </Box>
            <IndicadorHorizontal
              maxValue={100}
              currentValue={58}
              color={themeColors.GREEN}
              unidad='%'
            />
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  p: 2,
                  px: 2,
                  py:0.5,
                  // border: "solid",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ p: 0, m: 0, t: 2, lineHeight: 0.6 }}
                >
                  52% <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    MÁXIMO
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ p: 0, m: 0, t: 2, lineHeight: 0.6, flexGrow: 1 }}
                >
                  48% <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    MÍNIMO
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ p: 0, m: 0, t: 2, lineHeight: 0.6 }}
                >
                  50% <br />{" "}
                  <span
                    style={{ fontSize: "11px", color: themeColors.DARKGRAY }}
                  >
                    {" "}
                    PROMEDIO
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
