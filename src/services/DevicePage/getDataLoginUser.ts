import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Usuario No Registrado");
};

export const getDataLoginUser = async (usuario: string) => {
  try {
    const res = await axios.post(`http://${HOST}:${PORT}/api/user/ingresoUsuario`,{'nombreusuario':usuario});
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
