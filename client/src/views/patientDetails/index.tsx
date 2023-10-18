import LOTTable from "@/features/LOTTable"
import { PageContainer } from "@ant-design/pro-components"
import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"

const PatientDetails = () => {
  return (
    <PageContainer
      title="Patient Details"
      onBack={() => window.history.back()}
      fixedHeader
    >
      <AddPatientForm />

      <LOTTable />
    </PageContainer>
  )
}

export default PatientDetails
