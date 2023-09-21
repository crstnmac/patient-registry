import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "@/features/counter/counterSlice"
import globalReducer from "./globalSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import authSlice from "./authSlice"

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
  },
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
