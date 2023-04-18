import React from "react";
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { CardAreas } from "./CardAreas";
import { NewArea } from "./NewArea";


export const Areas = () => {
  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Agregar Área
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <CardAreas index={1} state={true} />
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
