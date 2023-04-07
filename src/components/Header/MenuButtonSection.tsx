// import React from "react";

import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { themePalette } from "../../config/theme.config";
import { useAppDispatch } from "../../app/hooks";
import { setMenuState } from "../../app/open/openSlice";



export const MenuButtonSection = () => {
  
  const dispatch = useAppDispatch();



  return (
    <Box>
      <IconButton
        aria-label="menu"
        sx={{
          "&:hover": {
            backgroundColor: "#1ABC9C",
            color: themePalette.BG_CONTAINER,
          },
          backgroundColor: themePalette.GREEN_C,
        }}
        onClick={() => dispatch(setMenuState())}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};
