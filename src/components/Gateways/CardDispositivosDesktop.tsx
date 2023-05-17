import React from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { Link } from "react-router-dom";
import { themeColors } from "../../helpers/theme/theme.colors";
import { getDevicesSelectedInfo } from "../../services/DevicePage/cliente/getDevicesSelectedInfo";
import { useAppDispatch } from "../../app/hooks";
import {
  setDevicesSelected,
  setResumenAllDevicesSelected,
} from "../../features/cliente/clientComboMacgateways";
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";
import { getAreasByDevice } from "../../services/Areas/getAreaByDevice";
import { setNombreArea, setNombreZona } from "../../features/todos/search";
import { getZonaByDevice } from "../../services/Areas/getZonaByDevice";

interface CardProp {
  index: number;
  state: number;
  nombre: string;
  mac:string;
  idgateway: string;
  iddispositivo: string;
}

export const CardDispositivosGatewaysDesktop: React.FC<CardProp> = ({
  index,
  state,
  nombre,
  mac,
  idgateway,
  iddispositivo,
}) => {
  const dispatch = useAppDispatch();
  const handleDevicesSelected = () => {
    getDevicesSelectedInfo(Number(idgateway), Number(iddispositivo)).then(
      (data) => {
        // console.log(data)
        dispatch(setDevicesSelected(data));
      }
    );
    getDataDevicesResumen(Number(idgateway), Number(iddispositivo)).then(
      (data) => {
        // console.log(data)
        let a = [];
        if (data !== undefined) {
          a.push(data);
        } else {
          let dataError = {
            bateria: null,
            nivelSenial: null,
            actualTemp: null,
            maximoTemp: null,
            minimoTemp: null,
            avgTemp: null,
            actualHum: null,
            maximoHum: null,
            minimoHum: null,
            avgHum: null,
            infoset: false,
          };
          a.push(dataError);
        }

        // dispatch(setResumenAllDevicesSelected(data))
        getAreasByDevice(Number(iddispositivo)).then((data)=>{
            if(data!==undefined){
              dispatch(setNombreArea(data[0].nombrearea))
            // dispatch(setNombreArea('fe'))
              // console.log(data[0].nombrearea)
              
            }
          })
          getZonaByDevice(Number(iddispositivo)).then((data)=>{
            if(data!==undefined){
              // console.log(data[0].nombrezona)
              dispatch(setNombreZona(data[0].nombrezona))
            }
          })
        dispatch(setResumenAllDevicesSelected(a));
      }
    );
  };

  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        // boxShadow: 10,
        boxShadow: 0,
        background: themeColors.GRAY,
        borderRadius: 4,
        width: "140px",
        "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
      }}
    >
      <CardActionArea
        component={Link}
        to="/home/"
        sx={{ py:1, px: 2 }}
        onClick={handleDevicesSelected}
      >
        <Box sx={{ display: "flex",  }}>
          <Box sx={{display:'flex', flexGrow:1, justifyContent: "center", alignItems:'center'}}>
            <CircleIcon
              sx={{
                color: state !== 1 ? themeColors.RED3 : themeColors.GREEN,
                borderRadius: 4,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center",flexGrow:1 }}>
            <DevicesOtherIcon
              sx={{ width: "50px", height: "50px", color: themeColors.BLUE1 }}
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">{nombre}</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">{mac}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
