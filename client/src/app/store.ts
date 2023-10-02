import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "@/features/counter/counterSlice"
import loginApi from "@/features/login/loginApi"
import globalReducer from "./globalSlice"
import storage from "redux-persist/lib/storage"
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import authSlice from "./authSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import patientTableApi from "@/features/patientTable/patientTableApi"
import menuApi from "@/features/menu/menuApi"

// redux persist
const persistConfig = {
  key: "global-state",
  storage: storage,
}
const persistGlobalReducerConfig = persistReducer(persistConfig, globalReducer)

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: persistGlobalReducerConfig,
    auth: authSlice,
    [loginApi.reducerPath]: loginApi.reducer,
    [patientTableApi.reducerPath]: patientTableApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      loginApi.middleware,
      patientTableApi.middleware,
      menuApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()
