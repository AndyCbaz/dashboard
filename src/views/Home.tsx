import * as React from "react";
// MUI
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
// Iconos
import PersonIcon from "@mui/icons-material/Person";
// Otros componentes
import { themeColors } from "../helpers/theme/theme.colors";
import { DrawerBig, drawerWidth } from "../helpers/Home/DrawerStyle";
import { AppBar } from "../helpers/Home/AppBarStyle";
import { HomeProps } from "../types/home/homeProps";
import { VerticalMenu } from "../components/Header/VerticalMenu";
import { SearchSection } from "../components/Header/SearchSection";
// React Router Dom
import { Outlet } from "react-router-dom";
// Redux
import { selectUser, selectClient } from "../features/userSlice";
import { useAppSelector } from "../app/hooks";

export default function Home(props: HomeProps) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const user = useAppSelector(selectUser);
  const client = useAppSelector(selectClient);

  const localClient = localStorage.getItem('cliente')

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: { xs: themeColors.WHITE, sm: themeColors.GRAY },
          color: themeColors.BLACK,
          border: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              // ...(open && { display: "none" }),
              display: { sm: "none" },
              color: themeColors.BLUE1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                // border: "solid",
                borderRadius: 4,
                background: "white",
                px: 0.5,
              }}
            >
              <SearchSection />
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "end", display:'flex', justifyContent:'end', alignItems:'center', gap:1 }}>
              <PersonIcon />
              <Typography
                variant="h6"
                noWrap
                component="div"
                color={themeColors.BLUE1}
              >
                Usuario: {localClient}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Menu Mobile */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      >
        <VerticalMenu open={mobileOpen} />
      </Drawer>
      {/* Menu Desktop */}
      <DrawerBig
        variant="permanent"
        open={open}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onMouseEnter={() => {
          setOpen(true);
        }}
        sx={{ "& .MuiDrawer-paper": { borderRight: "none", boxShadow: 8 } }}
      >
        <VerticalMenu open={open} />
      </DrawerBig>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // border: "solid",
          display: "flex",
          mt: 6,
          background: themeColors.GRAY,
        }}
      >
        {/* <Toolbar /> */}

        <Outlet />
      </Box>
    </Box>
  );
}
