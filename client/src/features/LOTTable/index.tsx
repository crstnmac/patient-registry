import { ActionType, ProColumns, ProForm } from "@ant-design/pro-components"
import React from "react"
import patientTableApi, {
  PatientTable as PatientTableT,
} from "../patientTable/patientTableApi"
import { PlusOutlined, EditTwoTone } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, message } from "antd"

import dayjs from "dayjs"

export default function LOTTable() {
  const { useGetLOTsQuery, useDeleteLOTMutation } = patientTableApi

  const params = useParams()
  const navigate = useNavigate()

  const { id } = params

  const {
    data,
    error,
    isLoading,
    refetch: getPatientLOTs,
  } = useGetLOTsQuery(id!)

  // const [deleteLOT, deleteLOTResponse] = useDeleteLOTMutation()

  // const actionRef = React.useRef<ActionType>()

  // const columns: ProColumns<PatientTableT.LOT>[] = [
  //   {
  //     dataIndex: "index",
  //     key: "indexBorder",
  //     valueType: "indexBorder",
  //     width: 48,
  //   },
  //   {
  //     title: "Treatment",
  //     dataIndex: "treatment",
  //   },
  //   {
  //     title: "Drug Name Targeted",
  //     dataIndex: "drug_name_targeted",
  //   },
  //   {
  //     title: "Drug Name Chemo",
  //     dataIndex: "drug_name_chemo",
  //   },
  //   {
  //     title: "Drug name Immuno",
  //     dataIndex: "drug_name_immuno",
  //   },
  //   {
  //     title: "Date of start of treatment",
  //     dataIndex: "date_of_start_of_treatment",
  //     valueType: "date",
  //   },
  //   {
  //     title: "Response pet ct",
  //     dataIndex: "response_pet_ct",
  //   },
  //   {
  //     title: "Intracranial response",
  //     dataIndex: "intracranial_response",
  //   },
  //   {
  //     title: "Progressed on line",
  //     dataIndex: "progressed_on_line",
  //   },
  //   {
  //     title: "Date of progression",
  //     dataIndex: "date_of_progression",
  //     valueType: "date",
  //   },
  //   {
  //     title: "Biopsy line of progression",
  //     dataIndex: "biopsy_progression",
  //   },
  //   {
  //     title: "NGS at progression",
  //     dataIndex: "ngs_at_progression",
  //   },
  //   {
  //     title: "NGS result",
  //     dataIndex: "ngs_result",
  //   },
  //   {
  //     title: "Other remarks",
  //     dataIndex: "other_remarks",
  //   },
  //   {
  //     title: "Action",
  //     valueType: "option",
  //     render: (text, record, _, action) => [
  //       <Button
  //         key="edit"
  //         onClick={() => {
  //           navigate(`/patients/${id}/edit-lot/${record._id}`, {
  //             state: { patientLOT: record, isEdit: true },
  //           })
  //         }}
  //       >
  //         Edit
  //       </Button>,
  //       <Button
  //         key="delete"
  //         onClick={async () => {
  //           await deleteLOT(record._id)
  //           if (deleteLOTResponse) {
  //             message.success("LOT deleted successfully")
  //             actionRef.current?.reload()
  //           }
  //         }}
  //       >
  //         Delete
  //       </Button>,
  //     ],
  //   },
  // ]

  //transform data to be displayed in table

  // return (
  //   <ProTable<PatientTableT.LOT>
  //     columns={columns}
  //     rowKey="_id"
  //     scroll={{
  //       x: "max-content",
  //     }}
  //     loading={isLoading}
  //     request={async () => {
  //       const res = await getPatientLOTs()
  //       return {
  //         data: res.data,
  //         success: true,
  //       }
  //     }}
  //     cardBordered
  //     tableLayout="auto"
  //     options={{
  //       setting: {
  //         listsHeight: 500,
  //       },
  //     }}
  //     actionRef={actionRef}
  //     search={false}
  //     pagination={false}
  //     toolBarRender={() => [
  //       <Button
  //         key="button"
  //         icon={<PlusOutlined />}
  //         disabled={data?.length === 5}
  //         onClick={() => {
  //           navigate(`/patients/${id}/add-lot`, {
  //             state: { isEdit: false },
  //           })
  //         }}
  //         type="primary"
  //       >
  //         Add LOT
  //       </Button>,
  //     ]}
  //   />
  // )

  function parseHeader(index: number) {
    switch (index) {
      case 0:
        return "1st"
      case 1:
        return "2nd"
      case 2:
        return "3rd"
      case 3:
        return "4th"
      case 5:
        return "5th"
    }
  }

  return (
    <Card className="w-full">
      <ProForm.Group
        title="Line of Treatments"
        collapsible
        titleStyle={{
          cursor: "pointer",
        }}
        labelLayout="inline"
        extra={
          <Button
            key="button"
            type="primary"
            icon={<PlusOutlined />}
            disabled={data?.length === 5}
            onClick={() => {
              navigate(`/patients/${id}/add-lot`, {
                state: { isEdit: false },
              })
            }}
          >
            Add LOT
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="table-auto border-none border-gray-700">
            <tbody className="flex justify-between">
              <tr className="flex justify-between border-b flex-col bg-blue-50">
                <th className="px-4 py-2 border text-xs text-black-500 uppercase tracking-wider font-bold">
                  <Button key="button" type="text">
                    LINE OF TREATMENT
                  </Button>
                </th>
                <th className="text-left border px-4 py-2">Treatment</th>
                <th className="text-left border px-4 py-2">
                  Drug Name Targeted
                </th>
                <th className="text-left border px-4 py-2">Drug Name Chemo</th>
                <th className="text-left border px-4 py-2">Drug name Immuno</th>
                <th className="text-left border px-4 py-2">
                  Date of start of treatment
                </th>
                <th className="text-left border px-4 py-2">Response pet ct</th>
                <th className="text-left border px-4 py-2">
                  Intracranial response
                </th>
                <th className="text-left border px-4 py-2">
                  Progressed on line
                </th>
                <th className="text-left border px-4 py-2">
                  Date of progression
                </th>
                <th className="text-left border px-4 py-2">
                  Biopsy line of progression
                </th>
                <th className="text-left border px-4 py-2">
                  NGS at progression
                </th>
                <th className="text-left border px-4 py-2">NGS result</th>
              </tr>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className="flex justify-between border-b flex-col"
                >
                  <th
                    key={index}
                    className="px-4 py-2 border text-left text-xs text-black-500 uppercase tracking-wider font-bold items-center flex justify-between"
                  >
                    {parseHeader(index)}
                    <Button
                      type="text"
                      style={{
                        fontWeight: 700,
                      }}
                      onClick={() => {
                        navigate(`/patients/${id}/edit-lot/${item._id}`, {
                          state: { patientLOT: item, isEdit: true },
                        })
                      }}
                      icon={<EditTwoTone />}
                    />
                  </th>
                  <td className="border px-4 py-2">{item.treatment}</td>
                  <td className="border px-4 py-2">
                    {item.drug_name_targeted}
                  </td>
                  <td className="border px-4 py-2">{item.drug_name_chemo}</td>
                  <td className="border px-4 py-2">{item.drug_name_immuno}</td>
                  <td className="border px-4 py-2">
                    {dayjs(item.date_of_start_of_treatment).format(
                      "DD/MM/YYYY",
                    )}
                  </td>
                  <td className="border px-4 py-2">{item.response_pet_ct}</td>
                  <td className="border px-4 py-2">
                    {item.intracranial_response}
                  </td>
                  <td className="border px-4 py-2">
                    {item.progressed_on_line}
                  </td>
                  <td className="border px-4 py-2">
                    {dayjs(item.date_of_progression).format("DD/MM/YYYY")}
                  </td>
                  <td className="border px-4 py-2">
                    {item.biopsy_progression}
                  </td>
                  <td className="border px-4 py-2">
                    {item.ngs_at_progression}
                  </td>
                  <td className="border px-4 py-2">{item.ngs_result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProForm.Group>
    </Card>
  )
}
