import LOTTable from "@/features/LOTTable"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"

export const LOTs = () => {
  return (
    <PageContainer title="Line of Treatments">
      <LOTTable />
    </PageContainer>
  )
}
