import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//reducers
import userReducer from "../features/userSlice";
import userApiDataReducer from "../features/clientApiDataSlice"

export const store = configureStore({
  reducer: {
    login: userReducer,
    loginUserApi: userApiDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
