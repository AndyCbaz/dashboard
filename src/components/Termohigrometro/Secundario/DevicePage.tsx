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
  selectAreasByClient,
  selectDevicesSelected,
  selectResumenAllDevices,
  selectResumenAllDevicesSelected,
  selectUsersByClient,
  selectZonasByClient,
  setAllDevices,
  setAreasByClient,
  setDataGlobalClient,
  setDevicessByClient,
  setResumenAllDevices,
  setUsersByClient,
  setZonasByAreas,
  setZonasByClient,
} from "../../../features/cliente/clientComboMacgateways";
import { CardDispositivosSelected } from "./CardDispositivosSelected";
import { selectAreasByDevices, setAreasByDevices } from "../../../features/todos/search";

export const DevicePage = () => {
  //redux
  const dispatch = useAppDispatch();
  const usuario = String(localStorage.getItem("usuario"));
  const idusuario = String(localStorage.getItem("idusuario"));
  const cliente = String(localStorage.getItem("cliente"));
  const idcliente = Number(localStorage.getItem("idcliente"));
  const zonas = useAppSelector(selectZonasByClient);
  const areas = useAppSelector(selectAreasByDevices);
  // const zonaSelected = useAppSelector(selec)

  const dataCliente = useAppSelector(selectDataCliente);
  const usuariosporcliente = useAppSelector(selectUsersByClient);
  //redux usuario
  const dataUsuario = useAppSelector(selectDataUsuario);
  const resumenalldevices = useAppSelector(selectResumenAllDevices);
  const alldevices = useAppSelector(selectAllDevices);
  const resumenalldevicesselected = useAppSelector(
    selectResumenAllDevicesSelected
  );
  const devicesselected = useAppSelector(selectDevicesSelected);
  //redux usuario y cliente
  const dataUserGlobal = useAppSelector(selectUserDataGlobal);
  //redux resultado
  const dataDevicesResumen = useAppSelector(selectDevicesResumen);

  const handleShowServerToast = () => {
    toast.warning("Servidor sin Conexión");
  };

  const devicesSelected = useAppSelector(selectDevicesSelected);

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
          let zonas: any = [];
          let areas: any = [];
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
                            {nombrezona: devicesbyclient[i].areas[j].zonas[k].nombrezona}
                          );
                          areas.push({nombrearea: devicesbyclient[i].areas[j].nombrearea})
                        }
                        
                      }
                    }
                  }
                }
              }
            }
          }
          dispatch(setZonasByClient(zonas));
          dispatch(setAreasByDevices(areas));
          console.log(zonas)
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
          let zonas: any = [];
          let areas: any = [];
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
                          areas.push(devicesbyclient[i].areas[j].nombreareas)
                        }
                      }
                      
                    }
                  }
                }
              }
            }
          }
          
          dispatch(setZonasByClient(zonas));
          dispatch(setAreasByDevices(areas));
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
        //Si no se ha seleecionado un dispositivo
        devicesSelected.length === 0 ||
        resumenalldevicesselected.length === 0 ? (
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
                justifyContent: "start",
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
                  nombre={alldevices[index].nombreDispositivo}
                  zona={zonas[index].nombrezona}
                  area={areas[index].nombrearea}
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
        ) : (
          //si se se ha seleccionado un dispositivo
          // <Loader/>
          resumenalldevicesselected.map((device: any, index:any) => (
            <Box key={index} sx={{display:"flex",mt:1}}>
            <CardDispositivosSelected
              //para consulta
              idmac={devicesSelected[index].idmacgateway}
              iddispositivo={devicesSelected[index].iddispositivo}
              //redux
              tmaxgraf={devicesSelected[index].maxTemperatura}
              tmingraf={devicesSelected[index].minTemperatura}
              hmaxgraf={devicesSelected[index].maxHumedad}
              hmingraf={devicesSelected[index].minHumedad}
              //renderizado
              bateria={device.bateria}
              senial={device.nivelSenial}
              actualTemp={device.actualTemp}
              actualHum={device.actualHum}
              // nombre={devicesSelected[0].nombreDispositivo}
              nombre={devicesSelected[index].nombreDispositivo}
              zona={zonas[index].nombrezona}
              // area={areas[index].nombrearea}
              key={devicesSelected[index].iddispositivo}
              index={devicesSelected[index].iddispositivo}
              state={devicesSelected[index].online}
              tmax={device.maximoTemp}
              tmin={device.minimoTemp}
              tprom={device.avgTemp}
              hmax={device.maximoHum}
              hmin={device.minimoHum}
              hprom={device.avgHum}
              dataT={device.infoset === false ? false : true}
              dataH={device.infoset === false ? false : true}
            />
            </Box>
          ))
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
              nombre={alldevices[index].nombreDispositivo}
              zona={zonas[index].nombrezona}
              area={areas[index].nombrearea}
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
