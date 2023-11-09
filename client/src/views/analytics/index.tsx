import { PageContainer, ProFormCheckbox } from "@ant-design/pro-components"
import { PieChart } from "@/features/pieChart/pieChart"
import { Card, Checkbox } from "antd"
import { useState } from "react"

const Analytics = () => {
  const options = [
    { label: "Overall Survival Rate", value: "overallSurvivalRate" },
    { label: "Gender Ratio", value: "genderRatio" },
    { label: "Patient Count", value: "patientCount" },
    { label: "Age Distribution", value: "ageDistribution" },
    { label: "Alive vs Dead", value: "aliveVsDead" },
    { label: "Line of Treatments", value: "lineOfTreatments" },
    { label: "Brain Mets Distribution", value: "brainMetsDistribution" },
    { label: "Gene Ratio", value: "geneRatio" },
    {
      label: "Targeted Med Distribution x LOT",
      value: "targetedMedDistributionXLOT",
    },
    {
      label: "Chemo Med Distribution x LoT",
      value: "chemoMedDistributionXLoT",
    },
    {
      label: "Immuno Med Distribution X LOT",
      value: "immunoMedDistributionXLOT",
    },
    { label: "Progression x LOT", value: "progressionXLOT" },
    { label: "Location Distribution", value: "locationDistribution" },
    { label: "Smoking Distribution", value: "smokingDistribution" },
  ]

  const [checkedList, setCheckedList] = useState<[]>([])

  return (
    <PageContainer title="Analytics">
      <div className="grid grid-flow-col gap-3">
        <Card title="Select graphs to plot">
          <ProFormCheckbox.Group
            wrapperCol={{
              span: 24,
            }}
          >
            {options.map((option) => (
              <div key={option.value}>
                <Checkbox
                  key={option.value}
                  value={option.value} //@ts-ignore
                  checked={checkedList.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      //@ts-ignore
                      setCheckedList([...checkedList, option.value])
                    } else {
                      setCheckedList(
                        //@ts-ignore
                        checkedList.filter((item) => item !== option.value),
                      )
                    }
                  }}
                >
                  {option.label}
                </Checkbox>
                <br />
              </div>
            ))}
          </ProFormCheckbox.Group>
        </Card>
        {checkedList.includes("genderRatio") && <PieChart />}
      </div>
    </PageContainer>
  )
}

export default Analytics
