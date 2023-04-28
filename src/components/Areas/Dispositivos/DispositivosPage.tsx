import React, { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import { NewDevice } from "./NewDevice";

import { CardDispositivosZona } from "./CardDispositivosZona";
//redux
import { getUsersByClient } from "../../../services/DevicePage/cliente/getUsersByClient";
import { selectDataCliente } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDataUser } from "../../../services/DevicePage/getDataUser";

import {
  selectDevicesByZonas,
  setDataGlobalClient,
  setDevicesByZonas,
} from "../../../features/cliente/clientComboMacgateways";
import { getDevicesByZonas } from "../../../services/Areas/getDevicesByZonas";

export const Dispositivos = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //redux
  const devicesByZonas = useAppSelector(selectDevicesByZonas);
  const idzona = localStorage.getItem("idzona");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (devicesByZonas.length === 0) {
      getDevicesByZonas(Number(idzona)).then((data) => {
        if (data !== undefined) {
          dispatch(setDevicesByZonas(data));
        }
      });
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Button
            onClick={() => {
              handleOpen();
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Agregar Dispositivo
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        {devicesByZonas.map((device:any)=>
        <CardDispositivosZona key={device.iddispositivo} index={device.iddispositivo} state={device.online} nombre={device.macdispositivo}/>
        )}
        
      </Box>
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
            // my: 8,
            width: "400px",
            ml: { xs: "8%", sm: "35%" },
            mt: 4,
          }}
        >
          <NewDevice />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
