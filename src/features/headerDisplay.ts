import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { IData } from "../types/Api/interfaceApiUserLogin";

interface IUserDatGlobal {
  searchDisplayState: boolean;
  toastDisplay: boolean;
}

const initialState: IUserDatGlobal = {
  searchDisplayState: true,
  toastDisplay: false,
};

export const headerDisplaySlice = createSlice({
  name: "headerDisplay",
  initialState,
  reducers: {
    setSearchDisplayState: (state, action: PayloadAction<boolean>) => {
      state.searchDisplayState = action.payload;
    },
    setToastDisplay: (state, action: PayloadAction<boolean>) => {
      state.toastDisplay = action.payload;
    },
  },
});

export const { setSearchDisplayState, setToastDisplay } =
  headerDisplaySlice.actions;

export const selectSearchDisplayState = (state: RootState) =>
  state.headerDisplayState.searchDisplayState;
export const selectToastDisplay = (state: RootState) =>
  state.headerDisplayState.toastDisplay;

export default headerDisplaySlice.reducer;
