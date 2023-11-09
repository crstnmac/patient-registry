import { prepareHeaders } from "@/utils/util"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export namespace PieChartApi {
  export interface PieChartRes {
    message: string
    patients: any[]
  }
}

const pieChartApi = createApi({
  reducerPath: "pieChart",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.REACT_APP_API_URL}/api/charts`,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getPieChart: builder.query<PieChartApi.PieChartRes, void>({
      query: () => ({
        url: `/pie-chart`,
        method: "GET",
      }),
    }),
  }),
})

export default pieChartApi

export const { useGetPieChartQuery } = pieChartApi
