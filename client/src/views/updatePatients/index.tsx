import { UpdatePatientForm } from "@/features/updatePatientForm/updatePatientForm"
import { PageContainer } from "@ant-design/pro-components"
import { useNavigate } from "react-router-dom"
import React from "react"

const UpdatePatients = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      title="Update Patient"
      onBack={() => {
        navigate("/patients")
      }}
      fixedHeader
    >
      <UpdatePatientForm />
    </PageContainer>
  )
}

export default UpdatePatients
