import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components"
import React from "react"
import patientTableApi, {
  PatientTable as PatientTableT,
} from "../patientTable/patientTableApi"
import { useNavigate, useParams } from "react-router-dom"
import { PlusOutlined } from "@ant-design/icons"
import { Button, message } from "antd"

export default function CheckupsTable() {
  const { useGetCheckupsQuery, useDeleteCheckupMutation } = patientTableApi

  const params = useParams()
  const navigate = useNavigate()

  const { id } = params

  const {
    data,
    error,
    isLoading,
    refetch: getPatientCheckups,
  } = useGetCheckupsQuery(id!)

  const [deleteCheckup, deleteCheckupResponse] = useDeleteCheckupMutation()

  const actionRef = React.useRef<ActionType>()

  const columns: ProColumns<PatientTableT.Checkup>[] = [
    {
      dataIndex: "index",
      key: "indexBorder",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Treatment",
      dataIndex: "treatment",
    },
    {
      title: "Drug Name Targeted",
      dataIndex: "drug_name_targeted",
    },
    {
      title: "Drug Name Chemo",
      dataIndex: "drug_name_chemo",
    },
    {
      title: "Drug name Immuno",
      dataIndex: "drug_name_immuno",
    },
    {
      title: "Date of start of treatment",
      dataIndex: "date_of_start_of_treatment",
      valueType: "date",
    },
    {
      title: "Response pet ct",
      dataIndex: "response_pet_ct",
    },
    {
      title: "Intracranial response",
      dataIndex: "intracranial_response",
    },
    {
      title: "Progressed on line",
      dataIndex: "progressed_on_line",
    },
    {
      title: "Date of progression",
      dataIndex: "date_of_progression",
      valueType: "date",
    },
    {
      title: "Biopsy line of progression",
      dataIndex: "biopsy_progression",
    },
    {
      title: "NGS at progression",
      dataIndex: "ngs_at_progression",
    },
    {
      title: "NGS result",
      dataIndex: "ngs_result",
    },
    {
      title: "Other remarks",
      dataIndex: "other_remarks",
    },
    {
      title: "Action",
      valueType: "option",
      render: (text, record, _, action) => [
        <Button
          key="edit"
          onClick={() => {
            navigate(`/patients/${id}/edit-checkup/${record._id}`, {
              state: { patientCheckup: record, isEdit: true },
            })
          }}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          onClick={async () => {
            await deleteCheckup(record._id)
            if (deleteCheckupResponse) {
              message.success("Checkup deleted successfully")
              actionRef.current?.reload()
            }
          }}
        >
          Delete
        </Button>,
      ],
    },
  ]

  return (
    <ProTable<PatientTableT.Checkup>
      columns={columns}
      rowKey="_id"
      scroll={{ x: "scroll" }}
      loading={isLoading}
      request={async () => {
        const res = await getPatientCheckups()
        return {
          data: res.data,
          success: true,
        }
      }}
      cardBordered
      tableLayout="auto"
      options={{
        setting: {
          listsHeight: 500,
        },
      }}
      actionRef={actionRef}
      search={false}
      dataSource={data}
      pagination={false}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          disabled={data?.length === 5}
          onClick={() => {
            navigate(`/patients/${id}/add-checkup`, {
              state: { isEdit: false },
            })
          }}
          type="primary"
        >
          Add Checkup
        </Button>,
      ]}
    />
  )
}
