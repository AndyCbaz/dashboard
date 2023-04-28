import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface IComboData {
  comboGateways: any;
  zonasbyclient: any;
  gatewaybyclient: any;
  dataglobalclient: any;
  usersbyclient: any;
  devicesbyusers: any;
  areasbyclient: any;
  alldevices: any;
  resumenalldevices: any;
}

const initialState: IComboData = {
  comboGateways: [],
  zonasbyclient: [],
  gatewaybyclient: [],
  dataglobalclient: [],
  usersbyclient: [],
  devicesbyusers: [],
  areasbyclient: [],
  alldevices: [],
  resumenalldevices: [],
};

export const comboMacSlice = createSlice({
  name: "clientPetitions",
  initialState,
  reducers: {
    setComboGateways: (state, action: PayloadAction<boolean>) => {
      state.comboGateways = action.payload;
    },
    setZonasByClient: (state, action: PayloadAction<boolean>) => {
      state.zonasbyclient = action.payload;
    },
    setGatewaysByClient: (state, action: PayloadAction<boolean>) => {
      state.gatewaybyclient = action.payload;
    },
    setDataGlobalClient: (state, action: PayloadAction<any>) => {
      state.dataglobalclient = action.payload;
    },
    setUsersByClient: (state, action: PayloadAction<any>) => {
      state.usersbyclient = action.payload;
    },
    setDevicessByClient: (state, action: PayloadAction<any>) => {
      state.devicesbyusers = action.payload;
    },
    setAreasByClient: (state, action: PayloadAction<any>) => {
      state.areasbyclient = action.payload;
    },
    setAllDevices: (state, action: PayloadAction<any>) => {
      state.alldevices = action.payload;
    },
    setResumenAllDevices: (state, action: PayloadAction<any>) => {
      state.resumenalldevices = action.payload;
    },
  },
});

export const {
  setDataGlobalClient,
  setComboGateways,
  setZonasByClient,
  setGatewaysByClient,
  setUsersByClient,
  setAreasByClient,
  setDevicessByClient,
  setAllDevices,
  setResumenAllDevices,
} = comboMacSlice.actions;

export const selectComboGateways = (state: RootState) =>
  state.clientPetitions.comboGateways;
export const selectZonasByClient = (state: RootState) =>
  state.clientPetitions.zonasbyclient;
export const selectGatewaysByClient = (state: RootState) =>
  state.clientPetitions.gatewaybyclient;
export const selectDataGlobalClient = (state: RootState) =>
  state.clientPetitions.gatewaybyclient;
export const selectUsersByClient = (state: RootState) =>
  state.clientPetitions.usersbyclient;
export const selectDevicesByUsers = (state: RootState) =>
  state.clientPetitions.devicesbyusers;
export const selectAreasByClient = (state: RootState) =>
  state.clientPetitions.areasbyclient;
export const selectAllDevices = (state: RootState) =>
  state.clientPetitions.alldevices;
export const selectResumenAllDevices = (state: RootState) =>
  state.clientPetitions.resumenalldevices;

export default comboMacSlice.reducer;
