import { PageContainer, ProFormSelect } from "@ant-design/pro-components"
import { PieChart } from "@/features/pieChart/pieChart"
import { Card } from "antd"
import { useState } from "react"

const Analytics = () => {
  const options = [
    {
      label: "Age",
      value: "age",
    },
    {
      label: "Gender",
      value: "gender",
    },
    {
      label: "Gene",
      value: "gene",
    },
    {
      label: "State",
      value: "state",
    },
    {
      label: "Smoking",
      value: "smoking",
    },
    {
      label: "Variant",
      value: "variant",
    },
  ]

  const [checkedList, setCheckedList] = useState<{
    label: string
    value: string
  }>()

  return (
    <PageContainer title="Analytics">
      <div className="grid grid-flow-col gap-3">
        <Card title="Select graphs to plot">
          <ProFormSelect
            name="select"
            label="Select"
            placeholder="Please select"
            onChange={(value) => {
              setCheckedList(
                options.find((option) => option.value === value) || undefined,
              )
            }}
            valueEnum={options.reduce(
              (acc, option) => ({ ...acc, [option.value]: option.label }),
              {},
            )}
            options={options}
          />
        </Card>
        {checkedList && <PieChart field={checkedList?.value} />}
      </div>
    </PageContainer>
  )
}

export default Analytics
