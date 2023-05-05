import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";


interface ISearchDatGlobal {
  devicesSearched: any;
  nombrearea: any;
  nombrezona:any;
  areasbydevices: any;
  
}

const initialState: ISearchDatGlobal = {
  devicesSearched: [],
  nombrearea: [],
  nombrezona:[],
  areasbydevices:[],
  
};

export const searchDevicesSlice = createSlice({
  name: "headerDisplay",
  initialState,
  reducers: {
    setDevicesSearched: (state, action: PayloadAction<boolean>) => {
      state.devicesSearched = action.payload;
    },
    setNombreArea: (state, action: PayloadAction<string>) => {
      state.nombrearea = action.payload;
    },
    setNombreZona: (state, action: PayloadAction<string>) => {
      state.nombrezona = action.payload;
    },
    setAreasByDevices: (state, action: PayloadAction<string>) => {
      state.areasbydevices = action.payload;
    },

  },
});

export const {  setDevicesSearched,setNombreArea,setNombreZona,setAreasByDevices } =
  searchDevicesSlice.actions;

export const selectToastDisplay = (state: RootState) =>
  state.searchDevices.devicesSearched;
  export const selectNombreArea = (state: RootState) =>
  state.searchDevices.nombrearea;
  export const selectNombreZona = (state: RootState) =>
  state.searchDevices.nombrezona;
  export const selectAreasByDevices = (state: RootState) =>
  state.searchDevices.areasbydevices;

export default searchDevicesSlice.reducer;
