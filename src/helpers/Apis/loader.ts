//funciones
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";
import { getDataLoginUser } from "../../services/DevicePage/getDataLoginUser";
import { getDataUser } from "../../services/DevicePage/getDataUser";
import { getDataDevicesDetalle } from "../../services/Results/getDataDeviceDetalle";
import {
  IDataUserLogin,
  IData,
  IDataApiDevice,
} from "../../types/Api/interfaceApiUserLogin";

//API DE DATA USER LOADING
//Consulta api
//api 1 getuser data login

export const dataLoader = async () => {
  const dataApiLoginUser: IDataUserLogin = await getDataLoginUser("usuarioB");
  const dataApiUser: IData = await getDataUser(
    dataApiLoginUser.idusuario,
    dataApiLoginUser.idcliente
  );
  // funcion de card por dispositivo
  // const CardByDevice = async () => {
  let devices = [];
  for (let i = 0; i < dataApiUser.areas.length; i++) {
    for (let j = 0; j < dataApiUser.areas[i].zonas.length; j++) {
      for (
        let k = 0;
        k < dataApiUser.areas[i].zonas[j].dispositivos.length;
        k++
      ) {
        const a = await getDataDevicesResumen(
          dataApiUser.areas[i].zonas[j].dispositivos[k].idmacgateway,
          dataApiUser.areas[i].zonas[j].dispositivos[k].iddispositivo
        );
        devices.push(a);
      }
    }
    // }
    devices;
  }

  const dataApiResultsDevice = await getDataDevicesDetalle(3,6);

  return { dataApiUser, devices, dataApiResultsDevice };
};
