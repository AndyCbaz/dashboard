import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CardVariables } from "./CardVariables";
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

const data = {
  labels: ["1", "2 ", "3", "4", "5"],
  datasets: [
    {
      labels: "Temperatura",
      data: [20, 25, 23, 22, 41],
      backgroundColor: "aqua",
      borderColor: "#3be1ac",
      pointBorderColor: "black",
    },
  ],
};

const optionsChart = {
  plugins: {
    legend: true,
  },
  scales: {
    // yAxes: [
    //   {
    //     ticks: {
    //       beginAtZero: true,
    //     },
    //   },
    // ],
  },
  responsive: true,
  maintainAspectRatio: false,
};

export const HomeResultados = () => {
  const navigate = useNavigate();
  const hancleClick = () => navigate("/");
  const [label, setLabel] = useState("Temperatura");
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "solid",
        width: "100%",
      }}
    >
      {/* Boton Atras */}
      <Box sx={{ display: "flex", pb: 1 }}>
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

      {/* GRAFICA */}
      {/* Cuadro de Grafica */}
      <Box
        sx={{
          // border: "solid",
          width: "100%",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          px: 2,
          borderRadius: 2,
          background: themeColors.WHITE,
          boxShadow: 4,
        }}
      >
        {/* Control de Gráfica */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // flexGrow: 1,
            pb: 3,
            // border: "solid",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="h4">Registro de Datos</Typography>
          </Box>

          {/* Cotroles botones  */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          {/* Controles fechas */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 8 },
              flexDirection: { xs: "column", sm: "row" },
              // border:'solid'
            }}
          >
            <Box sx={{display:'flex', height:'70%'}}><Button>Buscar</Button></Box>
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
        {/* Grafica */}
        <Box
          sx={{
            // border: "solid",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            // justifyContent: "space-between",
            // flexGrow: 1,
            width: "100%",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 1,
              flexDirection: "column",
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography>Información</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
              {/* Boton Temperatura */}
              <Box>
                <Button>Temperatura</Button>
              </Box>
              {/* Boton Humedad */}
              <Box>
                <Button>Humedad</Button>
              </Box>
            </Box>
            <Divider />
            {/* Datos de Temperatura */}
            <Box sx={{ display: "flex", py: 1, justifyContent:'center',alignItems:'center' }}>
              <Box >
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
            </Box>
            <Divider />
            {/* Datos de Humedad */}
            <Box sx={{ display: "flex", py: 1, justifyContent:'center',alignItems:'center' }}>
              <Box >
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
                  35%C <br />
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
            </Box>
            <Divider />
            {/* Boton de Descargar */}
            <Box sx={{ display: "flex", justifyContent: "center", py:2 }}>
              <Button
                onClick={() => {
                  handleOpenModal();
                }}
              >
                Ver Datos
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              border: "solid",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Grafica data={data} options={optionsChart} /> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                // border: "solid",
                alignItems: "center",
              }}
            >
              <Typography>Aqui va la gráfica</Typography>
            </Box>
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
            width: { xs: "75%", sm: "50%" },
            ml: { xs: "15%", sm: "25%" },
          }}
        >
          <ExcelDatos label={label} />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
