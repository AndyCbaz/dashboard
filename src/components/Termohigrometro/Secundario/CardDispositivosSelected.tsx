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
import { useAppDispatch } from "../../../app/hooks";
import {
  setDataResultConsulta,
  setDataResultDevice,
  setDataMaxMinGraf,
} from "../../../features/userResultsSlice";
//time
import date from "date-and-time";

interface CardProp {
  idmac: number;
  iddispositivo: number;
  state: number;
  nombre: string;
  senial: number;
  dataT: boolean;
  dataH: boolean;
  zona: string;
  bateria: number;
  actualTemp: string;
  actualHum: string;
  tmax: string;
  tmin: string;
  tprom: string;
  hmax: string;
  hmin: string;
  hprom: string;
  tmaxgraf: number;
  tmingraf: number;
  hmaxgraf: number;
  hmingraf: number;
}

export const CardDispositivosSelected: React.FC<CardProp> = ({
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
  tmaxgraf,
  tmingraf,
  hmaxgraf,
  hmingraf,
}) => {
  const dispatch = useAppDispatch();

  const handleClickAPIResult = () => {
    // Formato de fechas y horas sin modificacion de hora ===>>>
    let fechautc = date.format(new Date(), "YYYY/MM/DD", true);
    let formatUTC = date.parse(fechautc, "YYYY/MM/DD");
    let fechaEcuador = date.addHours(formatUTC, 0);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    dispatch(
      setDataResultConsulta({ idgateway: idmac, iddispositivo: iddispositivo })
    );
    //Almacenar valores de ultimo dispositivo para refresh
    localStorage.setItem("idgateway", String(idmac));
    localStorage.setItem("iddispositivo", String(iddispositivo));
    localStorage.setItem("tmax", String(tmaxgraf));
    localStorage.setItem("tmin", String(tmingraf));
    localStorage.setItem("hmax", String(hmaxgraf));
    localStorage.setItem("hmin", String(hmingraf));
    localStorage.setItem("actualTemp", String(actualTemp));
    localStorage.setItem("actualHum", String(actualHum));
    localStorage.setItem("nombredevice",String(nombre))
    ///
    dispatch(
      setDataMaxMinGraf({
        tmax: tmaxgraf,
        tmin: tmingraf,
        hmax: hmaxgraf,
        hmin: hmingraf,
        actualTemp: actualTemp,
        actualHum: actualHum,
      })
    );

    getDataDevicesDetalle(
      idmac,
      iddispositivo,
      `${year}-${month}-${day} 08:00:00`,
      `${year}-${month}-${day} 17:00:00`
    ).then((data) => {
      // console.log(data);
      dispatch(setDataResultDevice(data));
    });
  };

  let senial_format = Number(senial);
  if (senial !== null) {
    senial_format = Number((senial + 100).toFixed(0));
  }

  let bateria_format = Number(bateria);
  if (bateria === null) {
    bateria_format = 0;
  }

  return (
    <>
      {/* Card si existe datos */}
      {dataH && dataT ? (
        <Card
          sx={{
            display: "flex",
            
            boxShadow: 10,
            borderRadius: 4,
            "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 1,
              pb: 1.5,
              px: 2,
            }}
            onClick={handleClickAPIResult}
            component={Link}
            to="/home/resultados"
          >
            {/* Area de Indicadores Visuales */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                m: 0.5,
              }}
            >
              {/* Indicador de dipositivo conectado o desconectado */}
              <Box sx={{ flexGrow: 1, pl: 2, display: "flex" }}>
                <CircleIcon
                  sx={{
                    color: state !== 1 ? themeColors.RED3 : themeColors.GREEN,
                    borderRadius: 4,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                {/* Indicador de Bateria */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <BatteryLevel value={bateria_format} />
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
                  <RatingCustom value={senial_format} />
                </Box>
              </Box>
            </Box>
            {/* Contenido de Card */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // border: "solid",
                height: "180px",
              }}
            >
              {/* Label */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  p: 0.8,
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
              <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
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
                          {parseInt(tmax).toFixed(2)}°C <br />{" "}
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
                          {parseInt(tmin).toFixed(2)}°C <br />
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
                          {parseInt(tprom).toFixed(2)}°C <br />{" "}
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
                          valor={Number(parseFloat(actualTemp).toFixed(0))}
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
                      <Typography sx={{ display: "flex" }}>
                        Información
                      </Typography>
                      <Typography sx={{ display: "flex" }}>no</Typography>
                      <Typography sx={{ display: "flex" }}>
                        Disponible
                      </Typography>
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
                          {parseInt(hmax).toFixed(2)}% <br />{" "}
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
                          {parseInt(hmin).toFixed(2)}% <br />
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
                          {Number(hprom).toFixed(2)}% <br />{" "}
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
                          valor={Number(parseInt(actualHum).toFixed(0))}
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
                        height: "110px",
                        // border:'solid',
                      }}
                    >
                      <Typography sx={{ display: "flex" }}>
                        Información
                      </Typography>
                      <Typography sx={{ display: "flex" }}>no</Typography>
                      <Typography sx={{ display: "flex" }}>
                        Disponible
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      ) : (
        <Card
        sx={{
          display: "flex",
          boxShadow: 10,
          borderRadius: 4,
          "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
          
        }}
      >
        <CardActionArea
          sx={{ display: "flex", flexDirection: "column", pt: 1, pb: 1.5, px: 2 }}
          onClick={handleClickAPIResult}
        >
          {/* Area de Indicadores Visuales */}
          <Box
            sx={{ display: "flex", width: "100%", alignItems: "center", m: 0.5 }}
          >
            {/* Indicador de dipositivo conectado o desconectado */}
            <Box sx={{ flexGrow: 1, pl: 2, display: "flex" }}>
              <CircleIcon
                sx={{
                  color: state !== 1 ? themeColors.RED3 : themeColors.GREEN,
                  borderRadius: 4,
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {/* Indicador de Bateria */}
              <Box
                sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              >
                <BatteryLevel value={bateria_format} />
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
                <RatingCustom value={senial_format} />
              </Box>
            </Box>
          </Box>
          {/* Contenido de Card */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "solid",
              height:'180px'
            }}
          >
            {/* Label */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                p: 0.8,
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
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
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
                        {parseInt(tmax).toFixed(2)}°C <br />{" "}
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
                        {parseInt(tmin).toFixed(2)}°C <br />
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
                        {parseInt(tprom).toFixed(2)}°C <br />{" "}
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
                        valor={Number(parseFloat(actualTemp).toFixed(0))}
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
                        {parseInt(hmax).toFixed(2)}% <br />{" "}
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
                        {parseInt(hmin).toFixed(2)}% <br />
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
                        {Number(hprom).toFixed(2)}% <br />{" "}
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
                        valor={Number(parseInt(actualHum).toFixed(0))}
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
                      height: "110px",
                      // border:'solid',
                      
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
      )}
    </>
  );
};