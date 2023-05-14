import axios from "axios";
import { HOST, PORT } from "../../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};
const handleShowCorrectAnswer = () => {
  toast.success("Contraseña Cambiada con Exito");
}

export const setPassword = async ( idcliente: number, clave: string, newclave: string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/cambiopassword`,
      { idcliente: idcliente, clave: clave, newclave: newclave  }
    );
    handleShowCorrectAnswer()
    return res.data;
  } catch (error) {
    handleShowServerToast()
  }
};
