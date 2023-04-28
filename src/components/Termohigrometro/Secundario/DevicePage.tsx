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
} from "../../../features/userSlice";
import {
  //usuario
  selectDevicesResumen,
  selectUserDataGlobal,
  //cliente
} from "../../../features/userDataSlice";

//Inputs
import { IAreas, IZonas } from "../../../types/Api/interfaceApiUserLogin";
import { getDataUser } from "../../../services/DevicePage/getDataUser";
import { setSearchDisplayState } from "../../../features/headerDisplay";
import { getDataLoginUser } from "../../../services/DevicePage/getDataLoginUser";
import { getDataDevicesResumen } from "../../../services/DevicePage/getDataDevicesResumen";
//other components
import { Loader } from "../../Loader/Loader";
//toast
import Toast from "../../../components/Toast/Toast";
import { toast } from "react-toastify";
//funciones
import { getDataLoginClient } from "../../../services/DevicePage/getDataLoginClient";
import { getUsersByClient } from "../../../services/DevicePage/cliente/getUsersByClient";
import {
  selectAllDevices,
  selectResumenAllDevices,
  selectUsersByClient,
  selectZonasByClient,
  setAllDevices,
  setDataGlobalClient,
  setDevicessByClient,
  setResumenAllDevices,
  setUsersByClient,
  setZonasByAreas,
} from "../../../features/cliente/clientComboMacgateways";

