import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";

export const getDataDevicesResumen = async (
  idgateway: number,
  iddispositivo: number
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/termoD/resumenTermo`,
      { idgateway: idgateway, iddispositivo: iddispositivo }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
