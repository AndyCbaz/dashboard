import React from "react";
//MUI
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { CardAreas } from "./CardAreas";
import { NewArea } from "./NewArea";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RouterBreadcrumbs } from "./Breadcrumbs";


export const AreasPage = () => {
  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width:'100%' }}>
      {/* Indicador de Ubicacion */}
      <Box><RouterBreadcrumbs/></Box>
      {/* Childrens */}
      <Outlet />
    </Box>
  );
};
