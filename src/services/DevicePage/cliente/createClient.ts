import axios from "axios";
import { HOST, PORT } from "../../../helpers/Apis/HostPort";

export const createClient = async (
  cliente: string,
  clave: string,
  name: string,
  empresa: string,
  adrress: string,
  city: string,
  phone: number | string,
  celular: number | string,
  email: string
) => {
  try {
    const res = await axios.post(
      `http://${HOST}:${PORT}/api/user/crearCliente`,
      {
        cedula_ruc: cliente,
        clave: clave,
        nombrecliente: name,
        empresa: empresa,
        direccion: adrress,
        ciudad: city,
        telefono: phone,
        celular: celular,
        email: email,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
