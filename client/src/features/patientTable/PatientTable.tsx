import React, { useState } from "react"
import patientTableApi, {
  PatientTable as PatientTableT,
} from "../../features/patientTable/patientTableApi"
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Dropdown, Modal, message } from "antd"
import { MoreOutlined, PlusOutlined } from "@ant-design/icons"
import ImportData from "../importData/ImportData"
import { useNavigate } from "react-router-dom"

export function PatientTable() {
  const { useGetPatientsQuery, useDeletePatientMutation } = patientTableApi

  const {
    data,
    error,
    isLoading,
    refetch: getPatients,
  } = useGetPatientsQuery({})
  const [deletePatient, deletePatientResponse] = useDeletePatientMutation()
  const [deleteRowKey, setDeleteRowKey] = useState<string>()
  const navigate = useNavigate()

  const columns: ProColumns<PatientTableT.Patient>[] = [
    {
      dataIndex: "index",
      valueType: "index",
      width: 48,
    },
    {
      title: "CR Number",
      dataIndex: "cr_number",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Smoking",
      dataIndex: "smoking",
    },
    {
      title: "Family History",
      dataIndex: "family_history",
    },
    {
      title: "Gene",
      dataIndex: "gene",
    },
    {
      title: "Variant",
      dataIndex: "variant",
    },
    {
      title: "Treatment At RGCI",
      dataIndex: "treatment_at_rgci",
      render: (title) => renderTableHeader(title),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Status at Last Follow Up",
      dataIndex: "status_at_last_follow_up",
    },
    {
      title: "Date of Last Follow Up",
      dataIndex: "date_of_last_follow_up",
      valueType: "date",
    },
    {
      title: "Action",
      dataIndex: "option",
      valueType: "option",
      render: (text, record, key, action) => [
        <Dropdown
          trigger={["click"]}
          onOpenChange={(isOpen) => {
            if (isOpen) {
              setDeleteRowKey(record._id)
            } else {
              setDeleteRowKey(undefined)
            }
          }}
          key={key}
          menu={{
            items: [
              {
                key: "1",
                label: "Add Checkups",
                onClick: () => {
                  navigate(`/patients/${record._id}/add-checkup`, {
                    state: { patient: record, isEdit: false },
                  })
                },
              },
              {
                key: "2",
                label: "Edit",
                onClick: () => {
                  navigate(`/patients/${record._id}/edit-patient`, {
                    state: { patient: record, isEdit: true },
                  })
                },
              },
              {
                key: "3",
                label: "Show Checkups",
                onClick: () => {
                  navigate(`/patients/${record._id}/get-checkups`)
                },
              },
              {
                key: "4",
                label: "Delete",
                onClick: () => {
                  showDeleteModal()
                },
              },
            ],
          }}
        >
          <MoreOutlined />
        </Dropdown>,
      ],
    },
  ]

  const renderTableHeader = (children: React.ReactNode) => {
    return (
      <div className="grid items-stretch">
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          {children}
        </div>
      </div>
    )
  }

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const showUploadModal = () => {
    setIsUploadModalOpen(true)
  }

  const handleUploadOk = () => {
    setIsUploadModalOpen(false)
  }

  const handleUploadCancel = () => {
    setIsUploadModalOpen(false)
  }

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteOk = () => {
    if (deleteRowKey) {
      deletePatient(deleteRowKey)
    }
    setIsDeleteModalOpen(false)
    if (deletePatientResponse) {
      actionRef.current?.reload()
      message.success("Patient deleted successfully")
    } else {
      message.error("Patient deletion failed")
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const actionRef = React.useRef<ActionType>()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ProTable<PatientTableT.Patient>
        dataSource={data?.patients}
        tableLayout="auto"
        cardBordered
        options={{
          setting: {
            listsHeight: 500,
          },
        }}
        actionRef={actionRef}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log("selectedRows", selectedRows)
          },
        }}
        request={async (params = {}) => {
          const res = await getPatients()
          return {
            data: res.data?.patients,
            success: true,
          }
        }}
        headerTitle={"Total Patients (" + data?.totalCount + ")"}
        columns={columns}
        scroll={{ x: "scroll" }}
        rowKey="cr_number"
        search={false}
        pagination={{
          pageSize: 10,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/patients/add-patient", {
                state: { isEdit: false },
              })
            }}
            type="primary"
          >
            Add Patient
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              showUploadModal()
            }}
            type="primary"
          >
            Import Patient Data
          </Button>,
        ]}
      />
      <Modal
        title="Import Patient Data"
        open={isUploadModalOpen}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
        width={1000}
      >
        <ImportData />
      </Modal>
      <Modal
        title="Delete Patient"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        width={500}
      >
        <p>Are you sure you want to delete this patient data?</p>
      </Modal>
    </>
  )
}
