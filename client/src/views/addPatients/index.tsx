import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"
import { useLocation } from "react-router-dom"

const AddPatients = () => {
  const { isEdit } = useLocation().state

  return (
    <PageContainer
      title="Add Patient"
      onBack={() => {
        window.history.back()
      }}
      fixedHeader
    >
      <AddPatientForm isEdit={isEdit} />
    </PageContainer>
  )
}

export default AddPatients
