import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
// inputs typescript
import { ThemeProp } from "../types/theme/type.theme";
// helpers de temas
import { themeColors } from "../helpers/theme/theme.colors";
import { themeFonts } from "../helpers/theme/theme.fonts";
import { drawerWidth } from "../helpers/Home/DrawerStyle";

const theme = createTheme({
  palette: {
    // mode: "dark",
    mode: "light",
    background: {
      default: themeColors.GRAY,
    },
    primary: {
      main: themeColors.BLUE1,
      // main: themePalette.COLOR_BLACK
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: false,
        maxWidth: false,
      },
    },
    MuiAppBar: {
      defaultProps: {
        style: {},
      },
    },
    MuiInput:{
      defaultProps:{
        style:{
          borderRadius: 8
        }
      }
    },
    MuiMenu:{
      defaultProps:{
        style:{
          borderRadius: 20
        }
      }
    },
    MuiButton: {
      defaultProps: {
        style: {
          // color: themeColors.BLACK,
          borderRadius: 8,
          border:'solid',
          borderWidth: 1,
          borderColor: themeColors.GRAY2
          
        },
      },
    },
    MuiSelect:{
      defaultProps:{
        style:{
          background: themeColors.GRAY2,
          border:'none',
          borderRadius:8,
          textDecoration:'none'
        }
      }
    }
  },

  typography: {
    fontFamily: themeFonts.FONT_POPINS,
  },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
