import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Paper, Modal, Divider } from "@mui/material";

import { Grafica } from "./Grafica";
import Typography from "@mui/material/Typography";

import { themeColors } from "../../../helpers/theme/theme.colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ExcelDatos } from "./ExcelDatos";
import { RadialIndicadorTemperatura } from "./IndicadoresRadiales/RadialIndicadorTemperatura";
import { RadialIndicadorHumedad } from "./IndicadoresRadiales/RadialIndicadorHumedad";



export const HomeResultados = () => {
  const navigate = useNavigate();
  const hancleClick = () => navigate("/home");
  const [label, setLabel] = useState("Temperatura");
  const [dataAxios,setDataAxios] = useState([]);
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  
  

  //Estados de las graficas
  const [tempGrap, setTempGraph] = useState(false);
  const [humGrap, setHumGraph] = useState(false);

  //Configuracion Grafica
  const labels = dataAxios.map((e: { id: number; })=>e.id);
  const data = {
    labels,
    datasets: [
      {
        label: "Temperatura",
        data: dataAxios.map((e: {Temperatura: number;})=>e.Temperatura),
        borderColor: themeColors.BLUE1,
        backgroundColor: themeColors.BLUE1,
        yAxisID: "y",
        lineTension: 0.3,
        hidden: tempGrap,
      },
      {
        label: "Humedad",
        data: dataAxios.map((e: {Humedad: number;})=>e.Humedad),
        borderColor: themeColors.GREEN,
        backgroundColor: themeColors.GREEN,
        yAxisID: "y1",
        lineTension: 0.3,
        hidden: humGrap,
      },
    ],
  };

  const optionsChart = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,

    plugins: {
      title: {
        display: true,
        text: "Temperatura y Humedad",
        font: { size: 24 },
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {

      y: {
        type: "linear" as const,
        display: !tempGrap,
        position: "left" as const,
        title:{
          display:true,
          text:'Temperatura',
          font:{
            size: 18
          }
        }

      },
      y1: {
        type: "linear" as const,
        display: !humGrap,
        position: "right" as const,
        title:{
          display:true,
          text:'Humedad',
          font:{
            size: 18
          }
        },
        grid: {
          drawOnChartArea: !humGrap,
        },
      },
    },
    maintainAspectRatio: false,
  };
  //Control Gráfica

  const handleDisplayTemperature = () => {
    setTempGraph(!tempGrap);
  };
  const handleDisplayHumedad = () => {
    setHumGraph(!humGrap);
  };

  //Modal Excel
  const [openModalExcel, setOpenModalExcel] = useState(false);
  const handleOpenModal = () => setOpenModalExcel(true);
  const handleCloseModal = () => setOpenModalExcel(false);

  ////Table Parameters
  // Options
  interface propsOptions {
    filterType: string;
    download: boolean;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    responsive: string;
  }

  //Data Axios
  const getDataTemperatura = async () => {
    try {
      const res = await axios.get("https://retoolapi.dev/b14wCg/data");
      
       setDataAxios(res.data);
       
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getDataTemperatura()
    
  },[]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "solid",
        width: "100%",
      }}
    >
      {/* GRAFICA */}
      {/* Cuadro de Grafica */}
      <Box
        sx={{
          // border: "solid",
          width: "100%",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          p: 2,
          borderRadius: 2,
          background: themeColors.WHITE,
          boxShadow: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* Boton Atras */}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Button
              onClick={() => {
                hancleClick();
              }}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
            >
              Atras
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h4">Registro de Datos</Typography>
          </Box>
        </Box>
        {/* Control de Gráfica */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { sm: "row", xs: "column" },
            // flexGrow: 1,
            m: 2,
            gap: {xs:0.5, sm:8},
            // border: "solid",
          }}
        >
          {/* Cotroles botones  */}
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <Typography>Seleccione un periodo</Typography>
              <ButtonGroup
                variant="outlined"
                aria-label="opciones de grafica"
                sx={{ display: "flex", gap: 1 }}
              >
                <Button
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  3M
                </Button>
                <Button
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  1M
                </Button>
                <Button
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  1S
                </Button>
                <Button
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  7D
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ display: { sm: "block", xs: "none" } }}
          />
          <Divider sx={{ display: { xs: "block", sm: "none" } }} />

          {/* Controles fechas */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography>Seleccione una Fecha</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 2, sm: 4 },
                // flexDirection: { xs: "column", sm: "row" },
                flexGrow: 2,
                // border:'solid'
              }}
            >
              <Box sx={{ display: "flex", height: "70%" }}>
                <Button>Buscar</Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { sm: "row", xs: "column" },
                  gap: 1,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ display: "flex" }}
                    components={["DateTimePicker"]}
                  >
                    <Box>
                      <DateTimePicker
                        label="Fecha Inicial"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </Box>
                  </DemoContainer>
                  <DemoContainer
                    sx={{ display: "flex" }}
                    components={["DateTimePicker"]}
                  >
                    <Box>
                      <DateTimePicker
                        label="Fecha Final"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </Box>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Grafica */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            // alignItems: "stretch",
            // border:'solid',
            // flexGrow: 1,
            gap:4,
            width: "100%",
          }}
        >
          {/* Informacion grafica */}
          <Box
            sx={{
              display: "flex",
              p: 2,
              flexDirection: "column",
              boxShadow: 2,
              borderRadius: 2,
              
              // border:'solid'
            }}
          >
            <Box sx={{ textAlign: "center", pb: 1 }}>
              <Typography variant="h5">Información</Typography>
            </Box>
            {/* Botones */}
            <Box sx={{ display: "flex", justifyContent:'center',gap: 3, pb: 1 }}>
              {/* Boton Temperatura */}
              <Box>
                <Button
                  onClick={handleDisplayTemperature}
                  sx={{
                    background: !tempGrap
                      ? themeColors.BLUE1
                      : themeColors.GRAY,
                    transform: !tempGrap ? "scale3d(1.05, 1.05, 1)" : "none",
                    "&:hover": {
                      transform: "scale3d(1.05, 1.05, 1)",
                      background: themeColors.BLUE1,
                    },
                  }}
                >
                  Temperatura
                </Button>
              </Box>
              {/* Boton Humedad */}
              <Box>
                <Button
                  onClick={handleDisplayHumedad}
                  sx={{
                    background: !humGrap ? themeColors.GREEN : themeColors.GRAY,
                    transform: !humGrap ? "scale3d(1.05, 1.05, 1)" : "none",
                    "&:hover": {
                      transform: "scale3d(1.05, 1.05, 1)",
                      background: themeColors.GREEN,
                    },
                  }}
                >
                  Humedad
                </Button>
              </Box>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box sx={{gap:1, display:'flex', flexDirection:{sm:'column', xs:'row'}}}>
            {/* Datos de Temperatura */}
              <Box
                sx={{
                  display: "flex",
                  py: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <RadialIndicadorTemperatura
                    valor={25}
                    circleWidth={105}
                    unidad="°C"
                  />
                </Box>
                {/* Texto Resumen Card */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    gap: 1.5,
                    // border: "solid",
                  }}
                >
                  {/* MAXIMO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    22°C <br />{" "}
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      MÁXIMO
                    </span>
                  </Typography>
                  {/* MINIMO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    48°C <br />
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      MÍNIMO
                    </span>
                  </Typography>
                  {/* PROMEDIO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    50°C <br />{" "}
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      PROMEDIO
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{display:{xs:'none', sm:'block'}}}/>
              <Divider orientation="vertical" sx={{display:{xs:'block', sm:'none'}}}/>
              {/* Datos de Humedad */}
              <Box
                sx={{
                  display: "flex",
                  py: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <RadialIndicadorHumedad
                    valor={30}
                    circleWidth={105}
                    unidad="%"
                  />
                </Box>
                {/* Texto Resumen Card */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    gap: 1.5,
                    // border: "solid",
                  }}
                >
                  {/* MAXIMO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    40% <br />{" "}
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      MÁXIMO
                    </span>
                  </Typography>
                  {/* MINIMO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    35% <br />
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      MÍNIMO
                    </span>
                  </Typography>
                  {/* PROMEDIO */}
                  <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
                    38% <br />{" "}
                    <span
                      style={{
                        fontSize: "12px",
                        color: themeColors.DARKGRAY,
                      }}
                    >
                      {" "}
                      PROMEDIO
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            {/* Boton de Ver Datos*/}
            <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
              <Button
                onClick={() => {
                  handleOpenModal();
                }}
              >
                Ver Datos
              </Button>
            </Box>
          </Box>
          {/* Grafica  */}
          <Box
            sx={{
              width: {sm:"60%",xs:"99%"},
              height:{sm:'100%',xs:'300px'},
              // border: "solid",
              display: "flex",
              justifyContent: "center",
              boxShadow: 4,
              // mx: 4,
              borderRadius: 2,
              p: 2,
            }}
          >
            <Grafica data={data} options={optionsChart} />
          </Box>
        </Box>
      </Box>
      <Modal
        open={openModalExcel}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 8,
            my: 4,
            width: { xs: "95%", sm: "75%" },
            ml: { xs: "2%", sm: "15%" },
          }}
        >
          <ExcelDatos label={label} />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
