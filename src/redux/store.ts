import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeReducer from "@reducers/ThemeSlice";
import userReducer from "@reducers/UserSlice";
import appDataReducer from "@src/redux/reducers/AppDataSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  appData: appDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const RootState = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;

// export const AppThunk = (dispatch, getState) => {
//   // define your thunk logic here
// };
