import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ResLogin {
    access_token: string
  }
  export interface ResAuthButtons {
    [propName: string]: any
  }
}

const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Login.ResLogin, Login.ReqLoginForm>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = loginApi
