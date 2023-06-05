import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CardProp {
    handleOpen:any
}
export const CardNewDevices: React.FC<CardProp> = ({handleOpen}) => {
  

  return (
    <>
      
      <Card
        sx={{
          display: "flex",
          boxShadow: 10,

          borderRadius: 4,
          "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
        }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
            pb: 3,
            px: 3,
          }}
          onClick={handleOpen}

        >
          {/* Area de Indicadores Visuales */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              m: 0.5,
            }}
          >
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
              <Typography variant="h6">Agregar Dispositivo</Typography>
              <AddCircleIcon fontSize="large"/>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};
