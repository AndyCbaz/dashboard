import axios from "axios";
import { HOST, PORT } from "../../../helpers/Apis/HostPort";

export const getDevicesSelectedInfo = async (idgateway: number, iddispositivo: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/termoD/dispositivoid`,
      { idgateway: idgateway, iddispositivo: iddispositivo }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
