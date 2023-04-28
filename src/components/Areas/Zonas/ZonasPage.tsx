import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { NewZone } from "./NewZone";
import { CardZonas } from "./CardZonas";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectDataCliente, setDataCliente } from "../../../features/userSlice";
import { selectAreasByClient } from "../../../features/userDataSlice";
import { getDataLoginClient } from "../../../services/DevicePage/getDataLoginClient";
import { selectZonasByClient, setZonasByClient } from "../../../features/cliente/clientComboMacgateways";
import { getZonas } from "../../../services/DevicePage/cliente/getZonas";
import { Loader } from "../../Loader/Loader";

export const Zonas = () => {
  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  //redux
  const dispatch = useAppDispatch();
  const usuario = String(localStorage.getItem("usuario"));
  const cliente = String(localStorage.getItem("cliente"));
  const clave = String(localStorage.getItem("clave"));
  const dataCliente = useAppSelector(selectDataCliente);
  const zonasbyclient = useAppSelector(selectZonasByClient);

  useEffect(() => {
    if (dataCliente.length === 0) {
      getDataLoginClient(cliente, clave).then((data) => {
        if (data !== undefined) {
          dispatch(setDataCliente(data));
          getZonas(data.idcliente).then((data) => {
            dispatch(setZonasByClient(data))
            console.log(data);
          });
        }
      });
    } else {
      getZonas(dataCliente.idcliente).then((data) => {
        dispatch(setZonasByClient(data))
        // console.log(data);
      });
    }
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* <Box sx={{ display: "flex" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Agregar Zona
        </Button>
      </Box> */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {zonasbyclient.length === 0?
        (<Loader/>)
        :
        zonasbyclient.map((zona:any)=>
        <CardZonas key={zona.idzona} index={zona.idzona} nombre={zona.nombrezona} />
        )
        }
        {/* <CardZonas index={1} nombre={zonasbyclient.nombrezona} /> */}
        
      </Box>
      {/* <Modal
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
          <NewZone />
        </Paper>
        
      </Modal> */}
    </Box>
  );
};
