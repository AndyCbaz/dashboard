import axios from "axios";
import { HOST, PORT } from "../../helpers/Apis/HostPort";
import { toast } from "react-toastify";

const handleShowServerToast = () => {
  toast.warning("Servidor sin Conexión");
};
const handleShowUserCreatedToast = () => {
  toast.success("Usuario Creado con Exito");
};


export const createDevice = async (
  macdispositivo:string,
  nombre: string,
  idusuario: number,
  idmacgateway: number,
  idarea: number,
  idzona: number,
  maxT: number,
  minT: number,
  hmax: number,
  hmin: number
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearDispositivo`, //cambiar api
      {
        macdispositivo: macdispositivo,
        nombreDispositivo: nombre,
        idusuario: idusuario,
        idmacgateway: idmacgateway,
        idarea: idarea,
        idzona: idzona,
        maxTemperatura: maxT,
        minTemperatura: minT,
        maxHumedad: hmax,
        minHumedad: hmin,
      }
    );
    handleShowUserCreatedToast()
    return res.data;

  } catch (error) {
    handleShowServerToast();
  }
};