export const DevicePage = () => {
  //redux
  const dispatch = useAppDispatch();
  const usuario = String(localStorage.getItem("usuario"));
  const idusuario = String(localStorage.getItem("idusuario"));
  const cliente = String(localStorage.getItem("cliente"));
  const idcliente = Number(localStorage.getItem("idcliente"));
  const zonas = useAppSelector(selectZonasByClient);

  const dataCliente = useAppSelector(selectDataCliente);
  const usuariosporcliente = useAppSelector(selectUsersByClient);
  //redux usuario
  const dataUsuario = useAppSelector(selectDataUsuario);
  const resumenalldevices = useAppSelector(selectResumenAllDevices);
  const alldevices = useAppSelector(selectAllDevices);
  //redux usuario y cliente
  const dataUserGlobal = useAppSelector(selectUserDataGlobal);
  //redux resultado
  const dataDevicesResumen = useAppSelector(selectDevicesResumen);

  const handleShowServerToast = () => {
    toast.warning("Servidor sin Conexión");
  };

  useEffect(() => {
    dispatch(setSearchDisplayState(true));
    //////////////////////////////////////////////
    // console.log(cliente);
    // console.log(usuario);
    // console.log(dataUserGlobal);
    // console.log(dataDevicesResumen);
    /////////////////////cliente//////////////////////////
    if (cliente !== "") {
      //1. LISTA DE USUARIOS POR CLIENTE Y ALMACENO LISTA EN

      getUsersByClient(idcliente).then(async (data) => {
        if (data !== undefined) {
          dispatch(setUsersByClient(data));
          //2. LISTA DE DISPOSITIVOS POR USUARIO
          let devicesbyclient: any = [];
          for (let i = 0; i < data.length; i++) {
            const device = await getDataUser(data[i].idusuario, idcliente);
            devicesbyclient.push(device);
          }
          // console.log(devicesbyclient)
          dispatch(setDevicessByClient(devicesbyclient));
          let dataforresumenbyuser = [];
          if (devicesbyclient.length !== 0) {
            for (let i = 0; i < devicesbyclient.length; i++) {
              if (devicesbyclient[i].areas.length !== 0) {
                for (let j = 0; j < devicesbyclient[i].areas.length; j++) {
                  // console.log(devicesbyclient[i].areas[j])
                  if (devicesbyclient[i].areas[j].zonas.length !== 0) {
                    for (
                      let k = 0;
                      k < devicesbyclient[i].areas[j].zonas.length;
                      k++
                    ) {
                      // console.log(devicesbyclient[i].areas[j].zonas[k])
                      let zonas: any = [];
                      if (
                        devicesbyclient[i].areas[j].zonas[k].dispositivos
                          .length !== 0
                      ) {
                        for (
                          let l = 0;
                          l <
                          devicesbyclient[i].areas[j].zonas[k].dispositivos
                            .length;
                          l++
                        ) {
                          // console.log(devicesbyclient[i].areas[j].zonas[k].dispositivos[l])
                          dataforresumenbyuser.push(
                            devicesbyclient[i].areas[j].zonas[k].dispositivos[l]
                          );
                          zonas.push(
                            devicesbyclient[i].areas[j].zonas[k].nombrezona
                          );
                        }
                        dispatch(setZonasByAreas(zonas));
                      }
                    }
                  }
                }
              }
            }
          }
          // console.log(dataforresumenbyuser)
          dispatch(setAllDevices(dataforresumenbyuser));
          if (dataforresumenbyuser.length !== 0) {
            let resumenbydevice: any = [];
            for (let i = 0; i < dataforresumenbyuser.length; i++) {
              const res = await getDataDevicesResumen(
                dataforresumenbyuser[i].idmacgateway,
                dataforresumenbyuser[i].iddispositivo
              );
              if (res !== undefined) {
                resumenbydevice.push(res);
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
                resumenbydevice.push(dataError);
              }
              // console.log(res);

              // console.log(dataforresumenbyuser[i].idmacgateway);
              // console.log(dataforresumenbyuser[i].iddispositivo);
            }
            dispatch(setResumenAllDevices(resumenbydevice));
          }
        }
      });

      //////////////////////////////
    } else if (usuario !== "") {
      ////////USUARIO///////////////
      let devicesbyclient: any = [];
      getDataUser(idusuario, idcliente).then(async (data) => {
        if (data !== undefined) {
          devicesbyclient.push(data);
          dispatch(setDevicessByClient(devicesbyclient));
          let dataforresumenbyuser = [];
          if (devicesbyclient.length !== 0) {
            for (let i = 0; i < devicesbyclient.length; i++) {
              if (devicesbyclient[i].areas.length !== 0) {
                for (let j = 0; j < devicesbyclient[i].areas.length; j++) {
                  // console.log(devicesbyclient[i].areas[j])
                  if (devicesbyclient[i].areas[j].zonas.length !== 0) {
                    for (
                      let k = 0;
                      k < devicesbyclient[i].areas[j].zonas.length;
                      k++
                    ) {
                      // console.log(devicesbyclient[i].areas[j].zonas[k])
                      let zonas: any = [];
                      if (
                        devicesbyclient[i].areas[j].zonas[k].dispositivos
                          .length !== 0
                      ) {
                        for (
                          let l = 0;
                          l <
                          devicesbyclient[i].areas[j].zonas[k].dispositivos
                            .length;
                          l++
                        ) {
                          // console.log(devicesbyclient[i].areas[j].zonas[k].dispositivos[l])
                          dataforresumenbyuser.push(
                            devicesbyclient[i].areas[j].zonas[k].dispositivos[l]
                          );
                          zonas.push(
                            devicesbyclient[i].areas[j].zonas[k].nombrezona
                          );
                        }
                        dispatch(setZonasByAreas(zonas));
                      }
                    }
                  }
                }
              }
            }
          }
          // console.log(dataforresumenbyuser)
          dispatch(setAllDevices(dataforresumenbyuser));
          if (dataforresumenbyuser.length !== 0) {
            let resumenbydevice: any = [];
            for (let i = 0; i < dataforresumenbyuser.length; i++) {
              const res = await getDataDevicesResumen(
                dataforresumenbyuser[i].idmacgateway,
                dataforresumenbyuser[i].iddispositivo
              );
              if (res !== undefined) {
                resumenbydevice.push(res);
              } else {
                let dataError = {
                  bateria: null,
                  nivelSenial: null,
                  actualTemp: 0,
                  maximoTemp: 0,
                  minimoTemp: 0,
                  avgTemp: 0,
                  actualHum: 0,
                  maximoHum: 0,
                  minimoHum: 0,
                  avgHum: 0,
                  infoset: false,
                };
                resumenbydevice.push(dataError);
              }
              // console.log(res);

              // console.log(dataforresumenbyuser[i].idmacgateway);
              // console.log(dataforresumenbyuser[i].iddispositivo);
            }
            dispatch(setResumenAllDevices(resumenbydevice));
          }
        }
      });
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* LISTA DE DISPOSITIVOS */}
      {cliente !== "" ? (
        //device page del cliente
        resumenalldevices.length === 0 || alldevices.length === 0 ? (
          <Loader />
        ) : (
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
            {resumenalldevices.map((resumen: any, index: any) => (
              <CardDispositivos
                //para consulta
                idmac={alldevices[index].idmacgateway}
                iddispositivo={alldevices[index].iddispositivo}
                //redux
                tmaxgraf={resumen.maxTemperatura}
                tmingraf={resumen.minTemperatura}
                hmaxgraf={resumen.maxHumedad}
                hmingraf={resumen.minHumedad}
                //renderizado
                bateria={resumen.bateria}
                senial={resumen.nivelSenial}
                actualTemp={resumen.actualTemp}
                actualHum={resumen.actualHum}
                nombre={alldevices[index].macdispositivo}
                zona={zonas[index]}
                key={alldevices[index].iddispositivo}
                state={alldevices[index].online}
                tmax={resumen.maximoTemp}
                tmin={resumen.minimoTemp}
                tprom={resumen.avgTemp}
                hmax={resumen.maximoHum}
                hmin={resumen.minimoHum}
                hprom={resumen.avgHum}
                dataT={resumen.infoset === false ? false : true}
                dataH={resumen.infoset === false ? false : true}
              />
            ))}
          </Box>
        )
      ) : //device page del usuario
      resumenalldevices.length === 0 || alldevices.length === 0 ? (
        <Loader />
      ) : (
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
          {resumenalldevices.map((resumen: any, index: any) => (
            <CardDispositivos
              //para consulta
              idmac={alldevices[index].idmacgateway}
              iddispositivo={alldevices[index].iddispositivo}
              //redux
              tmaxgraf={alldevices[index].maxTemperatura}
              tmingraf={alldevices[index].minTemperatura}
              hmaxgraf={alldevices[index].maxHumedad}
              hmingraf={alldevices[index].minHumedad}
              //renderizado
              bateria={resumen.bateria}
              senial={resumen.nivelSenial}
              actualTemp={resumen.actualTemp}
              actualHum={resumen.actualHum}
              nombre={alldevices[index].macdispositivo}
              zona={zonas[index]}
              key={alldevices[index].iddispositivo}
              state={alldevices[index].online}
              tmax={resumen.maximoTemp}
              tmin={resumen.minimoTemp}
              tprom={resumen.avgTemp}
              hmax={resumen.maximoHum}
              hmin={resumen.minimoHum}
              hprom={resumen.avgHum}
              dataT={resumen.infoset === false ? false : true}
              dataH={resumen.infoset === false ? false : true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
