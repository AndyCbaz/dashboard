import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Usuario ya Registrado");
};

export const createUser = async (idcliente: number, nombreusuario:string, idmacgateway:number | string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearUsuario`,
      { "idcliente": idcliente, "nombreusuario":nombreusuario,"idmacgateway":idmacgateway }
    );
    return res.data;
  } catch (error) {
    handleShowServerToast();
  }
};
