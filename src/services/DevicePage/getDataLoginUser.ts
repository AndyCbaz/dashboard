import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";

export const getDataLoginUser = async (usuario: string) => {
  try {
    const res = await axios.post(`http://${HOST}:${PORT}/api/user/ingresoUsuario`,{'nombreusuario':usuario});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
