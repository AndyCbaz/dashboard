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
  selectDatosMaxMinGraf,
  setDataMaxMinGraf,
} from "../../../features/userResultsSlice";
import {
  selectSearchDisplayState,
  setSearchDisplayState,
} from "../../../features/headerDisplay";
//time
import date from "date-and-time";
import { getDataDevicesDetalle } from "../../../services/Results/getDataDeviceDetalle";
import { setDataUsuario } from "../../../features/userSlice";
import {
  setDevicesResumen,
  setUserDataGlobal,
} from "../../../features/userDataSlice";
import { HOST, PORT, PORTPAGE } from "../../../helpers/Apis/HostPort";

export const HomeResultados = () => {
  //botones periodo y search background
  const [stateDataButtonResult, setStateDataButtonResult] = useState("");
  //redux
  const dispatch = useAppDispatch();
  const dataResult = useAppSelector(selectDataResultDevice);
  const dataConsulta = useAppSelector(selectDatosResultConsulta);
  const datagrapinfo = useAppSelector(selectDatosMaxMinGraf);
  const searchDisplayState = useAppSelector(selectSearchDisplayState);
  const horasIncrementadas = 0;

  //react router dom
  const navigate = useNavigate();
  const hancleClick = () => {
    navigate("/home");
    dispatch(setDataUsuario([]));
    dispatch(setUserDataGlobal([]));
    dispatch(setDevicesResumen([]));
  };

  //dispositivo y gateway de consulta de datos
  const iddispositivo = Number(localStorage.getItem("iddispositivo"));
  const idmacgateway = Number(localStorage.getItem("idgateway"));

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
  } else {
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
      dateI.setHours(dateI.getHours() + horasIncrementadas);
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
  const [HMm, setHMm] = useState(false);
  const [TMm, setTMm] = useState(false);
  //useefect de maximos y minimos de la grafica
  useEffect(() => {
    if (tempGrap === true && humGrap === true) {
      setHMm(true);
      setTMm(true);
    } else if (tempGrap === true && humGrap === false) {
      setTMm(true);
      setHMm(false);
    } else if (tempGrap === false && humGrap === true) {
      setTMm(false);
      setHMm(true);
    } else if (tempGrap === false && humGrap === false) {
      setTMm(true);
      setHMm(true);
    }
  }, [tempGrap, humGrap, HMm, TMm]);

  //Configuracion Grafica
  const labels = dateGraficas;
  const data = {
    labels,
    datasets: [
      {
        borderWidth: 2,
        pointBorderWidth: 0,
        label: "Temperatura",
        data: dataResult.map((e: { temperatura: string }) => {
          const formatValue = e.temperatura.replace(",", ".");
          return parseFloat(formatValue);
        }),
        borderColor: themeColors.BLUE1,
        backgroundColor: themeColors.BLUE1,
        yAxisID: "y",
        lineTension: 0.3,
        hidden: tempGrap,
      },
      {
        borderWidth: 2,
        pointBorderWidth: 0,
        label: "Humedad",
        data: dataResult.map((e: { humedad: string }) => {
          const formatValue = e.humedad.replace(",", ".");
          return parseFloat(formatValue);
        }),
        borderColor: themeColors.GREEN,
        backgroundColor: themeColors.GREEN,
        yAxisID: "y1",
        lineTension: 0.3,
        hidden: humGrap,
      },
      {
        label: "minHum",
        data: dataResult.map((e: { humedad: string }) => {
          return datagrapinfo.hmin;
        }),
        borderColor: themeColors.ORANGEMIN,
        backgroundColor: themeColors.ORANGEMIN,
        yAxisID: "y1",
        lineTension: 0.3,
        hidden: HMm,
        // fill:false,
        borderDash: [5, 5],
      },
      {
        label: "maxHum",
        data: dataResult.map((e: { humedad: string }) => {
          return datagrapinfo.hmax;
        }),
        borderColor: themeColors.GREENMAX,
        backgroundColor: themeColors.GREENMAX,
        yAxisID: "y1",
        lineTension: 0.3,
        hidden: HMm,
        // fill:false,
        borderDash: [5, 5],
      },
      {
        label: "minTemp",
        data: dataResult.map((e: { humedad: string }) => {
          return datagrapinfo.tmin;
        }),
        borderColor: themeColors.ORANGEMIN,
        backgroundColor: themeColors.ORANGEMIN,
        yAxisID: "y",
        lineTension: 0.3,
        hidden: TMm,
        // fill:false,
        borderDash: [5, 5],
      },
      {
        label: "maxTemp",
        data: dataResult.map((e: { humedad: string }) => {
          return datagrapinfo.tmax;
        }),
        borderColor: themeColors.GREENMAX,
        backgroundColor: themeColors.GREENMAX,
        yAxisID: "y",
        lineTension: 0.3,
        hidden: TMm,
        // fill:false,
        borderDash: [5, 5],
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
        font: { size: 19 },
      },
      legend: {
        display: false,
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
    // HORA INICIAL DE DATAPICKER
    let fechainicialutc = new Date(fechaInicialEdit);
    fechainicialutc.setHours(fechainicialutc.getHours() + horasIncrementadas);
    let day = fechainicialutc.getDate();
    let dayformat = "";
    if (day < 10) {
      dayformat = `0${day}`;
    } else {
      dayformat = `${day}`;
    }
    let month = fechainicialutc.getMonth() + 1;
    let monthformat = "";
    if (month < 10) {
      monthformat = `0${month}`;
    } else {
      monthformat = `${month}`;
    }
    let year = fechainicialutc.getFullYear();
    let horas = fechainicialutc.getHours();
    let horaformat = "";
    if (horas < 10) {
      horaformat = `0${horas}`;
    } else {
      horaformat = `${horas}`;
    }
    let minutos = fechainicialutc.getMinutes();
    let minutosformat = "";
    if (minutos < 10) {
      minutosformat = `0${minutos}`;
    } else {
      minutosformat = `${minutos}`;
    }
    horaI = `${year}-${monthformat}-${dayformat} ${horaformat}:${minutosformat}:00`;
    // console.log(horaI)
    // HORA FINAL DEL DATA PICKER
    let fechafinalutc = new Date(fechaFinalEdit);
    fechafinalutc.setHours(fechafinalutc.getHours() + horasIncrementadas);
    let dayfinal = fechafinalutc.getDate();
    let dayformatfinal = "";
    if (dayfinal < 10) {
      dayformatfinal = `0${dayfinal}`;
    } else {
      dayformatfinal = `${dayfinal}`;
    }
    let monthfinal = fechafinalutc.getMonth() + 1;
    let monthformatfinal = "";
    if (monthfinal < 10) {
      monthformatfinal = `0${monthfinal}`;
    } else {
      monthformatfinal = `${monthfinal}`;
    }
    let yearfinal = fechafinalutc.getFullYear();
    let horasfinal = fechafinalutc.getHours();
    let horaformatfinal = "";
    if (horasfinal < 10) {
      horaformatfinal = `0${horasfinal}`;
    } else {
      horaformatfinal = `${horasfinal}`;
    }
    let minutosfinal = fechafinalutc.getMinutes();
    let minutosformatfinal = "";
    if (minutos < 10) {
      minutosformatfinal = `0${minutosfinal}`;
    } else {
      minutosformatfinal = `${minutosfinal}`;
    }
    horaF = `${yearfinal}-${monthformatfinal}-${dayformatfinal} ${horaformatfinal}:${minutosformatfinal}:00`;
    // console.log(horaF)
  }
  const handleShowServerToast = () => {
    toast.warning("Servidor sin Conexión");
  };
  const handleSearchNewDate = () => {
    setStateDataButtonResult("search");
    console.log(horaI);
    console.log(horaF);
    getDataDevicesDetalle(
      dataConsulta.idgateway,
      dataConsulta.iddispositivo,
      horaI,
      horaF
    )
      .then((data) => {
        if (data !== undefined) {
          dispatch(setDataResultDevice(data));
          // console.log(data);
        }
      })
      .catch(() => {
        handleShowServerToast();
      });
    // console.log(dataConsulta.idgateway);
    // console.log(dataConsulta.iddispositivo);
  };

  //** handles de botones para consulta de periodos /////////////////*/
  const handleTresMesesSearch = () => {
    setStateDataButtonResult("3m");
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
    console.log(horaI);
    console.log(horaF);
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
    setStateDataButtonResult("1m");
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
    console.log(horaI);
    console.log(horaF);
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
    setStateDataButtonResult("2s");
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
    console.log(horaI);
    console.log(horaF);
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
    setStateDataButtonResult("1s");
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
    console.log(horaI);
    console.log(horaF);
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
  //constantes de informacion en caso de refresh
  const tmaxgraf = localStorage.getItem("tmax");
  const tmingraf = localStorage.getItem("tmin");
  const hmaxgraf = localStorage.getItem("hmax");
  const hmingraf = localStorage.getItem("hmin");
  const actualTemp = String(localStorage.getItem("actualTemp"));
  const actualHum = String(localStorage.getItem("actualHum"));
  const nombre = localStorage.getItem("nombredevice");
  //useefect
  useEffect(() => {
    if (dataResult.length === 0) {
      getDataDevicesDetalle(idmacgateway, iddispositivo, horaI, horaF)
        .then((data) => {
          if (data !== undefined) {
            dispatch(setDataResultDevice(data));
          }
        })
        .catch(() => {
          handleShowServerToast();
        });
    }
    // console.log(idmacgateway)
    // console.log(iddispositivo)

    if (location.href.slice(-10) === `resultados`) {
      dispatch(setSearchDisplayState(false));
    }
    if (datagrapinfo.length === 0) {
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
    }
  }, [dataResult]);
  useEffect(() => {
    setStateDataButtonResult("");
  }, []);

  // Number(Number(datagrapinfo.actualTemp.replace(',','.')).toFixed(1))
  // Number(Number(datagrapinfo.actualHum.replace(',','.')).toFixed(1))

  return (
    <>
      <Toast />
      {}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { sm: "100%", xs: "100%" },
        }}
      >
        {/* GRAFICA */}
        {/* Cuadro de Grafica */}
        <Box
          sx={{
            // border: "solid",
            width: "100%",
            display: "flex",
            // flexGrow: 1,
            flexDirection: "column",
            p: 2,
            borderRadius: 2,
            background: themeColors.WHITE,
            boxShadow: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            {/* Boton Atras */}
            <Box sx={{ display: "flex" }}>
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
            {/* Titulo  */}
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                pb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Registro de Datos
              </Typography>
            </Box>
          </Box>
          {/* Control de Gráfica */}
          <Box
            sx={{
              // backgroundColor:'blue',
              display: "flex",
              alignItems: { sm: "start", xs: "center" },
              flexDirection: { sm: "row", xs: "column" },
              // justifyContent:'center',
              justifyContent: "space-Around",
              flexGrow: 1,
              pb: 0.5,
              pl: 4,
              gap: { xs: 0.5, sm: 0 },
              // border: "solid",
            }}
          >
            {/* Cotroles botones  */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              {/* control por periodo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
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
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        background: themeColors.GRAY3,
                      },
                      background:
                        stateDataButtonResult === "3m"
                          ? themeColors.GRAY3
                          : "white",
                    }}
                  >
                    3M
                  </Button>
                  <Button
                    onClick={handleUnMesSearch}
                    sx={{
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        background: themeColors.GRAY3,
                      },
                      background:
                        stateDataButtonResult === "1m"
                          ? themeColors.GRAY3
                          : "white",
                    }}
                  >
                    1M
                  </Button>
                  <Button
                    onClick={handleTwoWeeksSearch}
                    sx={{
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        background: themeColors.GRAY3,
                      },
                      background:
                        stateDataButtonResult === "2s"
                          ? themeColors.GRAY3
                          : "white",
                    }}
                  >
                    2S
                  </Button>
                  <Button
                    onClick={handleOneWeekSearch}
                    sx={{
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        background: themeColors.GRAY3,
                      },
                      background:
                        stateDataButtonResult === "1s"
                          ? themeColors.GRAY3
                          : "white",
                    }}
                  >
                    7D
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            {/* <Divider
              orientation="vertical"
              sx={{ display: { sm: "block", xs: "none" } }}
            /> */}

            <Divider sx={{ display: { xs: "block", sm: "none" } }} />

            {/* Controles fechas */}
            <Box
              sx={{
                // backgroundColor:'red',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // flexGrow:1,
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
                  <Button
                    onClick={handleSearchNewDate}
                    sx={{
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        background: themeColors.GRAY3,
                      },
                      background:
                        stateDataButtonResult === "search"
                          ? themeColors.GRAY3
                          : "white",
                    }}
                  >
                    Buscar
                  </Button>
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
              // backgroundColor:'red',
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              // justifyContent: "center",
              justifyContent: "space-Around",
              // gap: 4,
              width: "100%",
            }}
          >
            {/* Informacion grafica */}
            <Box
              sx={{
                display: "flex",
                p: { sm: 2, xs: 0 },
                py: { sm: 1, xs: 2 },
                flexDirection: "column",
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              {/* <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">Información</Typography>
              </Box> */}
              {/* Nombre del Dispositivo */}
              <Box sx={{ pb: 0.5 }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {nombre}
                </Typography>
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
                      color: !tempGrap ? "white" : "black",
                      background: !tempGrap
                        ? themeColors.BLUE1
                        : themeColors.GRAY,

                      transform: !tempGrap ? "scale3d(1.05, 1.05, 1)" : "none",
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        // background: themeColors.BLUE1,
                        color: "black",
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
                      color: !humGrap ? "white" : "black",
                      background: !humGrap
                        ? themeColors.GREEN
                        : themeColors.GRAY,
                      transform: !humGrap ? "scale3d(1.05, 1.05, 1)" : "none",
                      "&:hover": {
                        transform: "scale3d(1.05, 1.05, 1)",
                        // background: themeColors.GREEN,
                        color: "black",
                      },
                    }}
                  >
                    Humedad
                  </Button>
                </Box>
              </Box>
              {/* divider */}
              <Box>
                <Divider />
              </Box>
              {/* datos T y H */}
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
                    pt: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", height: "110px" }}>
                    <RadialIndicadorTemperatura
                      valor={Number(Number(datagrapinfo.actualTemp).toFixed(1))}
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
                    py: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", height: "110px" }}>
                    <RadialIndicadorHumedad
                      valor={Number(Number(datagrapinfo.actualHum).toFixed(1))}
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
                // backgroundColor:'red',
                width: { sm: "50%", xs: "99%" },
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
            <ExcelDatos
              data={dataResult}
              horasIncrementadas={horasIncrementadas}
              name={nombre}
            />
          </Paper>
          {/* </Box> */}
        </Modal>
      </Box>
    </>
  );
};
