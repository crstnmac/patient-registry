import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { Button, Divider, message } from "antd"
import patientTableApi, { PatientTable } from "../patientTable/patientTableApi"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  brainMetastasesOptions,
  brg1Options,
  ecogPSOptions,
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
  statusAtLastFollowUpOptions,
  treatmentAtRGCIOptions,
  ttf1Options,
} from "@/utils/constants"

import { EditOutlined } from "@ant-design/icons"

export function AddPatientForm() {
  const [form] = ProForm.useForm()

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed:", errorInfo)
  }
  const navigate = useNavigate()

  const { state } = useLocation()

  const { isEdit, patientId } = state

  const {
    useAddPatientMutation,
    useUpdatePatientMutation,
    useGetPatientByIdQuery,
  } = patientTableApi

  const {
    data,
    error,
    isLoading: isPatientLoading,
  } = useGetPatientByIdQuery(patientId, {
    skip: !patientId,
  })

  const [addPatient, { isLoading: isPatientMutating }] = useAddPatientMutation()

  const [updatePatient] = useUpdatePatientMutation()

  const onFinish = async (values: any) => {
    if (isEdit) {
      updatePatient({
        _id: patientId,
        ...values,
      })
      form.setFieldsValue(data?.patient)
      message.success("Patient updated successfully")
      navigate("/patients")
      return
    } else {
      const { _id, ...body } = values
      addPatient(body)
      message.success("Patient added successfully")
      navigate("/patients")
      return
    }
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.patient)
    }
    if (error) {
      message.error("Something went wrong")
    }
  }, [data, error, form])

  const [edit, setEdit] = useState(isEdit || false)

  return (
    <ProCard>
      <ProForm<PatientTable.Patient>
        layout="vertical"
        form={form}
        dateFormatter="string"
        onFinish={onFinish}
        labelAlign="left"
        labelCol={{
          style: {
            fontWeight: 600,
          },
        }}
        // readonly={edit}
        loading={isPatientLoading || isPatientMutating}
        onFinishFailed={onFinishFailed}
        submitter={{
          searchConfig: {
            submitText: "Save",
            resetText: "Cancel",
          },
          onReset: () => {
            navigate("/patients", {
              replace: true,
            })
          },
        }}
        initialValues={{ remember: true }}
      >
        <ProForm.Group
          title="Bio"
          collapsible
          titleStyle={{
            cursor: "pointer",
          }}
          labelLayout="inline"
        >
          <ProForm.Group>
            <ProForm.Item label="CR Number" name="cr_number" required>
              <ProFormText width={"sm"} />
            </ProForm.Item>
            <ProForm.Item label="Name" name="name" required>
              <ProFormText width={"sm"} />
            </ProForm.Item>
            <ProForm.Item label="Date of Birth" name="dob" required>
              <ProFormDatePicker width={"sm"} />
            </ProForm.Item>
            <ProForm.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <ProFormSelect
                width={"sm"}
                options={genderOptions}
                placeholder="Please select your gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              />
            </ProForm.Item>

            <ProForm.Item
              label="State"
              rules={[
                {
                  required: true,
                },
              ]}
              name="state"
              required
            >
              <ProFormSelect
                width={"sm"}
                options={indianStates}
                showSearch
                placeholder="Please select your state"
                rules={[
                  { required: true, message: "Please select your state!" },
                ]}
              />
            </ProForm.Item>
            <ProForm.Item
              label="Smoking"
              name="smoking"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <ProFormSelect
                options={smokingStatusOptions}
                width={"sm"}
                placeholder="Please select smoking status"
                rules={[
                  { required: true, message: "Please select smoking status!" },
                ]}
              />
            </ProForm.Item>
            <ProForm.Item label="Family History" name="family_history" required>
              <ProFormSelect
                options={familyHistoryOptions}
                width={"sm"}
                placeholder="Please select Family History"
                rules={[
                  { required: true, message: "Please select Family History!" },
                ]}
              />
            </ProForm.Item>
            <ProForm.Item label="Gene" name="gene" required>
              <ProFormSelect
                options={geneOptions}
                width={"sm"}
                placeholder="Please select the Gene"
                rules={[{ required: true, message: "Please select the Gene" }]}
              />
            </ProForm.Item>

            <ProForm.Item label="Variant" name="variant" required>
              <ProFormText width={"sm"} />
            </ProForm.Item>
            <ProForm.Item
              label="Treatment at RGCI"
              name="treatment_at_rgci"
              required
            >
              <ProFormSelect width={"sm"} options={treatmentAtRGCIOptions} />
            </ProForm.Item>
            <ProForm.Item label="Phone Number" name="phone_number" required>
              <ProFormText width={"sm"} />
            </ProForm.Item>
            <ProForm.Item
              label="Status at Last Follow-up"
              name="status_at_last_follow_up"
              required
            >
              <ProFormSelect
                width={"sm"}
                options={statusAtLastFollowUpOptions}
              />
            </ProForm.Item>
            <ProForm.Item
              label="Date of Last Follow-up"
              name="date_of_last_follow_up"
              required
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
                  format: (value) => value.format("DD-MM-YYYY"),
                }}
              />
            </ProForm.Item>
            <ProForm.Item label="ECOG_PS" name="ecog_ps">
              <ProFormSelect width={"sm"} options={ecogPSOptions} />
            </ProForm.Item>
            <ProForm.Item label="Extrathoracic Mets" name="extrathoracic_mets">
              <ProFormSelect
                width={"sm"}
                options={extrathoracicMetastasesOptions}
              />
            </ProForm.Item>
            <ProForm.Item label="Brain Mets" name="brain_mets">
              <ProFormSelect width={"sm"} options={brainMetastasesOptions} />
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
              dataFormat="DD/MM/YYYY"
            >
              <ProFormDatePicker width={"sm"} />
            </ProForm.Item>
            <ProForm.Item label="VAF" name="vaf">
              <ProFormText width={"sm"} />
            </ProForm.Item>
            <ProForm.Item label="Co-Mutation" name="co_mutation">
              <ProFormText width={"sm"} />
            </ProForm.Item>
          </ProForm.Group>
        </ProForm.Group>
      </ProForm>
    </ProCard>
  )
}
