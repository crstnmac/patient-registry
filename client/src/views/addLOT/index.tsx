import AddLOTForm from "@/features/addLOTForm"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"
import { useLocation } from "react-router-dom"

const AddLOT = () => {
  const { isEdit } = useLocation().state

  return (
    <PageContainer
      title={isEdit ? "Edit LOT" : "Add LOT"}
      fixedHeader
      onBack={() => window.history.back()}
    >
      <AddLOTForm isEdit={isEdit} />
    </PageContainer>
  )
}

export default AddLOT
