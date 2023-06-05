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
  zonasbyareas: any;
  idarea: any;
  devicesbyzonas: any;
  idzona: any;
  devicesSelected: any;
  resumenAllDevicesSelected:any;
  devicesbygateways:any;
  idmacgateway:any;
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
  zonasbyareas: [],
  idarea: [],
  devicesbyzonas: [],
  idzona: [],
  devicesSelected: [],
  resumenAllDevicesSelected: [],
  devicesbygateways:[],
  idmacgateway:[],

};

export const comboMacSlice = createSlice({
  name: "clientPetitions",
  initialState,
  reducers: {
    setComboGateways: (state, action: PayloadAction<boolean>) => {
      state.comboGateways = action.payload;
    },
    setZonasByClient: (state, action: PayloadAction<any>) => {
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
    setZonasByAreas: (state, action: PayloadAction<any>) => {
      state.zonasbyareas = action.payload;
    },
    setIdArea: (state, action: PayloadAction<any>) => {
      state.idarea = action.payload;
    },
    setDevicesByZonas: (state, action: PayloadAction<any>) => {
      state.devicesbyzonas = action.payload;
    },
    setIdZona: (state, action: PayloadAction<any>) => {
      state.idzona = action.payload;
    },
    setDevicesSelected: (state, action: PayloadAction<any>) => {
      state.devicesSelected = action.payload;
    },
    setResumenAllDevicesSelected: (state, action: PayloadAction<any>) => {
      state.resumenAllDevicesSelected = action.payload;
    },
    setDevicesByGateways: (state, action: PayloadAction<any>) => {
      state.devicesbygateways = action.payload;
    },
    setIdMacGateways: (state, action: PayloadAction<any>) => {
      state.idmacgateway = action.payload;
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
  setZonasByAreas,
  setIdArea,
  setDevicesByZonas,
  setIdZona,
  setDevicesSelected,
  setResumenAllDevicesSelected,
  setDevicesByGateways,
  setIdMacGateways
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
export const selectZonasByAreas = (state: RootState) =>
  state.clientPetitions.zonasbyareas;
export const selectIdArea = (state: RootState) => state.clientPetitions.idarea;
export const selectResumenAllDevices = (state: RootState) =>
  state.clientPetitions.resumenalldevices;
export const selectDevicesByZonas = (state: RootState) =>
  state.clientPetitions.devicesbyzonas;
export const selectIdZona = (state: RootState) => state.clientPetitions.idzona;
export const selectDevicesSelected = (state: RootState) => state.clientPetitions.devicesSelected;
export const selectResumenAllDevicesSelected = (state: RootState) => state.clientPetitions.resumenAllDevicesSelected;
export const selectDevicesByGateways = (state: RootState) => state.clientPetitions.devicesbygateways;
export const selectIdMacGateway = (state: RootState) => state.clientPetitions.idmacgateway;

export default comboMacSlice.reducer;
