import LOTTable from "@/features/LOTTable"
import { PageContainer } from "@ant-design/pro-components"
import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { useNavigate } from "react-router-dom"

const PatientDetails = () => {
  const navigate = useNavigate()

  return (
    <PageContainer
      title="Patient Details"
      onBack={() => navigate("/patients")}
      fixedHeader
    >
      <AddPatientForm />

      <LOTTable />
    </PageContainer>
  )
}

export default PatientDetails
