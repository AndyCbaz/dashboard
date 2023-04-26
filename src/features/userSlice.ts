import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface IDataCliente {
  idcliente: number | string;
  nombre: string;
  empresa: string;
}
interface IDataUsuario {
  idusuario: number | string;
  idcliente: string;
  nombre: string;
}

export interface UserState {
  clienteCI: string;
  usuario: string;
  clave: string;
  datacliente: IDataCliente;
  datausuario: IDataUsuario;
}

let initialUser = localStorage.getItem("cliente");
if (initialUser === null) initialUser = "";
let initialClient = localStorage.getItem("usuario");
if (initialClient === null) initialClient = "";
let initialPassword = localStorage.getItem("clave");
if (initialPassword === null) initialPassword = "";

const initialState: UserState = {
  clienteCI: initialUser,
  usuario: initialClient,
  clave: initialPassword,
  datacliente: {
    idcliente: "",
    nombre: "",
    empresa: "",
  },
  datausuario: {
    idusuario: "",
    idcliente: "",
    nombre:"",
  },
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setClientCI: (state, action: PayloadAction<string>) => {
      state.clienteCI = action.payload;
    },
    setUsuario: (state, action: PayloadAction<string>) => {
      state.usuario = action.payload;
    },
    setClave: (state, action: PayloadAction<string>) => {
      state.clave = action.payload;
    },
    setDataCliente: (state, action: PayloadAction<IDataCliente>) => {
      state.datacliente = action.payload;
    },
    setDataUsuario: (state, action: PayloadAction<IDataUsuario>) => {
      state.datausuario = action.payload;
    },
  },
});

export const {
  setUsuario,
  setClientCI,
  setClave,
  setDataCliente,
  setDataUsuario,
} = userSlice.actions;

export const selectClientCI = (state: RootState) => state.login.clienteCI;
export const selectUsuario = (state: RootState) => state.login.usuario;
export const selectClave = (state: RootState) => state.login.clave;
export const selectDataCliente = (state: RootState) => state.login.datacliente;
export const selectDataUsuario = (state: RootState) => state.login.datausuario;

export default userSlice.reducer;
