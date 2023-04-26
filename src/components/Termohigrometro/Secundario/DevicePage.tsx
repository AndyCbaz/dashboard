import React, { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box/Box";
//Otros componentes
import { CardDispositivos } from "./CardDispositivos";
//redux
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectDataCliente,
  selectDataUsuario,
  selectClientCI,
  selectUsuario,
  setDataUsuario,
} from "../../../features/userSlice";
import {
  selectDevicesResumen,
  selectUserDataGlobal,
  setDevicesResumen,
  setUserDataGlobal,
} from "../../../features/userDataSlice";
//react router dom
import { useLoaderData } from "react-router-dom";
//Inputs
import {
  IAreas,
  IZonas,
  IDispositivos,
} from "../../../types/Api/interfaceApiUserLogin";
import { getDataUser } from "../../../services/DevicePage/getDataUser";
import { setSearchDisplayState } from "../../../features/headerDisplay";
import { getDataLoginUser } from "../../../services/DevicePage/getDataLoginUser";
import { getDataDevicesResumen } from "../../../services/DevicePage/getDataDevicesResumen";
import { Loader } from "../../Loader/Loader";

export const DevicePage = () => {
  //redux
  const dispatch = useAppDispatch();
  const usuario = String(localStorage.getItem("usuario"));
  // const usuario = useAppSelector(selectUsuario)
  const dataUserGlobal = useAppSelector(selectUserDataGlobal);
  const dataDevicesResumen = useAppSelector(selectDevicesResumen);





  useEffect(() => {
    dispatch(setSearchDisplayState(true));
    if (usuario !== "") {
      getDataLoginUser(usuario)
        .then((data) => {
          dispatch(setDataUsuario(data));
          getDataUser(data.idusuario, data.idcliente)
            .then((data) => {
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
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(dataDevicesResumen);
  }, [usuario]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* LISTA DE DISPOSITIVOS */}
      {dataUserGlobal.length === 0 || dataDevicesResumen.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          {" "}
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
            {dataUserGlobal.areas.map((area: IAreas) =>
              area.zonas.map((zonas: IZonas) =>
                zonas.dispositivos.map((dispositivo, index) => {
                  return (
                    <CardDispositivos
                      //para consulta
                      idmac={dispositivo.idmacgateway}
                      iddispositivo={dispositivo.iddispositivo}
                      //renderizado
                      bateria={dataDevicesResumen[index].bateria}
                      senial={dataDevicesResumen[index].nivelSenial}
                      actualTemp={dataDevicesResumen[index].actualTemp}
                      actualHum={dataDevicesResumen[index].actualHum}
                      nombre={dispositivo.macdispositivo}
                      zona={zonas.nombrezona}
                      key={dispositivo.iddispositivo}
                      state={dispositivo.online}
                      tmax={dataDevicesResumen[index].maximoTemp}
                      tmin={dataDevicesResumen[index].minimoTemp}
                      tprom={dataDevicesResumen[index].avgTemp}
                      hmax={dataDevicesResumen[index].maximoHum}
                      hmin={dataDevicesResumen[index].minimoHum}
                      hprom={dataDevicesResumen[index].avgHum}
                      dataT={true}
                      dataH={true}
                    />
                  );
                })
              )
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
