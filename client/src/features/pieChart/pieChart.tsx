import { Pie } from "@ant-design/charts"
import { useGetPieChartQuery } from "./pieChartApi"
import React, { useEffect } from "react"
import { Card } from "antd"

export const PieChart = () => {
  const { data: pieChartData } = useGetPieChartQuery()

  const [pieData, setPieData] = React.useState<any>([])

  useEffect(() => {
    if (pieChartData) {
      setPieData(pieChartData.patients)
    }
  }, [pieChartData])

  console.log(pieData)

  return (
    <Card title="Statistic by Gender" bordered={false}>
      <Pie
        data={pieData}
        radius={0.8}
        angleField="count"
        colorField="_id"
        color={["#5B8FF9", "#5AD8A6"]}
        label={{
          type: "inner",
          offset: "-30%",
          content: function content(_ref: any) {
            var percent = _ref.percent
            return "".concat((percent * 100).toFixed(0), "%")
          },
          autoRotate: false,
          style: {
            fontSize: 14,
            textAlign: "center",
          },
        }}
        legend={{
          position: "bottom",
          offsetY: -30,
        }}
        interactions={[
          {
            type: "element-active",
          },
          {
            type: "element-selected",
          },
        ]}
      />
    </Card>
  )
}
