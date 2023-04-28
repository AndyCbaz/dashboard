import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};

export const getDataUser = async (idusuario: number | string, idcliente: number | string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/listaDispositivos`,
      { idusuario: idusuario, idcliente: idcliente }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
