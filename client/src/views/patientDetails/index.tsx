import LOTTable from "@/features/LOTTable"
import { PageContainer } from "@ant-design/pro-components"
import { AddPatientForm } from "@/features/addPatientForm/addPatientForm"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const PatientDetails = () => {
  const navigate = useNavigate()

  const [tabKey, setTabKey] = useState<"patientDetails" | "lineOfTreatments">(
    "patientDetails",
  )

  return (
    <PageContainer
      title="Patient Details"
      onBack={() => navigate("/patients")}
      fixedHeader
      tabActiveKey={tabKey}
      tabList={[
        {
          tab: "Patient Details",
          key: "patientDetails",
        },
        {
          tab: "Line of Treatments",
          key: "lineOfTreatments",
        },
      ]}
      onTabChange={(key) => {
        setTabKey(key as "patientDetails" | "lineOfTreatments")
      }}
    >
      {tabKey === "patientDetails" ? (
        <AddPatientForm key={tabKey} />
      ) : (
        <LOTTable key={tabKey} />
      )}
    </PageContainer>
  )
}

export default PatientDetails
