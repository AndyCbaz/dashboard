import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { NewZone } from "./NewZone";
import { CardZonas } from "./CardZonas";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectDataCliente, setDataCliente } from "../../../features/userSlice";
import {
  selectIdArea,
  selectZonasByAreas,
  setZonasByAreas,
} from "../../../features/cliente/clientComboMacgateways";

import { Loader } from "../../Loader/Loader";
import { getZonas } from "../../../services/Areas/getZonas";

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
  const zonasbyareas = useAppSelector(selectZonasByAreas);
  const idareaLocal = Number(localStorage.getItem("idarea"));
  const idarea = useAppSelector(selectIdArea);

  useEffect(() => {
    if(zonasbyareas.length===0){
      getZonas(idareaLocal).then((data)=>{
        if(data!==undefined){
          dispatch(setZonasByAreas(data))
        }
      })
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Boton Agregar Zona */}
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Agregar Zona
        </Button>
      </Box>
      
      <Box sx={{ display: "flex", gap: 2, flexWrap: 'wrap' }}>
        {zonasbyareas.length === 0 ? (
          <Loader estado={0}/>
        ) : (
          zonasbyareas.map((zona: any) => (
            <CardZonas
              key={zona.idzona}
              index={zona.idzona}
              idzona={zona.idzona}
              nombre={zona.nombrezona}
            />
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
            width: {sm: "350px", xs:'300px'},
            ml: { xs: "10%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewZone close={handleClose}/>
        </Paper>
        
      </Modal>
    </Box>
  );
};
