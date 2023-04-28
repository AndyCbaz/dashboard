import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};

export const createZona = async (
  nombre: string,
  idarea: number,
  idcliente: number
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearZona`, //cambiar api 
      { nombrezona: nombre, idarea: idarea, idcliente: idcliente }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
