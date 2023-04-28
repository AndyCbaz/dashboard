import React, { useEffect, useState } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { CardAreas } from "../CardAreas";
import { NewArea } from "../NewArea";
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
  setAreasByClient,
  setUsersByClient,
} from "../../../features/cliente/clientComboMacgateways";

export const Areas = () => {
  //redux
  const dispatch = useAppDispatch();
  const idcliente = Number(localStorage.getItem('idcliente'));

  const dataCliente = useAppSelector(selectDataCliente);
  const areaByClient = useAppSelector(selectAreasByClient);
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    getAreas(idcliente).then((data)=>{
      if(data!==undefined){
        dispatch(setAreasByClient(data))
      }
    })
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
          Agregar Área
        </Button>
      </Box>

      {/* Card de Areas */}
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap:2 }}>
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
            width: "350px",
            ml: { xs: "15%", sm: "36%" },
            mt: 4,
          }}
        >
          <NewArea />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
