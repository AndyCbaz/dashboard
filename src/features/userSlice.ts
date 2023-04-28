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
  
  datacliente: any;
  datausuario: any;
}

let initialUser = localStorage.getItem("cliente");
if (initialUser === null) initialUser = "";
let initialClient = localStorage.getItem("usuario");
if (initialClient === null) initialClient = "";


const initialState: UserState = {
  clienteCI: initialUser,
  usuario: initialClient,
  
  datacliente: [],
  datausuario: [],
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

    setDataCliente: (state, action: PayloadAction<any>) => {
      state.datacliente = action.payload;
    },
    setDataUsuario: (state, action: PayloadAction<any>) => {
      state.datausuario = action.payload;
    },
  },
});

export const {
  setUsuario,
  setClientCI,
  
  setDataCliente,
  setDataUsuario,
} = userSlice.actions;

export const selectClientCI = (state: RootState) => state.login.clienteCI;
export const selectUsuario = (state: RootState) => state.login.usuario;

export const selectDataCliente = (state: RootState) => state.login.datacliente;
export const selectDataUsuario = (state: RootState) => state.login.datausuario;

export default userSlice.reducer;
