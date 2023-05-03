import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";


interface ISearchDatGlobal {
  devicesSearched: any;
  
}

const initialState: ISearchDatGlobal = {
  devicesSearched: []
  
};

export const searchDevicesSlice = createSlice({
  name: "headerDisplay",
  initialState,
  reducers: {
    setDevicesSearched: (state, action: PayloadAction<boolean>) => {
      state.devicesSearched = action.payload;
    },

  },
});

export const {  setDevicesSearched } =
  searchDevicesSlice.actions;

export const selectToastDisplay = (state: RootState) =>
  state.searchDevices.devicesSearched;

export default searchDevicesSlice.reducer;
