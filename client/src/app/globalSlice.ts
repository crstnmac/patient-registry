import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

export interface UserInfo {
  user_id: string
  role: string
  username: string
  email: string
  iat: number
  exp: number
}

export interface GlobalState {
  token: string
  userInfo: UserInfo | null
}

const initialState: GlobalState = {
  token: "",
  userInfo: null,
}

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setToken: (state: GlobalState, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    setUserInfo: (state: GlobalState, { payload }: PayloadAction<any>) => {
      state.userInfo = payload
    },
  },
})

export const selectToken = (state: RootState) => state.global.token

export const { setToken, setUserInfo } = globalSlice.actions

export default globalSlice.reducer
