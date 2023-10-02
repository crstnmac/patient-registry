import AddCheckupForm from "@/features/addCheckupForm"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"
import { useLocation } from "react-router-dom"

const AddCheckup = () => {
  const { isEdit } = useLocation().state as { [key: string]: string }

  return (
    <PageContainer title={isEdit ? "Edit Checkup" : "Add Checkup"}>
      <AddCheckupForm />
    </PageContainer>
  )
}

export default AddCheckup
