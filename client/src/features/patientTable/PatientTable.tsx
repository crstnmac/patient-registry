import React, { useState } from "react"
import patientTableApi, {
  PatientTable as PatientTableT,
} from "@/features/patientTable/patientTableApi"
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProSchemaValueEnumObj,
  ProTable,
} from "@ant-design/pro-components"

import { Badge, Button, Modal, Space, Table, Tag, Tooltip, message } from "antd"
import {
  PlusOutlined,
  ImportOutlined,
  DeleteRowOutlined,
  FilterOutlined,
  TableOutlined,
} from "@ant-design/icons"
import ImportData from "../importData/ImportData"
import { useNavigate } from "react-router-dom"
import "./PatientTable.module.css"
import {
  brainMetastasesOptions,
  brg1Options,
  extrathoracicMetastasesOptions,
  familyHistoryOptions,
  genderOptions,
  geneOptions,
  histoloyOptions,
  indianStates,
  leptomeningealMetastasesOptions,
  lmMetsOptions,
  pdl1Options,
  smokingStatusOptions,
  treatmentAtRGCIOptions,
  ttf1Options,
} from "@/utils/constants"
import { useAppSelector } from "@/app/hooks"
import request from "umi-request"
import { SortOrder } from "antd/es/table/interface"

export function PatientTable() {
  const { useDeletePatientsMutation } = patientTableApi

  const token = useAppSelector(
    (state: { global: { token: any } }) => state.global.token,
  )

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [deletePatients, deletePatientsResponse] = useDeletePatientsMutation()
  const navigate = useNavigate()

  const handleFilterEnums = (
    enums: {
      value: string
      label: string
    }[],
  ) =>
    enums.reduce((acc, state) => {
      acc[state.value] = { text: state.label }
      return acc
    }, {} as ProSchemaValueEnumObj)

  const columns: ProColumns<PatientTableT.Patient>[] = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "index",
      fixed: "left",
      width: 48,
    },
    {
      title: "CR Number",
      dataIndex: "cr_number",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "dob",
      // sorter: (a, b) => a.age - b.age,
      renderText(text, record, index, action) {
        const today = new Date()
        const birthDate = new Date(text)
        const age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1
        }
      },
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      valueType: "select",
      valueEnum: handleFilterEnums(genderOptions),
    },
    {
      title: "State",
      dataIndex: "state",
      valueType: "select",
      valueEnum: handleFilterEnums(indianStates),
    },

    {
      title: "Smoking",
      dataIndex: "smoking",
      valueType: "select",
      valueEnum: handleFilterEnums(smokingStatusOptions),
    },
    {
      title: "Family History",
      dataIndex: "family_history",
      valueType: "select",
      valueEnum: handleFilterEnums(familyHistoryOptions),
    },
    {
      title: "Gene",
      dataIndex: "gene",
      valueType: "select",
      valueEnum: handleFilterEnums(geneOptions),
    },
    {
      title: "Variant",
      dataIndex: "variant",
    },
    {
      title: "Treatment At RGCI",
      dataIndex: "treatment_at_rgci",
      valueType: "select",
      valueEnum: handleFilterEnums(treatmentAtRGCIOptions),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Status at Last Follow Up",
      dataIndex: "status_at_last_follow_up",
      render: (_, record) => (
        <Space>
          {
            <Tag
              color={
                record.status_at_last_follow_up === "Alive"
                  ? "green"
                  : "volcano"
              }
              style={{ cursor: "pointer" }}
              key={record.status_at_last_follow_up}
            >
              {record.status_at_last_follow_up}
            </Tag>
          }
        </Space>
      ),
    },
    {
      title: "Date of Last Follow Up",
      dataIndex: "date_of_last_follow_up",
      valueType: "date",
      fieldProps: {
        format: "DD/MM/YYYY",
      },
    },
    {
      title: "Date of HPE Diagnosis",
      dataIndex: "date_of_hpe_diagnosis",
      valueType: "date",
      fieldProps: {
        format: "DD/MM/YYYY",
      },
    },
    {
      title: "ECOG_PS",
      dataIndex: "ecog_ps",
    },
    {
      title: "Extrathoracic Mets",
      dataIndex: "extrathoracic_mets",
      valueEnum: handleFilterEnums(extrathoracicMetastasesOptions),
    },
    {
      title: "Brain Mets",
      dataIndex: "brain_mets",
      valueEnum: handleFilterEnums(brainMetastasesOptions),
    },
    {
      title: "Leptomeningeal Mets",
      dataIndex: "letptomeningeal_mets",
      valueEnum: handleFilterEnums(leptomeningealMetastasesOptions),
    },
    {
      title: "LM Mets CSF",
      dataIndex: "lm_mets_csf",
      valueEnum: handleFilterEnums(lmMetsOptions),
    },
    {
      title: "Histology",
      dataIndex: "histology",
      valueEnum: handleFilterEnums(histoloyOptions),
    },
    {
      title: "PDL1",
      dataIndex: "pdl1",
      valueEnum: handleFilterEnums(pdl1Options),
    },
    {
      title: "BRG1",
      dataIndex: "brg1",
      valueEnum: handleFilterEnums(brg1Options),
    },
    {
      title: "TTF1",
      dataIndex: "ttf1",
      valueEnum: handleFilterEnums(ttf1Options),
    },
    {
      title: "Small Cell Transformation Date",
      dataIndex: "small_cell_transformation_date",
      valueType: "date",
      fieldProps: {
        format: "DD/MM/YYYY",
      },
    },
    {
      title: "VAF",
      dataIndex: "vaf",
    },
    {
      title: "Co-Mutation",
      dataIndex: "co_mutation",
    },
  ]

  const filterLabels: { [key: string]: { text: string } } = columns.reduce(
    (acc, state) => {
      acc[state.dataIndex as string] = {
        text: state.title as string,
      }
      return acc
    },
    {} as { [key: string]: { text: string } },
  )

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
    if (selectedRowKeys.length > 0) {
      deletePatients(selectedRowKeys as string[])
    }
    setIsDeleteModalOpen(false)
    if (deletePatientsResponse) {
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
  const formRef = React.useRef<ProFormInstance>()

  const [params, setParams] = useState<PatientTableT.SearchParams | {}>({})

  const [showFilterModal, setShowFilterModal] = useState(false)

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal)
  }

  return (
    <>
      <ProTable<PatientTableT.Patient, PatientTableT.SearchParams>
        scroll={{
          x: "max-content",
        }}
        bordered
        onRow={(record) => ({
          onClick: () => {
            navigate(`/patients/${record._id}`, {
              state: { isEdit: true, patient: record },
            })
          },
          style: { cursor: "pointer" },
        })}
        options={{
          setting: {
            checkable: true,
            draggable: true,
            listsHeight: 150,
            settingIcon: <TableOutlined />,
          },
          density: false,
        }}
        columnsState={{
          persistenceKey: "patientTable",
          persistenceType: "localStorage",
          defaultValue: {
            cr_number: { show: true, fixed: "left" },
            name: { show: true },
            dob: { show: true },
            // age: { show: true },
            gender: { show: true },
            state: { show: false },
            smoking: { show: false },
            family_history: { show: false },
            gene: { show: true },
            variant: { show: false },
            treatment_at_rgci: { show: false },
            phone_number: { show: false },
            status_at_last_follow_up: { show: true },
            date_of_last_follow_up: { show: true },
            date_of_hpe_diagnosis: { show: false },
            ecog_ps: { show: false },
            extrathoracic_mets: { show: false },
            brain_mets: { show: false },
            letptomeningeal_mets: { show: false },
            lm_mets_csf: { show: false },
            histology: { show: false },
            pdl1: { show: false },
            brg1: { show: false },
            ttf1: { show: false },
            small_cell_transformation_date: { show: false },
            vaf: { show: false },
            co_mutation: { show: false },
          },
        }}
        actionRef={actionRef}
        formRef={formRef}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRowKeys(selectedRows.map((row) => row._id))
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        columns={columns}
        rowKey="cr_number"
        pagination={{
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          showSizeChanger: true,
        }}
        toolbar={{
          filter: (
            <Space
              size={[0, "middle"]}
              wrap
              style={{
                marginBottom: 16,
              }}
            >
              {Object.entries(params)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => (
                  <Tag
                    key={key}
                    color="green"
                    style={{ cursor: "pointer", padding: "0 5px" }}
                    closable={false}
                    onClose={() => {
                      const newParams: {
                        [key: string]:
                          | string
                          | number
                          | (undefined &
                              Record<string, string | number | undefined>)
                      } = { ...params }
                      delete newParams[key]
                      setParams(newParams)
                      formRef.current?.setFieldsValue(newParams)
                    }}
                  >
                    {
                      filterLabels[key as keyof typeof filterLabels]
                        .text as string
                    }
                    : {value}
                  </Tag>
                ))
                .filter((tag) => tag !== undefined)}
            </Space>
          ),
          multipleLine: true,
        }}
        search={
          showFilterModal && {
            filterType: "query",
            split: true,
            labelWidth: "auto",
            layout: "vertical",
            searchText: "Search",
            optionRender: ({ searchText, resetText }, { form }) => [
              <Button
                key="search"
                type="primary"
                onClick={() => {
                  form?.submit()
                }}
                icon={<FilterOutlined />}
              >
                {searchText}
              </Button>,
              <Button
                key="rest"
                onClick={() => {
                  form?.resetFields()
                  setParams({})
                }}
              >
                {resetText}
              </Button>,
            ],
          }
        }
        request={async (params, sort, filter) => {
          if (sort) {
            sort = {
              sort: Object.entries(sort).map(([key, value]) => {
                return `${key}`
              }),
              order: Object.entries(sort).map(([key, value]) => {
                return `${value}` as "asc" | "desc"
              }),
            } as unknown as Record<string, SortOrder>
          }
          const newParams = { ...params }
          delete newParams["current"]
          delete newParams["pageSize"]
          setParams(newParams)

          const url = new URLSearchParams({
            ...(params as unknown as Record<string, string>),
            ...(sort as unknown as Record<string, string>),
            ...(filter as unknown as Record<string, string>),
          }).toString()

          return request(
            `${
              import.meta.env.REACT_APP_API_URL
            }/api/patients/get-patients?${url}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            },
          ).then((res) => {
            return {
              data: res.patients,
              success: res.success,
              total: res.totalCount,
            }
          })
        }}
        columnEmptyText="NA"
        toolBarRender={() => [
          <Tooltip title={"Filter"}>
            <Badge count={Object.entries(params).length}>
              <Button
                key="button"
                icon={<FilterOutlined />}
                onClick={handleFilterModal}
                type="primary"
              />
            </Badge>
          </Tooltip>,
          <Tooltip title={"Add Patient"}>
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate("/patients/add-patient", {
                  state: { isEdit: false },
                })
              }}
              type="primary"
            />
          </Tooltip>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Tooltip title={"Delete"}>
              <Button
                key="button"
                icon={<DeleteRowOutlined />}
                onClick={() => {
                  showDeleteModal()
                }}
                type="primary"
                danger
              />
            </Tooltip>
          ),
          <Tooltip title={"Import"}>
            <Button
              key="button"
              icon={<ImportOutlined />}
              onClick={() => {
                showUploadModal()
              }}
              type="dashed"
            />
          </Tooltip>,
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
