import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { themeColors } from "../../../helpers/theme/theme.colors";
import CircleIcon from "@mui/icons-material/Circle";
import RatingCustom from "./Rating";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ShowerIcon from "@mui/icons-material/Shower";
import { BatteryLevel } from "./BatteryLevel";
import { RadialIndicadorTemperatura } from "./IndicadoresRadiales/RadialIndicadorTemperatura";
import { RadialIndicadorHumedad } from "./IndicadoresRadiales/RadialIndicadorHumedad";

interface CardProp {
  index: number;
  state: boolean;
  dataT: boolean;
  dataH: boolean;
}

export const CardDispositivos: React.FC<CardProp> = ({
  index,
  state,
  dataT,
  dataH,
}) => {
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
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column" }}
        component={Link}
        to="/resultados"
      >
        {/* Area de Indicadores Visuales */}
        <Box
          sx={{ display: "flex", width: "100%", alignItems: "center", m: 0.5 }}
        >
          {/* Indicador de dipositivo conectado o desconectado */}
          <Box sx={{ flexGrow: 1, pl: 2, display: "flex" }}>
            <CircleIcon
              sx={{
                color: state ? themeColors.RED3 : themeColors.GREEN,
                borderRadius: 4,
              }}
            />
          </Box>
          <Box sx={{display:'flex'}}>
            {/* Indicador de Bateria */}
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <BatteryLevel value={95} />
            </Box>
            {/* Indicador de Señal */}
            <Box
              sx={{
                flexGrow: 1,
                pr: 2,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <RatingCustom value={100} />
            </Box>
          </Box>
        </Box>
        {/* Contenido de Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "solid",
          }}
        >
          {/* Label */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box sx={{ display: "flex", flexGrow: 1, pl: 1 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Termohigrómetro
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexGrow: 2 }}>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Zona{" "}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {/* Contenedor de Variables */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* Variable Temperatura */}
            <Box
              sx={{
                display: "flex",
                flexDirection: " column",
                // border: "solid",
                gap: 1,
                p: 0.5,
              }}
            >
              {/* Variable Label */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>Temperatura </Typography>
                <DeviceThermostatIcon />
              </Box>
              {/* Resumen de Variable */}
              {dataT ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.4,
                    // border: "solid",
                    width: "135px",
                  }}
                >
                  {/* Texto Resumen Card */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      alignItems: "center",
                      gap: 2,
                      // border: "solid",
                    }}
                  >
                    {/* MAXIMO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      22°C <br />{" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        MÁXIMO
                      </span>
                    </Typography>
                    {/* MINIMO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      48°C <br />
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        MÍNIMO
                      </span>
                    </Typography>
                    {/* PROMEDIO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      50°C <br />{" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        PROMEDIO
                      </span>
                    </Typography>
                  </Box>
                  {/* Indicador Circular  Resumen*/}
                  <Box sx={{ display: "flex", alignItems: " center" }}>
                    <RadialIndicadorTemperatura
                      valor={59}
                      circleWidth={70}
                      unidad="°C"
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "135px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ display: "flex" }}>Información</Typography>
                  <Typography sx={{ display: "flex" }}>no</Typography>
                  <Typography sx={{ display: "flex" }}>Disponible</Typography>
                </Box>
              )}
            </Box>
            {/* Linea divisora vertical*/}
            <Divider orientation="vertical" />
            {/* Variable Humedad */}
            <Box
              sx={{
                display: "flex",
                flexDirection: " column",
                // border: "solid",
                gap: 1,
                p: 0.5,
              }}
            >
              {/* Variable Label */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // border: "solid",
                  // height: "100%",
                }}
              >
                <Typography>Humedad </Typography>
                <ShowerIcon />
              </Box>
              {/* Resumen de Variable */}
              {dataH ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.4,
                    width: "135px",
                    // border: "solid",
                  }}
                >
                  {/* Texto Resumen Card */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      alignItems: "center",
                      gap: 2,
                      // border: "solid",
                    }}
                  >
                    {/* MAXIMO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      40% <br />{" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        MÁXIMO
                      </span>
                    </Typography>
                    {/* MINIMO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      35% <br />
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        MÍNIMO
                      </span>
                    </Typography>
                    {/* PROMEDIO */}
                    <Typography variant="body2" sx={{ lineHeight: 0.9 }}>
                      38% <br />{" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: themeColors.DARKGRAY,
                        }}
                      >
                        {" "}
                        PROMEDIO
                      </span>
                    </Typography>
                  </Box>
                  {/* Indicador Circular  Resumen*/}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: " center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <RadialIndicadorHumedad
                      valor={28}
                      circleWidth={70}
                      unidad="%"
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "135px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ display: "flex" }}>Información</Typography>
                  <Typography sx={{ display: "flex" }}>no</Typography>
                  <Typography sx={{ display: "flex" }}>Disponible</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
