import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface ClientApiState {
  dataRedux: any;
  dataDeviceResult: any;
}

const initialState: ClientApiState = {
  dataRedux: {},
  dataDeviceResult: {}
};

export const userApiDataSlice = createSlice({
  name: "loginUserApi",
  initialState,
  reducers: {
    setDataApiUser: (state, action: PayloadAction<any>) => {
      state.dataRedux = action.payload;
    },
    setDataResultDevice: (state, action: PayloadAction<any>) => {
      state.dataDeviceResult = action.payload;
    },
  },
});

export const { setDataApiUser, setDataResultDevice } = userApiDataSlice.actions;

export const selectDataApiUser = (state: RootState) => state.loginUserApi.dataRedux;
export const selectDataResultDevice = (state: RootState) => state.loginUserApi.dataDeviceResult;

export default userApiDataSlice.reducer;
