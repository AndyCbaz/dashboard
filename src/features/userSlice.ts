import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface UserState {
  valueClient: string;
  valueUser: string;
  valuePasword: string;
}

let initialUser = localStorage.getItem('cliente');
if(initialUser===null) initialUser=""
let initialClient = localStorage.getItem('usuario')
if(initialClient===null) initialClient=""

const initialState: UserState = {
  valueClient: initialUser,
  valueUser: initialClient,
  valuePasword: "",
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.valueUser = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.valuePasword = action.payload;
    },
    setClient: (state, action: PayloadAction<string>) => {
      state.valueClient = action.payload;
    },
    removeUser: (state) => {
      state.valueUser = "";
    },
    removeClient: (state) => {
      state.valueClient = "";
    },
  },
});

export const { setUser, setPassword, setClient, removeUser, removeClient } = userSlice.actions;

export const selectUser = (state: RootState) => state.login.valueUser;
export const selectPassword = (state: RootState) => state.login.valuePasword;
export const selectClient = (state: RootState) => state.login.valueClient;

export default userSlice.reducer;
