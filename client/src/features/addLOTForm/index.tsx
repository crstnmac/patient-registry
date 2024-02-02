import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import React, { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import patientTableApi from "../patientTable/patientTableApi"
import { message } from "antd"
import {
  drugsChemo,
  drugsImmuno,
  drugsTargeted,
  intracranialResponseOptions,
  petCetOptions,
  treatmentOptions,
} from "@/utils/constants"

const AddLOTForm = ({ isEdit }: { isEdit?: boolean }) => {
  const params = useParams()

  const { id, lotId } = params

  const [form] = ProForm.useForm()

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: `
        Failed to ${isEdit ? "update" : "add"} LOT
      `,
    })
  }

  const { useAddLOTMutation, useUpdateLOTMutation } = patientTableApi

  const [addLOT, { isLoading }] = useAddLOTMutation()
  const [updateLOT] = useUpdateLOTMutation()
  const navigate = useNavigate()

  const { state } = useLocation()

  const { patientLOT } = state

  const onFinish = async (values: any) => {
    if (isEdit) {
      await updateLOT({
        patientId: id,
        ...values,
        _id: lotId,
      })
      message.success({
        content: "LOT updated successfully",
      })
      navigate(`/patients/${id}`)
      return
    } else {
      addLOT({
        patientId: id,
        ...values,
      })
      message.success({ content: "LOT added successfully" })
      navigate(`/patients/${id}`)
      return
    }
  }

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(patientLOT)
    }
  }, [form, isEdit, patientLOT])

  return (
    <ProCard>
      <ProForm
        name="Add LOT"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        loading={isLoading}
        labelAlign="left"
        labelCol={{
          style: {
            fontWeight: 600,
          },
        }}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
        submitter={{
          searchConfig: {
            submitText: "Save",
            resetText: "Cancel",
          },
          onReset: () => {
            navigate(`/patients/${id}`, {
              state: {
                patientId: id,
                isEdit: false,
              },
            })
          },
        }}
      >
        <ProForm.Group>
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
          <ProForm.Item label="Drug Name Chemotherapy" name="drug_name_chemo">
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
          <ProForm.Item label="Date of Progression" name="date_of_progression">
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
          <ProForm.Item label="NGS at progression" name="ngs_at_progression">
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
      </ProForm>
    </ProCard>
  )
}

export default AddLOTForm
