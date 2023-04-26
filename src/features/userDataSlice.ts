import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { IData } from "../types/Api/interfaceApiUserLogin";

interface IUserDatGlobal {
  data: any;
  devicesresumen: any;
}

const initialState: IUserDatGlobal = {
  data: [],
  devicesresumen: [],
};

export const userDataSlice = createSlice({
  name: "userDataGlobal",
  initialState,
  reducers: {
    setUserDataGlobal: (state, action: PayloadAction<IData>) => {
      state.data = action.payload;
    },
    setDevicesResumen: (state, action: PayloadAction<string>) => {
      state.devicesresumen = action.payload;
    },
  },
});

export const { setUserDataGlobal, setDevicesResumen } = userDataSlice.actions;

export const selectUserDataGlobal = (state: RootState) =>
  state.userDataGlobal.data;

export const selectDevicesResumen = (state: RootState) =>
  state.userDataGlobal.devicesresumen;

export default userDataSlice.reducer;
