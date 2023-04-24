import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";

export const getDataDevicesDetalle = async (
  idgateway: number,
  iddispositivo: number,
  fechaInit: string = "2023-04-19 08:00:00",
  fechaFin: string = "2023-04-19 17:00:00"
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/termoD/detalleTermo`,
      {
        idgateway: idgateway,
        iddispositivo: iddispositivo,
        fechaInicio: fechaInit,
        fechaFin: fechaFin,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
