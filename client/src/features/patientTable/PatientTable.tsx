import React, { useState } from "react"
import patientTableApi, {
  PatientTable as PatientTableT,
} from "@/features/patientTable/patientTableApi"
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProSchemaValueEnumObj,
  ProTable,
} from "@ant-design/pro-components"

import {
  Badge,
  Button,
  Divider,
  Form,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd"
import {
  PlusOutlined,
  ImportOutlined,
  DeleteRowOutlined,
  FilterOutlined,
  TableOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons"
import ImportData from "../importData/ImportData"
import { useNavigate } from "react-router-dom"
import "./PatientTable.module.css"
import {
  brainMetastasesOptions,
  brg1Options,
  drugsChemo,
  drugsImmuno,
  drugsTargeted,
  ecogPSOptions,
  extrathoracicMetastasesOptions,
  familyHistoryOptions,
  genderOptions,
  geneOptions,
  histoloyOptions,
  indianStates,
  intracranialResponseOptions,
  leptomeningealMetastasesOptions,
  lmMetsOptions,
  pdl1Options,
  petCetOptions,
  smokingStatusOptions,
  statusAtLastFollowUpOptions,
  treatmentAtRGCIOptions,
  treatmentOptions,
  ttf1Options,
} from "@/utils/constants"

export function PatientTable() {
  const { useDeletePatientsMutation, useGetPatientsQuery } = patientTableApi

  const [url, setUrl] = useState<string>("")

  const [form] = Form.useForm()

  const { data, error, isLoading, refetch } = useGetPatientsQuery(url, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })

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

  const actionRef = React.useRef<ActionType>()
  const formRef = React.useRef<ProFormInstance>()
  const modalFormRef = React.useRef<ProFormInstance>()

  const [params, setParams] = useState<Partial<PatientTableT.SearchParams>>({
    page: 1,
    rowsPerPage: 10,
  })

  const [filters, setFilters] = useState<
    Partial<PatientTableT.SearchParams | Omit<"page", "rowsPerPage">>
  >({})

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [showFilterModal, setShowFilterModal] = useState(false)

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal)
  }

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
      message.success({ content: "Patient deleted successfully" })
    } else {
      message.error({ content: "Patient deletion failed" })
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const columns: ProColumns<PatientTableT.Patient>[] = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      fixed: "left",
      width: 48,
    },
    {
      title: "CR Number",
      dataIndex: "cr_number",
      width: 120,
      sorter: (a, b) => Number(a.cr_number) - Number(b.cr_number),
      render(dom, entity, index, action, schema) {
        const dot =
          new Date(entity.createdAt).getTime() >
          new Date().getTime() - 1000 * 60 * 10 // 10 mins ago
        return (
          <Tooltip title="Data recently added" open={dot}>
            <Badge dot={dot}>{dom}</Badge>
          </Tooltip>
        )
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    // {
    //   title: "Age",
    //   dataIndex: "dob",
    //   sorter: (a, b) => a.age - b.age,
    //   renderText(text, record, index, action) {
    //     const today = new Date()
    //     const birthDate = new Date(text)
    //     const age = today.getFullYear() - birthDate.getFullYear()
    //     const m = today.getMonth() - birthDate.getMonth()
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //       return age - 1
    //     }
    //   },
    // },
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

  const filterColumns = [
    { title: "#", dataIndex: "index" },
    { title: "CR Number", dataIndex: "cr_number" },
    { title: "Name", dataIndex: "name" },
    { title: "Gender", dataIndex: "gender" },
    { title: "State", dataIndex: "state" },
    { title: "Smoking", dataIndex: "smoking" },
    { title: "Family History", dataIndex: "family_history" },
    { title: "Gene", dataIndex: "gene" },
    { title: "Variant", dataIndex: "variant" },
    { title: "Treatment At RGCI", dataIndex: "treatment_at_rgci" },
    { title: "Phone Number", dataIndex: "phone_number" },
    {
      title: "Status at Last Follow Up",
      dataIndex: "status_at_last_follow_up",
    },
    { title: "Date of Last Follow Up", dataIndex: "date_of_last_follow_up" },
    { title: "Date of HPE Diagnosis", dataIndex: "date_of_hpe_diagnosis" },
    { title: "ECOG_PS", dataIndex: "ecog_ps" },
    { title: "Extrathoracic Mets", dataIndex: "extrathoracic_mets" },
    { title: "Brain Mets", dataIndex: "brain_mets" },
    { title: "Leptomeningeal Mets", dataIndex: "letptomeningeal_mets" },
    { title: "LM Mets CSF", dataIndex: "lm_mets_csf" },
    { title: "Histology", dataIndex: "histology" },
    { title: "PDL1", dataIndex: "pdl1" },
    { title: "BRG1", dataIndex: "brg1" },
    { title: "TTF1", dataIndex: "ttf1" },
    {
      title: "Small Cell Transformation Date",
      dataIndex: "small_cell_transformation_date",
    },
    { title: "VAF", dataIndex: "vaf" },
    { title: "Co-Mutation", dataIndex: "co_mutation" },
    { title: "Treatment", dataIndex: "treatment" },
    { title: "Drug Targeted", dataIndex: "drug_name_targeted" },
    { title: "Drug Chemotherapy", dataIndex: "drug_name_chemo" },
    { title: "Drug Immunotherapy", dataIndex: "drug_name_immuno" },
    {
      title: "Date start of Treatment",
      dataIndex: "date_of_start_of_treatment",
    },
    { title: "Response PET CT", dataIndex: "response_pet_ct" },
    { title: "Intracranial Response", dataIndex: "intracranial_response" },
    { title: "Is Progressed", dataIndex: "progressed_on_line" },
    { title: "Date of Progression", dataIndex: "date_of_progression" },
    { title: "Biopsy", dataIndex: "biopsy_progression" },
    { title: "NGS at progression", dataIndex: "ngs_at_progression" },
    { title: "NGS Result", dataIndex: "ngs_result" },
  ]

  const filterLabels = filterColumns.reduce(
    (acc, column) => {
      acc[column.dataIndex as string] = {
        text: column.title as string,
      }
      return acc
    },
    {} as { [key: string]: { text: string } },
  )

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
              state: { isEdit: true, patientId: record._id },
            })
          },
          style: { cursor: "pointer", whiteSpace: "nowrap" },
        })}
        tableLayout="auto"
        options={{
          setting: {
            checkable: true,
            draggable: true,
            listsHeight: 150,
            settingIcon: <TableOutlined />,
          },
          density: false,
          reload: () => {
            refetch()
          },
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
          current: params?.page || 1,
          pageSize: params?.rowsPerPage || 10,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          defaultCurrent: 1,
          total: data?.totalCount,
          onChange(page, pageSize) {
            const newParams = { ...params, page, rowsPerPage: pageSize }
            setParams(newParams)
            const urlSearchParams = new URLSearchParams(
              newParams as unknown as Record<string, string>,
            )
            const url = urlSearchParams.toString()
            setUrl(url)
          },
          showSizeChanger: true,
        }}
        toolbar={{
          title: `Total (${data?.totalCount})`,
          filter: (
            <Space
              size={[10, "middle"]}
              wrap
              style={{
                marginBottom: 16,
              }}
            >
              {Object.entries(filters).map(([key, value]) => {
                return (
                  <Button
                    type="dashed"
                    key={key}
                    onClick={() => {
                      const newParams: Record<string, any> = { ...params }
                      delete newParams[key]
                      setParams(newParams)
                      const newFilters: Record<string, any> = { ...filters }
                      delete newFilters[key]
                      setFilters(newFilters)
                      const urlSearchParams = new URLSearchParams(
                        newParams as Record<string, string>,
                      )
                      const url = urlSearchParams.toString()
                      setUrl(url)
                    }}
                  >
                    {filterLabels[key].text} : {value}
                  </Button>
                )
              })}
            </Space>
          ),
          multipleLine: true,
        }}
        dataSource={data?.patients}
        loading={isLoading}
        search={false}
        columnEmptyText="NA"
        toolBarRender={() => [
          <ModalForm<PatientTableT.Patient>
            title="Filters"
            formRef={modalFormRef}
            syncToInitialValues
            preserve={false}
            trigger={
              <Button.Group>
                {Object.entries(filters).length > 0 && (
                  <Tooltip title={"Clear Filters"}>
                    <Button
                      key="button"
                      icon={<CloseCircleTwoTone />}
                      onClick={(e) => {
                        e?.stopPropagation()
                        const newParams: Record<string, any> = { ...params }
                        Object.keys(filters).forEach((key) => {
                          delete newParams[key]
                        })
                        setParams(newParams)
                        setFilters({})
                        const urlSearchParams = new URLSearchParams(
                          newParams as Record<string, string>,
                        )
                        const url = urlSearchParams.toString()
                        setUrl(url)
                      }}
                      type="primary"
                    >
                      Clear
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title={"Filter"}>
                  <Badge count={Object.entries(filters).length}>
                    <Button
                      key="button"
                      icon={<FilterOutlined />}
                      onClick={() => {
                        handleFilterModal()
                        form?.setFieldsValue(filters)
                      }}
                      type="primary"
                    />
                  </Badge>
                </Tooltip>
              </Button.Group>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log("run"),
            }}
            onFinish={async (values) => {
              const newParams = { ...params, ...values }
              setParams(newParams)
              setFilters(values)
              const urlSearchParams = new URLSearchParams(
                newParams as unknown as Record<string, string>,
              )
              const url = urlSearchParams.toString()
              setUrl(url)
              return true
            }}
            submitTimeout={2000}
          >
            <ProForm.Group
              title="Bio"
              collapsible
              defaultCollapsed
              titleStyle={{
                cursor: "pointer",
              }}
              labelLayout="inline"
            >
              <ProForm.Group>
                <ProForm.Item label="CR Number" name="cr_number">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
                <ProForm.Item label="Name" name="name">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
                <ProForm.Item label="Date of Birth" name="dob">
                  <ProFormDatePicker
                    fieldProps={{
                      format: (value) => value.format("DD/MM/YYYY"),
                    }}
                    width={"sm"}
                  />
                </ProForm.Item>
                <ProForm.Item label="Gender" name="gender">
                  <ProFormSelect
                    width={"sm"}
                    options={genderOptions}
                    placeholder="Please select your gender"
                  />
                </ProForm.Item>

                <ProForm.Item label="State" name="state">
                  <ProFormSelect
                    width={"sm"}
                    options={indianStates}
                    showSearch
                    placeholder="Please select your state"
                  />
                </ProForm.Item>
                <ProForm.Item label="Smoking" name="smoking">
                  <ProFormSelect
                    options={smokingStatusOptions}
                    width={"sm"}
                    placeholder="Please select smoking status"
                  />
                </ProForm.Item>
                <ProForm.Item label="Family History" name="family_history">
                  <ProFormSelect
                    options={familyHistoryOptions}
                    width={"sm"}
                    placeholder="Please select Family History"
                  />
                </ProForm.Item>
                <ProForm.Item label="Gene" name="gene">
                  <ProFormSelect
                    options={geneOptions}
                    width={"sm"}
                    placeholder="Please select the Gene"
                  />
                </ProForm.Item>

                <ProForm.Item label="Variant" name="variant">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
                <ProForm.Item
                  label="Treatment at RGCI"
                  name="treatment_at_rgci"
                >
                  <ProFormSelect
                    width={"sm"}
                    options={treatmentAtRGCIOptions}
                  />
                </ProForm.Item>
                <ProForm.Item label="Phone Number" name="phone_number">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
                <ProForm.Item
                  label="Status at Last Follow-up"
                  name="status_at_last_follow_up"
                >
                  <ProFormSelect
                    width={"sm"}
                    options={statusAtLastFollowUpOptions}
                  />
                </ProForm.Item>
                <ProForm.Item
                  label="Date of Last Follow-up"
                  name="date_of_last_follow_up"
                >
                  <ProFormDatePicker
                    width={"sm"}
                    fieldProps={{
                      format: (value) => value.format("DD/MM/YYYY"),
                    }}
                  />
                </ProForm.Item>
              </ProForm.Group>
            </ProForm.Group>

            <Divider />

            <ProForm.Group
              title="Progressive Data"
              collapsible
              defaultCollapsed
              titleStyle={{
                cursor: "pointer",
              }}
              labelLayout="inline"
            >
              <ProForm.Group>
                <ProForm.Item
                  label="Date of HPE Diagnosis"
                  name="date_of_hpe_diagnosis"
                >
                  <ProFormDatePicker
                    width={"sm"}
                    fieldProps={{
                      format: (value) => value.format("DD/MM/YYYY"),
                    }}
                  />
                </ProForm.Item>
                <ProForm.Item label="ECOG_PS" name="ecog_ps">
                  <ProFormSelect width={"sm"} options={ecogPSOptions} />
                </ProForm.Item>
                <ProForm.Item
                  label="Extrathoracic Mets"
                  name="extrathoracic_mets"
                >
                  <ProFormSelect
                    width={"sm"}
                    options={extrathoracicMetastasesOptions}
                  />
                </ProForm.Item>
                <ProForm.Item label="Brain Mets" name="brain_mets">
                  <ProFormSelect
                    width={"sm"}
                    options={brainMetastasesOptions}
                  />
                </ProForm.Item>
                <ProForm.Item
                  label="Letptomeningeal Mets"
                  name="letptomeningeal_mets"
                >
                  <ProFormSelect
                    width={"sm"}
                    options={leptomeningealMetastasesOptions}
                  />
                </ProForm.Item>

                <ProForm.Item label="LM Mets CSF" name="lm_mets_csf">
                  <ProFormSelect width={"md"} options={lmMetsOptions} />
                </ProForm.Item>
                <ProForm.Item label="Histology" name="histology">
                  <ProFormSelect width={"md"} options={histoloyOptions} />
                </ProForm.Item>
                <ProForm.Item label="PDL1" name="pdl1">
                  <ProFormSelect width={"sm"} options={pdl1Options} />
                </ProForm.Item>
                <ProForm.Item label="BRG1" name="brg1">
                  <ProFormSelect width={"sm"} options={brg1Options} />
                </ProForm.Item>
                <ProForm.Item label="TTF1" name="ttf1">
                  <ProFormSelect width={"sm"} options={ttf1Options} />
                </ProForm.Item>
                <ProForm.Item
                  label="Small Cell Transformation Date"
                  name="small_cell_transformation_date"
                >
                  <ProFormDatePicker
                    fieldProps={{
                      format: (value) => value.format("DD/MM/YYYY"),
                    }}
                    width={"sm"}
                  />
                </ProForm.Item>
                <ProForm.Item label="VAF" name="vaf">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
                <ProForm.Item label="Co-Mutation" name="co_mutation">
                  <ProFormText width={"sm"} />
                </ProForm.Item>
              </ProForm.Group>
            </ProForm.Group>

            <Divider />

            <ProForm.Group
              title="Line of Treatments"
              collapsible
              defaultCollapsed
              titleStyle={{
                cursor: "pointer",
              }}
              labelLayout="inline"
            >
              <ProForm.Item label="Treatment" name="treatment">
                <ProFormSelect
                  width={"sm"}
                  showSearch
                  options={treatmentOptions}
                  placeholder="Please select your treatment"
                />
              </ProForm.Item>

              <ProForm.Item label="Drug Targeted" name="drug_name_targeted">
                <ProFormSelect
                  options={drugsTargeted}
                  width={"sm"}
                  showSearch
                  placeholder="Please select the drug"
                />
              </ProForm.Item>
              <ProForm.Item
                label="Drug Name Chemotherapy"
                name="drug_name_chemo"
              >
                <ProFormSelect
                  options={drugsChemo}
                  width={"sm"}
                  showSearch
                  placeholder="Please select the drug"
                />
              </ProForm.Item>
              <ProForm.Item label="Drug Immunotherapy" name="drug_name_immuno">
                <ProFormSelect
                  options={drugsImmuno}
                  width={"sm"}
                  showSearch
                  placeholder="Please select the drug"
                />
              </ProForm.Item>
              <ProForm.Item
                label="Date start of Treatment"
                name="date_of_start_of_treatment"
              >
                <ProFormDatePicker
                  width={"sm"}
                  fieldProps={{
                    format: (value) => value.format("DD/MM/YYYY"),
                  }}
                />
              </ProForm.Item>
              <ProForm.Item label="Response PET CT" name="response_pet_ct">
                <ProFormSelect
                  options={petCetOptions}
                  width={"sm"}
                  showSearch
                  placeholder="Please select response PET CT"
                />
              </ProForm.Item>
              <ProForm.Item
                label="Intracranial Response"
                name="intracranial_response"
              >
                <ProFormSelect
                  options={intracranialResponseOptions}
                  width={"md"}
                  showSearch
                  placeholder="Please select response PET CT"
                />
              </ProForm.Item>
              <ProForm.Item label="Is Progressed" name="progressed_on_line">
                <ProFormSelect
                  width={"sm"}
                  options={[
                    {
                      value: "Progressed",
                      label: "Progressed",
                    },
                    {
                      value: "Not_progressed",
                      label: "Not Progressed",
                    },
                    {
                      value: "LFU",
                      label: "LFU",
                    },
                  ]}
                  showSearch
                  placeholder="Has the patient progressed ?"
                />
              </ProForm.Item>
              <ProForm.Item
                label="Date of Progression"
                name="date_of_progression"
              >
                <ProFormDatePicker
                  width={"sm"}
                  fieldProps={{
                    format: (value) => value.format("DD/MM/YYYY"),
                  }}
                />
              </ProForm.Item>
              <ProForm.Item label="Biopsy" name="biopsy_progression">
                <ProFormSelect
                  width={"sm"}
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                    {
                      value: "No",
                      label: "No",
                    },
                  ]}
                  showSearch
                  placeholder="Biopsy"
                />
              </ProForm.Item>
              <ProForm.Item
                label="NGS at progression"
                name="ngs_at_progression"
              >
                <ProFormSelect
                  width={"sm"}
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                    {
                      value: "No",
                      label: "No",
                    },
                  ]}
                  showSearch
                  placeholder="NGS at progression"
                />
              </ProForm.Item>
              <ProForm.Item label="NGS Result" name="ngs_result">
                <ProFormText width={"sm"} placeholder="NGS result" />
              </ProForm.Item>
              <ProForm.Item label="Other Remarks" name="other_remarks">
                <ProFormText width={"md"} placeholder="Other Remarks" />
              </ProForm.Item>
            </ProForm.Group>
          </ModalForm>,
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
