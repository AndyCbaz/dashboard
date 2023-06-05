import React from "react"; //MUI
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./Loader.css";
interface LoaderProp {
  estado: number;
}
export const Loader: React.FC<LoaderProp> = ({ estado }) => {
  return (
    <>
      {
        estado === 0 ? (    
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems:'center',
            flexGrow:1,
            width: "100%",
          }}
        >
          <span className="loader"></span>
        </Box>)
        : estado === 1 ? (        
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems:'center',
            flexGrow:1,
            width: "100%",
          }}
        >
          <Typography variant="h6">
            No existen dispositivos registrados
          </Typography>
        </Box>)
        : estado === 2 ? (<>  
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems:'center',
            flexGrow:1,
            width: "100%",
          }}
        >
          <Typography variant="h6">
            No existen áreas registradas
          </Typography>
        </Box></>)
        : (<></>)
      }
    </>
  );
};


