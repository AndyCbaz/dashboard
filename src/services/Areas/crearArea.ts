import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};
const handleSucces = () => {
  toast.success("Área creada con Éxito")
}

export const createArea = async (nombre: string, idcliente: number) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearArea`, //cambiar api
      { nombrearea: nombre, idcliente: idcliente }
    );
    handleSucces();
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
