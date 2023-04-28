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

import { setDataGlobalClient } from "../../../features/cliente/clientComboMacgateways";

export const Dispositivos = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //redux
  const dispatch = useAppDispatch()
  const dataCliente = useAppSelector(selectDataCliente);

useEffect(()=>{
  
  
  // if(dataCliente.length!==0){
  //   getUsersByClient(dataCliente.idcliente)
  //   .then((data)=>{
  //     // console.log(data.length)
      
  //     let dataGlobalClient:any = [];
  //     for(let i = 0; i < data[0].length ; i++) {
  //       getDataUser(data[i].idusuario, dataCliente.idcliente)
  //       .then((data)=>{
  //         // dataGlobalClient.push(data);
          
  //         // console.log(data)
  //       })
  //     }
  //     // dispatch(setDataGlobalClient(dataGlobalClient))
  //     // console.log(dataGlobalClient)
      
  
      
  //   })
    

  // }

},[]);


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
        <CardDispositivosZona index={1} state={true}/>
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
            width: '400px',
            ml: { xs: "8%", sm: "35%" },
            mt:4
          }}
        >
         <NewDevice/> 
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
