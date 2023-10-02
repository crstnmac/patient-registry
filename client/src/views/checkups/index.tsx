import CheckupsTable from "@/features/checkupsTable"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"

export const Checkups = () => {
  return (
    <PageContainer title="Patient Checkups">
      <CheckupsTable />
    </PageContainer>
  )
}
