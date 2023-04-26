import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";

export const getDataLoginClient = async (cedula: string, clave: string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/login`,
      { "cedula": cedula, "clave": clave }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
