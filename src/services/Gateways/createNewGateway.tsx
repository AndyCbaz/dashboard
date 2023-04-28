import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};

export const createNewMacGateway = async (
  nombre: string,
  idcliente: number
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearMacGateway`,
      { "macgateway": nombre, idcliente: idcliente }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
