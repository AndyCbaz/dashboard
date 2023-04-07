import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CardVariables } from "./CardVariables";
import { Button, ButtonGroup } from "@mui/material";

import { Grafica } from "./Grafica";
import Typography from "@mui/material/Typography";

import { themeColors } from "../../../helpers/theme/theme.colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MUIDataTable from "mui-datatables";

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

const options = {
  plugins: {
    legend: true,
  },
  scales: {
    y: {
      // min: 3,
      // max: 6,
    },
  },
  responsive: true,
};

export const HomeResultados = () => {
  const navigate = useNavigate();
  const hancleClick = () => navigate("/");
  const [label, setLabel] = useState("Temperatura");
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  ////Table Parameters
  // Options
  interface propsOptions {
    filterType: string,
    download: boolean,
    rowsPerPage: number,
    rowsPerPageOptions: number[],
    responsive: string,
  }
  const options: any = {
    filterType: "multiselect",
    download: false,
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 25, 100],
    responsive: "standard",
  };
  //Columns
  const columns = [
    { name: label, label: label, option: { filter: true, sort: false } },
    { name: "fecha", label: "Fecha", option: { filter: true, sort: true } },
    { name: "Hora", label: "Cédula", option: { filter: true, sort: false } },
    // { name: "peso", label: "Peso", option: { filter: true, sort: true } },
  ];
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
      <Box
        sx={{
          display: "flex",
          height: "100%",
          // gap: 3,
          flexDirection: "column",
          // border: "solid",
        }}
      >
        {/* Cuadro de Grafica */}
        <Box
          sx={{
            // border: "solid",
            width: '100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "stretch",
            px: 2,
            borderRadius: 2,
            background: themeColors.WHITE,
            boxShadow: 4,
          }}
        >
          {/* Card de Variables */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              pt: 2,
              // width: { sm: "50px", xs: "450px" },
              // border: "solid",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CardVariables
                variable="Temperatura"
                valor={25}
                unidad="°C"
                setLabel={setLabel}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <CardVariables
                variable="Humedad"
                valor={18}
                unidad="%"
                setLabel={setLabel}
              />
            </Box>
          </Box>
          {/* Control de Gráfica */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 3,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4">Registro de {label}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // border: "solid",
                width: "100%",
              }}
            >
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
                  alignItems: 'center',
                  gap: {xs:2, sm:8},
                  flexDirection: {xs: 'column', sm:'row'},
                  py: 2,
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

          <Grafica data={data} options={options} />
          
          <Box sx={{my:2}}>
            {" "}
            <MUIDataTable
              title={label}
              data={[{}]}
              columns={columns}
              options={options}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
