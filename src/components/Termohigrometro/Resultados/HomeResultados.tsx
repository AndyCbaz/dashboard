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
//toast
import Toast from "../../../components/Toast/Toast";
import { toast } from "react-toastify";
//redux
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectDataResultDevice,
  selectDatosResultConsulta,
  setDataResultDevice,
  selectDatosMaxMinGraf
} from "../../../features/userResultsSlice";
import {
  selectSearchDisplayState,
  setSearchDisplayState,
} from "../../../features/headerDisplay";
//time
import date from "date-and-time";
import { getDataDevicesDetalle } from "../../../services/Results/getDataDeviceDetalle";
import { setDataUsuario } from "../../../features/userSlice";
import { setDevicesResumen, setUserDataGlobal } from "../../../features/userDataSlice";

export const HomeResultados = () => {
  //redux
  const dispatch = useAppDispatch();
  const dataResult = useAppSelector(selectDataResultDevice);
  const dataConsulta = useAppSelector(selectDatosResultConsulta);
  const datagrapinfo = useAppSelector(selectDatosMaxMinGraf);
  const searchDisplayState = useAppSelector(selectSearchDisplayState);

  //react router dom
  const navigate = useNavigate();
  const hancleClick = () => {
    navigate("/home");
    dispatch(setDataUsuario([]));
    dispatch(setUserDataGlobal([]));
    dispatch(setDevicesResumen([]));
  };

  //formato fecha datos recibidos
  // Formato de fechas y horas sin modificacion de hora ===>>>
  let fechautc = date.format(new Date(), "YYYY/MM/DD", true);
  let formatUTC = date.parse(fechautc, "YYYY/MM/DD");
  let fechaEcuador = date.addHours(formatUTC, 0);
  let year = date.format(fechaEcuador, "YYYY");
  let month = date.format(fechaEcuador, "MM");
  let day = date.format(fechaEcuador, "DD");
  // console.log(formatUTC)
  // Fecha inicial desde calendarios
  const [fechaInicialEdit, setFechaInicialEdit] = useState<string>(
    `${year}-${month}-${day} 08:00:00`
  );
  const [valueInicialDate, setValueInicialDate] = useState<Dayjs | null>(
    dayjs(fechaInicialEdit)
  );
  // Fecha final desde calendario
  const [fechaFinalEdit, setFechaFinalEdit] = useState<string>(
    `${year}-${month}-${day} 17:00:00`
  );
  const [valueFinalDate, setValueFinalDate] = useState<Dayjs | null>(
    dayjs(fechaFinalEdit)
  );
  ////
let fi;
let ff;
  // const ff = new Date(fechaFinalEdit);
  if (dataResult.length === 0) {
     fi = new Date(fechaInicialEdit);
     ff = new Date(fechaFinalEdit);
  }else{
     fi = new Date(dataResult[0].fecha);
     ff = new Date(dataResult[dataResult.length - 1].fecha);
  }
  
  const fechaRecibidaFormato = dataResult
    .map((data: any) => data["fecha"])
    .map((data: any) => {
      return data.substring(0, 19);
    });
  let dateGraficas: any;
  if (fi.getDate() === ff.getDate()) {
    dateGraficas = fechaRecibidaFormato.map((data: any) => {
      const dateI = new Date(data);
      return dateI.toLocaleTimeString();
    });
  } else {
    dateGraficas = fechaRecibidaFormato.map((data: any) => {
      const dateI = new Date(data);
      return dateI.toLocaleDateString();
    });
  }

  ////////////////////
  //Estados de las graficas
  const [tempGrap, setTempGraph] = useState(false);
  const [humGrap, setHumGraph] = useState(false);

  //Configuracion Grafica
  const labels = dateGraficas;
  const data = {
    labels,
    datasets: [
      {
        label: "Temperatura",
        data: dataResult.map((e: { temperatura: number }) => e.temperatura),
        borderColor: themeColors.BLUE1,
        backgroundColor: themeColors.BLUE1,
        yAxisID: "y",
        lineTension: 0.3,
        hidden: tempGrap,
      },
      {
        label: "Humedad",
        data: dataResult.map((e: { humedad: number }) => e.humedad),
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
        title: {
          display: true,
          text: "Temperatura",
          font: {
            size: 18,
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: !humGrap,
        position: "right" as const,
        title: {
          display: true,
          text: "Humedad",
          font: {
            size: 18,
          },
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
  let horaI = "";
  let horaF = "";

  if (fechaInicialEdit === "") {
    // console.log("Rango de tiempo inicial");
    let fechautc = date.format(new Date(), "YYYY/MM/DD", true);
    let formatUTC = date.parse(fechautc, "YYYY/MM/DD");
    // let fechaEcuador = date.addHours(formatUTC, -5);
    let fechaEcuador = date.addHours(formatUTC, 0);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    // console.log(formatUTC)
    horaI = `${year}-${month}-${day} 08:00:00`;
    horaF = `${year}-${month}-${day} 17:00:00`;
  } else {
    horaI = fechaInicialEdit;
    horaF = fechaFinalEdit;
  }
  const handleShowServerToast = () => {
    toast.warning("Servidor sin Conexión");
  };
  const handleSearchNewDate = () => {
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
  };


//** handles de botones para consulta de periodos /////////////////*/
  const handleTresMesesSearch = () => {
    //dia inicial
    let fechaEcuador = date.addDays(formatUTC, -90);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    horaI = `${year}-${month}-${day} 08:00:00`;
    //dia final
    let fechaEcuadorfinal = date.addHours(formatUTC, 0);
    let yearf = date.format(fechaEcuadorfinal, "YYYY");
    let monthf = date.format(fechaEcuadorfinal, "MM");
    let dayf = date.format(fechaEcuadorfinal, "DD");
    horaF = `${yearf}-${monthf}-${dayf} 17:00:00`;
    console.log(horaI)
    console.log(horaF)
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
  };
  const handleUnMesSearch = () => {
    //dia inicial
    let fechaEcuador = date.addDays(formatUTC, -30);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    horaI = `${year}-${month}-${day} 08:00:00`;
    //dia final
    let fechaEcuadorfinal = date.addHours(formatUTC, 0);
    let yearf = date.format(fechaEcuadorfinal, "YYYY");
    let monthf = date.format(fechaEcuadorfinal, "MM");
    let dayf = date.format(fechaEcuadorfinal, "DD");
    horaF = `${yearf}-${monthf}-${dayf} 17:00:00`;
    console.log(horaI)
    console.log(horaF)
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
  };
  const handleTwoWeeksSearch = () => {
    //dia inicial
    let fechaEcuador = date.addDays(formatUTC, -15);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    horaI = `${year}-${month}-${day} 08:00:00`;
    //dia final
    let fechaEcuadorfinal = date.addHours(formatUTC, 0);
    let yearf = date.format(fechaEcuadorfinal, "YYYY");
    let monthf = date.format(fechaEcuadorfinal, "MM");
    let dayf = date.format(fechaEcuadorfinal, "DD");
    horaF = `${yearf}-${monthf}-${dayf} 17:00:00`;
    console.log(horaI)
    console.log(horaF)
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
  };
  const handleOneWeekSearch = () => {
    //dia inicial
    let fechaEcuador = date.addDays(formatUTC, -7);
    let year = date.format(fechaEcuador, "YYYY");
    let month = date.format(fechaEcuador, "MM");
    let day = date.format(fechaEcuador, "DD");
    horaI = `${year}-${month}-${day} 08:00:00`;
    //dia final
    let fechaEcuadorfinal = date.addHours(formatUTC, 0);
    let yearf = date.format(fechaEcuadorfinal, "YYYY");
    let monthf = date.format(fechaEcuadorfinal, "MM");
    let dayf = date.format(fechaEcuadorfinal, "DD");
    horaF = `${yearf}-${monthf}-${dayf} 17:00:00`;
    console.log(horaI)
    console.log(horaF)
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
  };
  ///////////////////////////////////////////////////////////////////

  //useefect
  useEffect(() => {
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
    if (location.href === "http://localhost:5173/home/resultados") {
      dispatch(setSearchDisplayState(false));
    }
  }, []);

  return (
    <>
    <Toast />
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
            gap: { xs: 0.5, sm: 8 },
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
                  onClick={handleTresMesesSearch}
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  3M
                </Button>
                <Button
                  onClick={handleUnMesSearch}
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  1M
                </Button>
                <Button
                  onClick={handleTwoWeeksSearch}
                  sx={{
                    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                  }}
                >
                  2S
                </Button>
                <Button
                  onClick={handleOneWeekSearch}
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
                <Button onClick={handleSearchNewDate}>Buscar</Button>
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
                        value={valueInicialDate}
                        format="DD / MM / YYYY − HH:mm"
                        onChange={(newValue) => {
                          setValueInicialDate(newValue),
                            setFechaInicialEdit(
                              dayjs(newValue).format("YYYY-MM-DD HH:mm:ss")
                            );
                        }}
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
                        value={valueFinalDate}
                        onChange={(newValue) => {
                          setValueFinalDate(newValue),
                            setFechaFinalEdit(
                              dayjs(newValue).format("YYYY-MM-DD HH:mm:ss")
                            );
                        }}
                        format="DD / MM / YYYY − HH:mm"
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
            gap: 4,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                pb: 1,
              }}
            >
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
            <Box
              sx={{
                gap: 1,
                display: "flex",
                flexDirection: { sm: "column", xs: "row" },
              }}
            >
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
                    valor={datagrapinfo.actualTemp}
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
                    {datagrapinfo.tmax}°C <br />{" "}
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
                    {datagrapinfo.tmin}°C <br />
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
                  {/* <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
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
                  </Typography> */}
                </Box>
              </Box>
              <Divider sx={{ display: { xs: "none", sm: "block" } }} />
              <Divider
                orientation="vertical"
                sx={{ display: { xs: "block", sm: "none" } }}
              />
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
                    valor={datagrapinfo.actualHum}
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
                    {datagrapinfo.hmax}% <br />{" "}
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
                    {datagrapinfo.hmin}% <br />
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
                  {/* <Typography variant="h6" sx={{ lineHeight: 0.9 }}>
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
                  </Typography> */}
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
              width: { sm: "60%", xs: "99%" },
              height: { sm: "100%", xs: "300px" },
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
          <ExcelDatos data={dataResult} />
        </Paper>
        {/* </Box> */}
      </Modal>
      
    </Box>
    </>
  );
};
