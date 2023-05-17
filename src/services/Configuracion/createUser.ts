import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = (error:any) => {
  toast.warning(error);
};
const handleShowSucces = () => {
  toast.success("Usuario Creado con Éxito");
}

export const createUser = async (idcliente: number, nombreusuario:string, idmacgateway:number | string) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearUsuario`,
      { "idcliente": idcliente, "nombreusuario":nombreusuario,"idmacgateway":idmacgateway }
    );
    handleShowSucces();
    return res.data;
  } catch (error:any) {
    handleShowServerToast(error.response.data.data);
    
  }
};
