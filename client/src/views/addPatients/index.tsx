import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { PageContainer } from "@ant-design/pro-components"
import React from "react"
import { useNavigate } from "react-router-dom"

const AddPatients = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      title="Add Patient"
      onBack={() => {
        navigate("/patients")
      }}
      fixedHeader
    >
      <AddPatientForm />
    </PageContainer>
  )
}

export default AddPatients
