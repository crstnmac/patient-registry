import { Pie, Bar, Area } from "@ant-design/plots"
import { useGetPieChartQuery } from "./pieChartApi"
import { Card } from "antd"

export const PieChart = ({ field }: { field: string }) => {
  const { data } = useGetPieChartQuery({
    field,
  })

  return (
    <Card title="Statistic by Gender" bordered={false}>
      <Pie
        data={data?.chartData}
        angleField="value"
        colorField="type"
        radius={0.8}
        label={{
          type: "spider",
          labelHeight: 28,
          content: "{name}\n{percentage}",
        }}
        interactions={[
          { type: "element-selected" },
          { type: "element-active" },
        ]}
      />

      <Bar
        data={data?.chartData}
        xField="type"
        yField="value"
        meta={{
          type: { alias: "type" },
          value: { alias: "value" },
        }}
      />

      <Area data={data?.chartData} xField="type" yField="value" />
    </Card>
  )
}
