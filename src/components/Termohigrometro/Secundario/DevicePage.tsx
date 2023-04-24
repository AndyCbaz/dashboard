import React, { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box/Box";
//Otros componentes
import { CardDispositivos } from "./CardDispositivos";

//react router dom
import { useLoaderData } from "react-router-dom";
//Inputs
import {
  IAreas,
  IZonas,
  IDispositivos,
} from "../../../types/Api/interfaceApiUserLogin";

export const DevicePage = () => {
  const { dataApiUser, devices }: any = useLoaderData();
  const [dataDevice,setDataDevice] = useState(devices);
  // const a = useAppSelector(selectDataDeviceUser);
  // const dispacth = useAppDispatch();

//   useEffect(()=>{
//     localStorage.setItem('idcliente',String(dataApiUser.idcliente))
// console.log(dataApiUser)
//   },[])

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* LISTA DE DISPOSITIVOS */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* <CardByDevice/> */}
        {dataApiUser.areas.map((area: IAreas) =>
          area.zonas.map((zonas: IZonas) =>
            zonas.dispositivos.map((dispositivo, index) => {
              
              return (
                <CardDispositivos
                //para consulta
                idmac={dispositivo.idmacgateway}
                iddispositivo={dispositivo.iddispositivo}
                //renderizado
                bateria={dataDevice[index].bateria}
                  senial={dataDevice[index].nivelSenial}
                  actualTemp={dataDevice[index].actualTemp}
                  actualHum={dataDevice[index].actualHum}
                  nombre={dispositivo.macdispositivo}
                  zona={zonas.nombrezona}
                  key={area.nombrearea}
                  state={dispositivo.online}
                  tmax={dataDevice[index].maximoTemp}
                  tmin={dataDevice[index].minimoTemp}
                  tprom={dataDevice[index].avgTemp}
                  hmax={dataDevice[index].maximoHum}
                  hmin={dataDevice[index].minimoHum}
                  hprom={dataDevice[index].avhHum}
                  dataT={true}
                  dataH={true}
                />
              );
            })
          )
        )}
      </Box>
    </Box>

  );
};
