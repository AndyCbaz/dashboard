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

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoSectionShort } from "./LogoSectionShort";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";

import { themeColors } from "../../helpers/theme/theme.colors";
//react router dom
import { useNavigate } from "react-router-dom";
//Other components
import { LogOut } from "../LogOut/LogOut";
import { LogoSection } from "./LogoSection";
//Redux
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsuario, setDataUsuario } from "../../features/userSlice";

import {
  setDevicesResumen,
  setUserDataGlobal,
} from "../../features/userDataSlice";
//Funciones
import { getDataLoginUser } from "../../services/DevicePage/getDataLoginUser";
import { getDataUser } from "../../services/DevicePage/getDataUser";
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";

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
  //React Router Dom
  const navigate = useNavigate();
  //REDUX
  const dispatch = useAppDispatch();
  // const usuario = localStorage.getItem('usuario');
  const usuario = useAppSelector(selectUsuario);

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
    if (usuario !== "") {
      getDataLoginUser(usuario).then((data) => {
        dispatch(setDataUsuario(data));
        getDataUser(data.idusuario, data.idcliente).then((data) => {
          dispatch(setUserDataGlobal(data));
          let devices: any = [];
          for (let i = 0; i < data.areas.length; i++) {
            for (let j = 0; j < data.areas[i].zonas.length; j++) {
              for (
                let k = 0;
                k < data.areas[i].zonas[j].dispositivos.length;
                k++
              ) {
                getDataDevicesResumen(
                  data.areas[i].zonas[j].dispositivos[k].idmacgateway,
                  data.areas[i].zonas[j].dispositivos[k].iddispositivo
                ).then((data) => {
                  devices.push(data);
                  dispatch(setDevicesResumen(devices));
                });
              }
            }
          }
        });
      });
    }
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
      <Box sx={{ display: "flex", height: "50px", justifyContent: "center" }}>
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
                    <GridViewIcon />
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
                <ListItemButton
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
                </ListItemButton>
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
            {/* Menu de Aréas */}
            <ListItem key={"Areas"} disablePadding sx={{ display: "block" }}>
              {/* Item Areas Header*/}
              <Box
                sx={{
                  borderRadius: 1,

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
                pageActivated === 3 ? themeColors.BLUE1 : themeColors.GRAY,
              borderRadius: 2,
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
                    handleMenuOptionSelected(3);
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
          background:
            pageActivated === 4 ? themeColors.BLUE1 : themeColors.GRAY,
        }}
      >
        <ListItem key={"LogOut"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => {
              handleMenuOptionSelected(4);
              handleOpen();
            }}
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
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText
              primary={"Salir"}
              sx={{ opacity: props.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
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
    </Box>
  );
};
