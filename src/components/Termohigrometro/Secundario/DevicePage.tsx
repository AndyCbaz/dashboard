import Box from "@mui/material/Box/Box";
import { useNavigate } from "react-router-dom";

import React from "react";
// import {useState} from 'react'

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";
import { NewDevice } from "./NewDevice";
import { CardDispositivos } from "./CardDispositivos";


export const DevicePage = () => {
  // const elements: any = [];
  // const [cards, setCards] = useState(elements);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hancleClick = () => navigate("/");

  // const handleCard = (elem: string) => {
  //   const newCard = { title: "New Card", content: "This is a new card!" };
  //   setCards([...cards, newCard]);
  // };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* BOTON AGREGAR DISPOSITIVO */}
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
      {/* LISTA DE DISPOSITIVOS */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <CardDispositivos index={1} state={false} dataT={true} dataH={true} />
        {/* <CardDispositivos index={2} state={true} dataT={true} dataH={false}/> */}
      </Box>
      
      {/* VENTANA MODAL */}
      <Modal
        open={open}
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
          <NewDevice />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
    // </Box>
  );
};
