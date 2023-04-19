import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface UserState {
    valueUser: string,
    valuePasword: string
}

const initialState: UserState = {
    valueUser: '',
    valuePasword: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<string>) => {
            state.valueUser = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.valuePasword = action.payload
        }
    }
})

export const {setUser, setPassword} = userSlice.actions;


export const selectUser = (state: RootState) => state.user.valueUser
export const selectPassword = (state: RootState) => state.user.valuePasword

export default userSlice.reducer