import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.error("Credenciales Incorrectas");
};

export const getDataLoginClient = async (cedula: string, clave: string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/login`,
      { "cedula": cedula, "clave": clave }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
