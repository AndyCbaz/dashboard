import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { themeColors } from "../../helpers/theme/theme.colors";

export const CardUsuarios = () => {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 10,
        borderRadius: 4,
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },

      }}
    >
      <CardActionArea sx={{pt:1,pb:1.5,px:2}}>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PeopleAltIcon
            sx={{ width: "70px", height: "70px", color: themeColors.BLUE1 }}
          />
        </Box>
        <Box sx={{textAlign:'center'}}>
          <Typography>USUARIOS</Typography>
        </Box>
 
      </CardActionArea>
    </Card>
  );
};
