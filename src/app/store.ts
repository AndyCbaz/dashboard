import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//reducers
import userReducer from "../features/userSlice";
import userApiDataReducer from "../features/userResultsSlice";
import userDataGlobalReducer from "../features/userDataSlice";
import userSearchDisplayState from "../features/headerDisplay"
import clientPetitionsReducer from "../features/cliente/clientComboMacgateways"
import searchdevicesReducer from "../features/todos/search"

export const store = configureStore({
  reducer: {
    login: userReducer,
    userDataGlobal: userDataGlobalReducer,
    resultados: userApiDataReducer,
    headerDisplayState: userSearchDisplayState,
    clientPetitions: clientPetitionsReducer,
    searchDevices: searchdevicesReducer,
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
