import React, { useState } from "react";
//MUI
import Box from "@mui/material/Box";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LogoSectionShort } from "./LogoSectionShort";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { themeColors } from "../../helpers/theme/theme.colors";
//react router dom
import { useNavigate } from "react-router-dom";
//Other components
import { LogOut } from "../LogOut/LogOut";
import { LogoSection } from "./LogoSection";
//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectClientCI,
  selectDataCliente,
  selectUsuario,
  setDataUsuario,
} from "../../features/userSlice";

import {
  setDevicesResumen,
  setUserDataGlobal,
} from "../../features/userDataSlice";
//Funciones
import { getDataLoginUser } from "../../services/DevicePage/getDataLoginUser";
import { getDataUser } from "../../services/DevicePage/getDataUser";
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";
import {
  setDevicesSelected,
  setResumenAllDevicesSelected,
} from "../../features/cliente/clientComboMacgateways";
import { SetPassword } from "../Login/SetPassword";

interface VerticalMenuProp {
  open: boolean;
}

export const VerticalMenu = (props: VerticalMenuProp) => {
  const [open, setOpen] = useState(true);
  const [openZone, setOpenZone] = useState(true);
  const [pageActivated, setPageActivated] = useState(0);
  const [subpageActivated, setSubpageActivated] = useState("a");
  const [subpageZone, setSubPageZone] = useState("a");
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
    //Modal Change password
    const [openModalSetPassword, setOpenModalSetPassword] = useState(false);
    const handleOpenPassword = () => setOpenModalSetPassword(true);
    const handleClosePassword = () => setOpenModalSetPassword(false);
  //React Router Dom
  const navigate = useNavigate();
  //REDUX
  const dispatch = useAppDispatch();
  // const usuario = localStorage.getItem('usuario');
  const usuario = useAppSelector(selectUsuario);
  const cliente = useAppSelector(selectClientCI);
  const dataCliente = useAppSelector(selectDataCliente);
  //menu////////////////////////////////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  ////////////////////////////////////////////////////

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickZones = () => {
    setOpenZone(!openZone);
  };

  const handleMenuOptionSelected = (page: number) => {
    if (page === 0) {
      handleClick();
    } else if (page === 1) {
      handleClickZones();
    }

    // setSubpageActivated("z");

    setPageActivated(page);
  };
  const handleSubMenuOptionSelected = (subpage: string) => {
    if (pageActivated === 1 || pageActivated === 0) {
      setSubpageActivated(subpage);
    }
  };
  const handleSubMenuOptionSelectedZones = (subpagezone: string) => {
    if (pageActivated === 1 || pageActivated === 0) {
      setSubPageZone(subpagezone);
    }
  };
  const handleUpdateRedux = () => {
    dispatch(setDataUsuario([]));
    dispatch(setUserDataGlobal([]));
    dispatch(setDevicesResumen([]));
    dispatch(setResumenAllDevicesSelected([]));
    dispatch(setDevicesSelected([]));
  };

  return (
    <Box
      sx={{
        // border: "solid",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Seccion del Logo */}
      <Box
        sx={{
          display: "flex",
          height: "50px",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Box sx={{ ...(!props.open && { display: "none" }) }}>
          <LogoSection />
        </Box>
        <Box sx={{ ...(props.open && { display: "none" }) }}>
          <LogoSectionShort />
        </Box>
      </Box>
      {/* Menu de Dashborad */}
      <Box sx={{ flexGrow: 1, mx: 1 }}>
        <List>
          <ListItem key={"Dashboard"} disablePadding sx={{ display: "block" }}>
            {/* Item Dashboard */}
            <Box
              sx={{
                borderRadius: 1,
                // mx: 0.5,
                my: 0.5,
                color: pageActivated === 0 ? "white" : "black",
                background:
                  pageActivated === 0 ? themeColors.BLUE1 : themeColors.GRAY,
              }}
            >
              <ListItemButton
                onClick={() => {
                  handleMenuOptionSelected(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: props.open ? "start" : "center",
                  px: 2.5,
                }}
              >
                <Box>
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      minWidth: 0,
                    }}
                  >
                    <GridViewIcon
                      sx={{ color: pageActivated === 0 ? "white" : "black" }}
                    />
                  </ListItemIcon>
                </Box>

                <ListItemText
                  primary={"DASHBOARD"}
                  sx={{ opacity: props.open ? 1 : 0, textAlign: "center" }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Box>
            {/* Subitems de Dashboard */}
            <Collapse in={open} timeout={600} unmountOnExit>
              <List
                component="div"
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  // mx:0.5,
                }}
              >
                {/* Boton termohigrometros */}
                <ListItemButton
                  onClick={() => {
                    handleSubMenuOptionSelected("a");
                    handleUpdateRedux();
                    navigate("/home");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    minHeight: 48,

                    "&:hover": { background: themeColors.BLUE2 },
                    color: subpageActivated === "a" ? "white" : "black",
                    background:
                      subpageActivated === "a"
                        ? themeColors.BLUE2
                        : themeColors.GRAY,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: props.open ? "none" : "flex",
                      justifyContent: "center",
                      color: subpageActivated === "a" ? "white" : "black",
                    }}
                  >
                    <ThermostatIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Termohigrómetros"
                    sx={{ display: props.open ? "block" : "none" }}
                  />
                </ListItemButton>
                {/* Boton Peso */}
                {/* <ListItemButton
                  onClick={() => {
                    handleSubMenuOptionSelected("b");
                    navigate("/home/peso");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    minHeight: 48,
                    "&:hover": { background: themeColors.BLUE2 },
                    background:
                      subpageActivated === "b"
                        ? themeColors.BLUE2
                        : themeColors.GRAY,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: props.open ? "none" : "flex",
                      justifyContent: "center",
                    }}
                  >
                    <MonitorWeightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Peso"
                    sx={{
                      display: props.open ? "block" : "none",
                      textAlign: "center",
                    }}
                  />
                </ListItemButton> */}
              </List>
            </Collapse>
          </ListItem>
          {/* Separador */}
          <Divider sx={{ mt: 1 }} />
        </List>
        {usuario !== "" ? (
          <></>
        ) : (
          <>
            {" "}
            {/* Menu Dos */}
            <ListItem
              key={"Areas y Gateways"}
              disablePadding
              sx={{ display: "block" }}
            >
              {/* Item Areas Header*/}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: 1,
                  gap: 1,
                  color: pageActivated === 2 ? "white" : "black",
                  background:
                    pageActivated === 2 ? themeColors.BLUE1 : themeColors.GRAY,
                  // themeColors.BLUE1
                }}
              >
                <ListItemButton
                  onClick={() => {
                    handleMenuOptionSelected(2);
                    navigate("/home/areas");
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? "start" : "center",
                    px: 2.5,
                  }}
                >
                  <Box>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        color: pageActivated === 2 ? "white" : "black",
                      }}
                    >
                      <GpsNotFixedIcon />
                    </ListItemIcon>
                  </Box>

                  <ListItemText
                    primary={"ÁREAS"}
                    sx={{ opacity: props.open ? 1 : 0, textAlign: "center" }}
                  />
                </ListItemButton>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: 1,
                  gap: 1,
                  color: pageActivated === 3 ? "white" : "black",
                  background:
                    pageActivated === 3 ? themeColors.BLUE1 : themeColors.GRAY,
                  // themeColors.BLUE1
                }}
              >
                <ListItemButton
                  onClick={() => {
                    handleMenuOptionSelected(3);
                    navigate("/home/gateways");
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? "start" : "center",
                    px: 2.5,
                  }}
                >
                  <Box>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        color: pageActivated === 3 ? "white" : "black",
                      }}
                    >
                      <StorageIcon />
                    </ListItemIcon>
                  </Box>

                  <ListItemText
                    primary={"GATEWAYS"}
                    sx={{ opacity: props.open ? 1 : 0, textAlign: "center" }}
                  />
                </ListItemButton>
              </Box>
            </ListItem>
            {/* Separador */}
            <Divider sx={{ my: 1 }} />
          </>
        )}
      </Box>

      {/* Menu Configuracion */}
      {usuario !== "" ? (
        <></>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              background:
                pageActivated === 4 ? themeColors.BLUE1 : themeColors.GRAY,
              borderRadius: 2,
              color: pageActivated === 4 ? "white" : "black",
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItem
              key={"Configuración"}
              disablePadding
              sx={{ display: "block" }}
            >
              <Box>
                <ListItemButton
                  onClick={() => {
                    handleMenuOptionSelected(4);
                    navigate("/home/settings");
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? "initial" : "center",
                    px: 2.5,
                    display: "flex",
                    gap: 0,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      // mr: props.open ? 3 : "auto",
                      justifyContent: "center",
                      color: pageActivated === 4 ? "white" : "black",
                    }}
                  >
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Configuración"}
                    sx={{ opacity: props.open ? 1 : 0, textAlign: "center" }}
                  />
                </ListItemButton>
              </Box>
            </ListItem>
          </Box>
        </>
      )}

      {/* Menu LogOut */}
      <Box
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 0.5,
          mb: 4,
          color: pageActivated === 5 ? "white" : "black",
          background:
            pageActivated === 5 ? themeColors.BLUE1 : themeColors.GRAY,
        }}
      >
        <ListItem key={"LogOut"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={handleMenu}
            sx={{
              minHeight: 48,
              justifyContent: props.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: props.open ? 3 : "auto",
                justifyContent: "center",
                color: pageActivated === 5 ? "white" : "black",
              }}
            >
              <AccountCircleIcon />
            </ListItemIcon>

            <ListItemText
              primary={"Opciones"}
              sx={{ opacity: props.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
      <Menu
      
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ display: "flex", p: 1, justifyContent: "center", gap: 1 }}>
          <Box sx={{ display: "flex" }}>
            <AccountCircleIcon
              sx={{ height: "40px", width: "40px", color: themeColors.BLUE1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cliente !== "" ? (
              <Typography>
                {dataCliente.length === 0 ? cliente : dataCliente.nombre}
              </Typography>
            ) : (
              <Typography>{usuario}</Typography>
            )}
          </Box>
        </Box>
        <MenuItem
          sx={{ display: cliente !== "" ? "block" : "none" }}
          onClick={handleOpenPassword}
        >
          <Box sx={{display: "flex", gap: 1, justifyContent: "center"}}>
            <Box>
              <LockOpenIcon />
            </Box>
            <Box>Cambiar Contraseña</Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleOpen}>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center", textAlign:'center', flexGrow:1 }}>
            <Box sx={{display:'flex'}}>
              <LogoutIcon />
            </Box>
            <Box sx={{ display:'flex', flexGrow:1, justifyContent:'center'}}> Cerrar Sesión</Box>
          </Box>
        </MenuItem>
      </Menu>
      {/* Modal de Cerrar Sesion */}
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
          <LogOut />
        </Paper>
        {/* </Box> */}
      </Modal>
      {/* Modal para cambiar de clave */}
      <Modal
        open={openModalSetPassword}
        onClose={handleClosePassword}
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
          <SetPassword/>
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
