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
import { getDataDevicesDetalle } from "../../../services/Results/getDataDeviceDetalle";
// Redux
import {  useAppDispatch } from "../../../app/hooks";
import { setDataResultDevice } from "../../../features/clientApiDataSlice";

interface CardProp {
  idmac: number;
  iddispositivo:number;
  state: number;
  nombre: string;
  senial:number;
  dataT: boolean;
  dataH: boolean;
  zona:string;
  bateria:number;
  actualTemp:number;
  actualHum: number;
  tmax: number| null ;
  tmin: number | null;
  tprom: number | null;
  hmax: number | null;
  hmin: number | null;
  hprom: number | null;
}

export const CardDispositivos: React.FC<CardProp> = ({
  iddispositivo,
  idmac,
  nombre,
  bateria,
  senial,
  state,
  dataT,
  dataH,
  zona,
  actualTemp,
  actualHum,
  tmax,
  tmin,
  tprom,
  hmax,
  hmin,
  hprom,
}) => {
 const dispatch = useAppDispatch();
  const handleClickAPIResult = () => {
    getDataDevicesDetalle(idmac,iddispositivo)
    .then((data)=>{dispatch(setDataResultDevice(data))})
  }

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 10,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)",  },
        // pt: 1,
        // pb: 1.5,
        // px: 2,
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", pt:1,pb:1.5,px:2 }}
        onClick={handleClickAPIResult}
        component={Link}
        to="/home/resultados"
      >
        {/* Area de Indicadores Visuales */}
        <Box
          sx={{ display: "flex", width: "100%", alignItems: "center", m: 0.5 }}
        >
          {/* Indicador de dipositivo conectado o desconectado */}
          <Box sx={{ flexGrow: 1, pl: 2, display: "flex" }}>
            <CircleIcon
              sx={{
                color: state!==1 ? themeColors.RED3 : themeColors.GREEN,
                borderRadius: 4,
              }}
            />
          </Box>
          <Box sx={{display:'flex'}}>
            {/* Indicador de Bateria */}
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <BatteryLevel value={bateria} />
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
              <RatingCustom value={senial} />
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
              p:0.8
            }}
          >
            <Box sx={{ display: "flex", flexGrow: 1, pl: 1 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {nombre}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexGrow: 2 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {zona}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {/* Contenedor de Variables */}
          <Box sx={{ display: "flex", justifyContent: "center", gap:0.5 }}>
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
                      {tmax}°C <br />{" "}
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
                      {tmin}°C <br />
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
                      {tprom}°C <br />{" "}
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
                      valor={actualTemp}
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
                      {hmax}% <br />{" "}
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
                      {hmin}% <br />
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
                      {hprom}% <br />{" "}
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
                      valor={actualHum}
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
