import LOTTable from "@/features/LOTTable"
import { PageContainer } from "@ant-design/pro-components"
import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card } from "antd"

const PatientDetails = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      title="Patient Details"
      onBack={() => navigate("/patients")}
      fixedHeader
    >
      <AddPatientForm isEdit={false} />
      {/* <Card title="LOT Table" style={{ marginTop: 20 }}>
        <LOTTable />
      </Card> */}
    </PageContainer>
  )
}

export default PatientDetails
