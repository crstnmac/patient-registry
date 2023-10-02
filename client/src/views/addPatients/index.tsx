import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"
import { useLocation } from "react-router-dom"

const AddPatients = () => {
  const { isEdit } = useLocation().state as { [key: string]: string }

  return (
    <PageContainer title={isEdit ? "Edit Patient" : "Add Patient"}>
      <AddPatientForm />
    </PageContainer>
  )
}

export default AddPatients
