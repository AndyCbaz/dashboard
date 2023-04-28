import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};

export const getComboGateways = async (idcliente: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/comboGateway`,
      { "idcliente": idcliente }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
