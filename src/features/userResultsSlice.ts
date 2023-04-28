import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface ClientApiState {
  datosResultConsulta: {
    idgateway: number;
    iddispositivo: number;
  };
  dataDeviceResult: any;
  datamaxmingraf: any;
}

const initialState: ClientApiState = {
  datosResultConsulta: {
    idgateway: 0,
    iddispositivo: 0,
  },
  dataDeviceResult: [],
  datamaxmingraf: [],
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
    setDataMaxMinGraf: (state, action: PayloadAction<any>) => {
      state.datamaxmingraf = action.payload;
    },
  },
});

export const { setDataResultDevice, setDataResultConsulta, setDataMaxMinGraf } =
  userApiDataSlice.actions;

export const selectDataResultDevice = (state: RootState) =>
  state.resultados.dataDeviceResult;
export const selectDatosResultConsulta = (state: RootState) =>
  state.resultados.datosResultConsulta;
export const selectDatosMaxMinGraf = (state: RootState) =>
  state.resultados.datamaxmingraf;

export default userApiDataSlice.reducer;
