import React, { useEffect, useState } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { CardAreas } from "../CardAreas";
import { NewArea } from "../NewArea";
import { Typography } from "@mui/material";
//redux
// import {
//   selectAreasByClient,
//   setAreasByClient,
//   setUsersByClient,
// } from "../../../features/userDataSlice";
import { selectDataCliente, setDataCliente } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
//servicios
import { getDataLoginClient } from "../../../services/DevicePage/getDataLoginClient";
import { getAreas } from "../../../services/DevicePage/cliente/getAreas";
import { getUsersByClient } from "../../../services/DevicePage/cliente/getUsersByClient";
import { Loader } from "../../Loader/Loader";
import {
  selectAreasByClient,
  selectDevicesByZonas,
  selectZonasByAreas,
  setAreasByClient,
  setDevicesByZonas,
  setUsersByClient,
  setZonasByAreas,
} from "../../../features/cliente/clientComboMacgateways";
import { CardAreasDesktop } from "./CardAreasDesktop";
import { CardZonasDesktop } from "../Zonas/CardZonasDesktop";
import { CardDispositivosZonaDesktop } from "../Dispositivos/CardDispositivosDesktop";
import { NewDevice } from "../Dispositivos/NewDevice";
import { NewZone } from "../Zonas/NewZone";
import { getZonas } from "../../../services/Areas/getZonas";
import { getDevicesByZonas } from "../../../services/Areas/getDevicesByZonas";

export const Areas = () => {
  //redux
  const dispatch = useAppDispatch();
  const idcliente = Number(localStorage.getItem("idcliente"));

  const dataCliente = useAppSelector(selectDataCliente);
  const areaByClient = useAppSelector(selectAreasByClient);
  const zonasbyareas = useAppSelector(selectZonasByAreas);
  const devicesByZonas = useAppSelector(selectDevicesByZonas);
  const idareaLocal = Number(localStorage.getItem("idarea"));
  //Modal areas
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //Modal zonas 
  const [openModalZonas, setOpenModalZonas] = useState(false);
  const handleOpenZonas = () => setOpenModalZonas(true);
  const handleCloseZonas = () => setOpenModalZonas(false);
  //Modal dispositivos
  const [openModalDevices, setOpenModalDevices] = useState(false);
  const handleOpenDevices = () => setOpenModalDevices(true);
  const handleCloseDevices = () => setOpenModalDevices(false);

  useEffect(() => {
    getAreas(idcliente).then((data) => {
      if (data !== undefined) {
        dispatch(setAreasByClient(data));
        getZonas(data[0].idarea)
        .then((data)=>{
          if(data !== undefined){
            dispatch(setZonasByAreas(data))
            getDevicesByZonas(data[0].idzona)
            .then((data)=>{
              if(data!==undefined){
                dispatch(setDevicesByZonas(data))
              }
            })
            
          }
        })
      }
    });
    //obtener datos de la primera zona

  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
    >
      {/* Boton Agregar Area Mobile*/}
      <Box sx={{ display: { sm: "none", xs: "flex" } }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Agregar Área
        </Button>
      </Box>

      {/* Card de Areas mobile */}
      <Box
        sx={{
          display: { sm: "none", xs: "flex" },
          flexDirection: "row",
          width: "100%",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: { sm: "start" },
          px: 0.5,
        }}
      >
        {areaByClient.length === 0 ? (
          <Box sx={{ display: "flex", width: "100%" }}>
            <Loader />
          </Box>
        ) : (
          areaByClient.map((area: any) => (
            <CardAreas
              index={area.nombrearea}
              key={area.nombrearea}
              nombre={area.nombrearea}
              idarea={area.idarea}
            />
          ))
        )}
      </Box>
      {/* Card de areas y demas para desktop */}
      <Box
        sx={{
          display: { sm: "flex", xs: "none" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* areas */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // border: "solid",
          }}
        >
          <Box>
            <Typography variant="h5">Áreas</Typography>
          </Box>
          {/* Boton Agregar Area */}
          <Box>
            <Button
              onClick={handleOpen}
              variant="outlined"
              startIcon={<LibraryAddIcon />}
            >
              Agregar Área
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {areaByClient.length === 0 ? (
              <Loader />
            ) : (
              areaByClient.map((area: any) => (
                <CardAreasDesktop
                  index={area.nombrearea}
                  key={area.nombrearea}
                  nombre={area.nombrearea}
                  idarea={area.idarea}
                  
                />
              ))
            )}
          </Box>
        </Box>
        {/* Zonas */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // border: "solid",
            height:'200px'
          }}
        >
          <Box>
            <Typography variant="h5">Zonas</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={handleOpenZonas}
              variant="outlined"
              startIcon={<LibraryAddIcon />}
            >
              Agregar Zona
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {zonasbyareas.length === 0 ? (
              <Typography variant="h6" sx={{width:'100%', textAlign:'center'}}>Seleccione una Zona</Typography>
            ) : (
              zonasbyareas.map((zona: any) => (
                <CardZonasDesktop
                  key={zona.idzona}
                  index={zona.idzona}
                  idzona={zona.idzona}
                  nombre={zona.nombrezona}
                />
              ))
            )}
          </Box>
        </Box>
        {/* Dispositivos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // border: "solid",
            height:'230px'
          }}
        >
          <Box>
            <Typography variant="h5">Dispositivos</Typography>
          </Box>
          {/* Boton Agregar dispositivos */}
          <Box>
            <Button
              onClick={handleOpenDevices}
              variant="outlined"
              startIcon={<LibraryAddIcon />}
            >
              Agregar Dispositivos
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {devicesByZonas.length === 0 ? (
              <Typography variant="h6" sx={{textAlign:'center', width:'100%'}}>Zona sin dispositivos Registrados</Typography>
            ) : (
              devicesByZonas.map((device: any) => (
                <CardDispositivosZonaDesktop
                  key={device.iddispositivo}
                  index={device.iddispositivo}
                  state={device.online}
                  nombre={device.macdispositivo}
                  idgateway={device.idmacgateway}
                  iddispositivo={device.iddispositivo}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
      {/* Modal para agregar areas */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 8,
            my: 8,
            width: { sm: "350px", xs: "300px" },
            ml: { xs: "10%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewArea />
        </Paper>
        {/* </Box> */}
      </Modal>
      {/* Modal Dispositivos */}
      <Modal
        open={openModalDevices}
        onClose={handleCloseDevices}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 8,
            // my: 8,
            width: { sm: "400px", xs: "310px" },
            ml: { xs: "10%", sm: "35%" },
            mt: 4,
          }}
        >
          <NewDevice />
        </Paper>
        {/* </Box> */}
      </Modal>
      {/* Modal Zonas */}
      <Modal
        open={openModalZonas}
        onClose={handleCloseZonas}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 8,
            my: 8,
            width: {sm: "350px", xs:'300px'},
            ml: { xs: "10%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewZone />
        </Paper>
        
      </Modal>
    </Box>
  );
};
