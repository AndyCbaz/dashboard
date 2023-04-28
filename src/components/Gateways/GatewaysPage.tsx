import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { NewGateway } from "./NewGateway";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectComboGateways,
  setComboGateways,
} from "../../features/cliente/clientComboMacgateways";
import { getComboGateways } from "../../services/Configuracion/getComboGateways";
import { Loader } from "../Loader/Loader";
import { CardGateways } from "./CardGateway";

export const GatewaysPage = () => {
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //redux
  const gatewaysByClient = useAppSelector(selectComboGateways);
  const idcliente = localStorage.getItem("idcliente");
  const dispatch = useAppDispatch();

  useEffect(() => {
    getComboGateways(Number(idcliente)).then((data) => {
      if (data !== undefined) {
        
        dispatch(setComboGateways(data));
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
        sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2 }}
      >
        {gatewaysByClient.length === 0 ? (
          <Box sx={{ display: "flex", width: "100%" }}>
            <Loader />
          </Box>
        ) : (
          gatewaysByClient.map((gateway: any) => (
            <CardGateways
              key={gateway.idmacgateway}
              index={gateway.idmacgateway}
              nombre={gateway.macgateway}
            />
          ))
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
          <NewGateway />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
