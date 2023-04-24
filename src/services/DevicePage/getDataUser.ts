import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";

export const getDataUser = async (idusuario: number, idcliente: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/listaDispositivos`,
      { idusuario: idusuario, idcliente: idcliente }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
