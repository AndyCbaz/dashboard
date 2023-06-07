import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, Paper, Typography } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { NewGateway } from "./NewGateway";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectComboGateways,
  selectDevicesByGateways,
  selectIdMacGateway,
  setComboGateways,
  setDevicesByGateways,
  setIdMacGateways,
} from "../../features/cliente/clientComboMacgateways";
import { getComboGateways } from "../../services/Configuracion/getComboGateways";
import { Loader } from "../Loader/Loader";
import { CardGateways } from "./CardGateway";
import { getDevicesByGateways } from "../../services/Gateways/getDeviceByGateway";
import { CardDispositivosGatewaysDesktop } from "./CardDispositivosDesktop";

export const GatewaysPage = () => {
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //redux
  const gatewaysByClient = useAppSelector(selectComboGateways);
  const devicesbygateways = useAppSelector(selectDevicesByGateways);
  const idcliente = localStorage.getItem("idcliente");
  const idmacgateway = useAppSelector(selectIdMacGateway);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getComboGateways(Number(idcliente)).then((data) => {
      if (data !== undefined) {
        dispatch(setComboGateways(data));
        dispatch(setIdMacGateways(data[0].idmacgateway));
        console.log(data);
        getDevicesByGateways(data[0].idmacgateway).then((data) => {
          if (data !== undefined) {
            console.log(data);
            dispatch(setDevicesByGateways(data));
          }
        });
      }
    });
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
    >
      {/* Boton Agregar Area */}
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Agregar Gateway
        </Button>
      </Box>

      {/* Card de Areas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 2,
          flexWrap: "wrap",
          px: { sm: 0, xs: 2 },
        }}
      >
        {gatewaysByClient.length === 0 ? (
          <Box sx={{ display: "flex", width: "100%" }}>
            <Loader estado={0}/>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width:'100%' }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {gatewaysByClient.map((gateway: any) => (
                <CardGateways
                  key={gateway.idmacgateway}
                  index={gateway.idmacgateway}
                  nombre={gateway.macgateway}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow:1 }}>
              <Box>
                <Typography variant="body1">Dispositivos</Typography>
              </Box>
              <Box sx={{ display: "flex", width:'100%' }}>
                {devicesbygateways.length === 0 ? (
                  <Box sx={{display:'flex', flexGrow:1, justifyContent:'center', alignItems:'center', height:'100px'}}>
                    <Typography variant="body1">
                      No hay dispositivos asociados a este Gateway
                    </Typography>
                  </Box>
                ) : (
                  devicesbygateways.map((device: any) => (
                    <CardDispositivosGatewaysDesktop
                      mac={device.macdispositivo}
                      key={device.iddispositivo}
                      index={device.iddispositivo}
                      state={device.online}
                      nombre={device.nombreDispositivo}
                      idgateway={device.idmacgateway}
                      iddispositivo={device.iddispositivo}
                    />
                  ))
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* modal */}
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
            width: "350px",
            ml: { xs: "15%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewGateway close={handleClose} />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
