import { prepareHeaders } from "@/utils/util"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export namespace Profile {
  export interface Profile {
    _id: string
    username: string
    email: string
    role: string
    createdAt: Date
    updatedAt: Date
    name: string
    department: string
  }

  export interface ResGetProfile {
    success: boolean
    user: Profile
  }
}

const profileApi = createApi({
  reducerPath: "profile",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.MODE === "development"
        ? `${import.meta.env.REACT_APP_API_URL}/api/users`
        : `https://patient-registry-production.up.railway.app/api/users`,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile.ResGetProfile, void>({
      query() {
        return {
          url: `/user`,
          method: "GET",
        }
      },
    }),
    updateProfile: builder.mutation<Profile.Profile, Profile.Profile>({
      query(data) {
        const { _id, ...body } = data
        return {
          url: `/update-profile/${_id}`,
          method: "PUT",
          body,
        }
      },
    }),
  }),
})

export default profileApi

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
