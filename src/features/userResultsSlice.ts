import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface ClientApiState {
  datosResultConsulta: {
    idgateway: number;
    iddispositivo: number;
  };
  dataDeviceResult: any;
}

const initialState: ClientApiState = {
  datosResultConsulta: {
    idgateway: 3,
    iddispositivo: 6,
  },
  dataDeviceResult: [
    // {
    //   temperatura: 16,
    //   humedad: 68,
    //   fecha: "2023-04-19T14:27:30.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 68,
    //   fecha: "2023-04-19T14:28:12.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 68,
    //   fecha: "2023-04-19T14:28:34.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:28:48.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:29:16.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:29:44.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:29:58.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:30:12.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:30:41.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:31:02.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:31:16.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:31:37.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:31:51.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:32:06.000Z",
    // },
    // {
    //   temperatura: 16,
    //   humedad: 67,
    //   fecha: "2023-04-19T14:32:27.000Z",
    // },
  ],
};

export const userApiDataSlice = createSlice({
  name: "resultados",
  initialState,
  reducers: {
    setDataResultConsulta: (state, action: PayloadAction<any>) => {
      state.datosResultConsulta = action.payload;
    },
    setDataResultDevice: (state, action: PayloadAction<any>) => {
      state.dataDeviceResult = action.payload;
    },
  },
});

export const { setDataResultDevice, setDataResultConsulta } =
  userApiDataSlice.actions;

export const selectDataResultDevice = (state: RootState) =>
  state.resultados.dataDeviceResult;
export const selectDatosResultConsulta = (state: RootState) =>
  state.resultados.datosResultConsulta;

export default userApiDataSlice.reducer;
