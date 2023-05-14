import React, { useEffect, useState } from "react";
//mui
import Box from "@mui/material/Box/Box";
import { Button, Modal, Paper } from "@mui/material";
//services
import { getDataLoginClient } from "../../../services/DevicePage/getDataLoginClient";
import { getUsersByClient } from "../../../services/DevicePage/cliente/getUsersByClient";
//redux

import { selectDataCliente, setDataCliente } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
//other components
import { Loader } from "../../Loader/Loader";
import { CardByUser } from "./CardByUsers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NewUser from "./NewUser";
import { getComboGateways } from "../../../services/Configuracion/getComboGateways";
import {
  selectComboGateways,
  selectUsersByClient,
  setComboGateways,
  setUsersByClient,
} from "../../../features/cliente/clientComboMacgateways";

export const UsuariosPage = () => {
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //redux
  const dispatch = useAppDispatch();
  const idcliente = Number(localStorage.getItem("idcliente"));
  const dataCliente = useAppSelector(selectDataCliente);
  const userByClient = useAppSelector(selectUsersByClient);
  const comboGateways = useAppSelector(selectComboGateways);

  useEffect(() => {
    getUsersByClient(idcliente)
    .then((data) => {
      if(data !== undefined){
        dispatch(setUsersByClient(data))
      }
      
    });
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      {/* Boton Agregar Area */}
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<PersonAddIcon />}
        >
          Agregar Usuario
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        {userByClient.length === 0 ? (
          <Box sx={{display:'flex',flexGrow:1}}><Loader /></Box>
        ) : (
          userByClient.map((user: any) => (
            <Box key={user.nombreusuario}>
              <CardByUser
                state={user.estado}
                usuario={user.nombreusuario}
                // key={user.nombreusuario}
                index={user.nombreusuario}
              />
            </Box>
          ))
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
            my: 8,
            width: "300px",
            ml: { xs: "15%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewUser close={handleClose} />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
