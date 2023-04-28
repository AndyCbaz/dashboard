import axios from "axios";
import { HOST, PORT } from "../../../helpers/Apis/HostPort";

export const getZonas = async (idcliente: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/comboZonas`,
      { idcliente: idcliente }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
