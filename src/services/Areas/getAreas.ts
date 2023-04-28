import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};

export const getAreas = async (idcliente: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/comboAreas`,
      { "idcliente": idcliente }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
