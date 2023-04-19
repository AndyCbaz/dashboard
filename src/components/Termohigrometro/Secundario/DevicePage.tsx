import React, {useState} from "react";
//MUI
import Box from "@mui/material/Box/Box";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Button, Paper } from "@mui/material";
import Modal from "@mui/material/Modal";
//Otros componentes
import { NewDevice } from "./NewDevice";
import { CardDispositivos } from "./CardDispositivos";
//React Router Dom
import { useNavigate } from "react-router-dom";


export const DevicePage = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hancleClick = () => navigate("/");

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
