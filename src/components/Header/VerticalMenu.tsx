import * as React from "react";
import { DrawerHeader } from "../../helpers/Home/DrawerStyle";
import Box from "@mui/material/Box";
import { LogoSection } from "./LogoSection";
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
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { themeColors } from "../../helpers/theme/theme.colors";
import { useNavigate } from "react-router-dom";
import { NewZone } from "./NewZone";

interface VerticalMenuProp {
  open: boolean;
}

export const VerticalMenu = (props: VerticalMenuProp) => {
  const [open, setOpen] = React.useState(true);
  const [openZone, setOpenZone] = React.useState(true);
  const [pageActivated, setPageActivated] = React.useState(0);
  const [subpageActivated, setSubpageActivated] = React.useState("a");
  const [subpageZone, setSubPageZone] = React.useState("a");
  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();

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
    if ((pageActivated === 1)||(pageActivated === 0)) {
      setSubpageActivated(subpage);
    }
  };
  const handleSubMenuOptionSelectedZones = (subpagezone: string) => {
    if ((pageActivated === 1)||(pageActivated === 0)) {
      setSubPageZone(subpagezone);
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
      <Box sx={{display:'flex'}}>
        <DrawerHeader>
          <Box sx={{ ...(!props.open && { display: "none" }) }}>
            <LogoSection />
          </Box>
        </DrawerHeader>
      </Box>
      {/* Menu de Dashborad */}
      <Box sx={{ flexGrow: 1, mx:1 }}>
        <List>
          <ListItem key={"Dashboard"} disablePadding sx={{ display: "block" }}>
            {/* Item Dashboard */}
            <Box
              sx={{
                borderRadius: 1,
                // mx: 0.5,
                my: 0.5,
                background:
                  pageActivated === 1 || pageActivated === 0
                    ? themeColors.BLUE1
                    : themeColors.GRAY,
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
                {open ? <ExpandLess /> : <ExpandMore />}

                <ListItemText
                  primary={"DASHBOARD"}
                  sx={{ opacity: props.open ? 1 : 0 }}
                />
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
                    navigate("/");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    
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
                    navigate("/peso");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
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
          <Divider sx={{ mt: 2 }} />
        </List>
        {/* Menu de Zonas */}
        <List>
          <ListItem key={"Zones"} disablePadding sx={{ display: "block" }}>
            {/* Item Zonas Header*/}
            <Box
              sx={{
                borderRadius: 1,
                // mx: 0.5,
                my: 0.5,
                background:
                  pageActivated === 1 || pageActivated === 0
                    ? themeColors.BLUE1
                    : themeColors.GRAY,
                // themeColors.BLUE1
              }}
            >
              <ListItemButton
                onClick={() => {
                  handleMenuOptionSelected(1);
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
                    <BusinessCenterIcon />
                  </ListItemIcon>
                </Box>
                {openZone ? <ExpandLess /> : <ExpandMore />}

                <ListItemText
                  primary={"ZONAS"}
                  sx={{ opacity: props.open ? 1 : 0 }}
                />
              </ListItemButton>
            </Box>
            {/* Zonas Disponibles */}
            <Collapse in={openZone} timeout={600} unmountOnExit>
              <List
                component="div"
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Zona 1 */}
                <ListItemButton
                  onClick={() => {
                    handleSubMenuOptionSelectedZones("a");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    "&:hover": { background: themeColors.BLUE2 },
                    background:
                      subpageZone === "a"
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
                    <Typography>Zona1</Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary="Bodega"
                    sx={{
                      display: props.open ? "block" : "none",
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
                {/* Zona 2 */}
                <ListItemButton
                  onClick={() => {
                    handleSubMenuOptionSelectedZones("b");
                  }}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    "&:hover": { background: themeColors.BLUE2 },
                    background:
                      subpageZone === "b"
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
                    <Typography>Zona2</Typography>
                  </ListItemIcon>
                  <ListItemText
                    primary="Almacen"
                    sx={{
                      display: props.open ? "block" : "none",
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
                {/* Boton Agregar Zona */}
                <ListItemButton
                  onClick={() => {handleOpen()}}
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: " center",
                    width: "100%",
                    "&:hover": { background: themeColors.BLUE1 },
                    background: themeColors.GRAY,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      // border:'solid',
                      minWidth: 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <AddLocationAltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Añadir Zona"
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
          <Divider sx={{ mt: 2 }} />
        </List>
      </Box>

      {/* Menu Configuracion */}
      <Box
        sx={{
          background:
            pageActivated === 2 ? themeColors.BLUE1 : themeColors.GRAY,
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
                handleMenuOptionSelected(2);
                navigate("/settings");
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
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Configuración"}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </ListItemButton>
          </Box>
        </ListItem>
      </Box>
      {/* Menu LogOut */}
      <Box
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 0.5,
          mb: 4,
          background:
            pageActivated === 3 ? themeColors.BLUE1 : themeColors.GRAY,
        }}
      >
        <ListItem key={"LogOut"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => {
              handleMenuOptionSelected(3);
              navigate("/logout");
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
      {/* Modal de Agregar Zona */}
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
            width: { xs: "75%", sm:'25%' },
            ml: {xs:"15%", sm: "36%"}, mt:'20%'
          }}
        >
          <NewZone />
        </Paper>
        {/* </Box> */}
      </Modal>
    </Box>
  );
};
