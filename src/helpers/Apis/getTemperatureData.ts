import axios from "axios";
import { HOST, PORT } from "./HostPort";
export const getDataVariables = async () => {
  try {
    const res = await axios.get(`${HOST}/${PORT}/data`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
