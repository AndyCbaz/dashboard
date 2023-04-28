import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//reducers
import userReducer from "../features/userSlice";
import userApiDataReducer from "../features/userResultsSlice";
import userDataGlobalReducer from "../features/userDataSlice";
import userSearchDisplayState from "../features/headerDisplay"
import clientPetitionsReducer from "../features/cliente/clientComboMacgateways"

export const store = configureStore({
  reducer: {
    login: userReducer,
    userDataGlobal: userDataGlobalReducer,
    resultados: userApiDataReducer,
    headerDisplayState: userSearchDisplayState,
    clientPetitions: clientPetitionsReducer,
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
