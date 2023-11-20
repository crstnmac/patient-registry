import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { App, Button, Divider, message } from "antd"
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

export function AddPatientForm() {
  const [form] = ProForm.useForm()

  const { message } = App.useApp()

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: "Something went wrong",
    })
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
    refetch,
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
      message.success({ content: "Patient updated successfully" })
      navigate("/patients")
      return
    } else {
      const { _id, ...body } = values
      addPatient(body)
      message.success({ content: "Patient added successfully" })
      navigate("/patients")
      return
    }
  }

  useEffect(() => {
    if (isEdit) {
      refetch()
      form.setFieldsValue(data?.patient)
    }
    if (error) {
      message.error({ content: "Something went wrong" })
    }
  }, [data?.patient, error, form, isEdit, message, refetch])

  // const [edit, setEdit] = useState(isEdit || false)

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
            <ProFormText
              label="CR Number"
              name="cr_number"
              width={"sm"}
              validateFirst
              rules={[
                {
                  required: true,
                  message: "Please enter the CR Number",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "Please enter a valid CR Number",
                },
              ]}
            />
            <ProFormText
              label="Name"
              name="name"
              width={"sm"}
              rules={[
                {
                  required: true,
                  message: "Please enter the name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter a valid name",
                },
                {
                  min: 3,
                  message: "Please enter a valid name",
                },
              ]}
            />
            <ProFormDatePicker
              label="Date of Birth"
              name="dob"
              width={"sm"}
              dataFormat="DD/MM/YYYY"
              fieldProps={{
                format: (value) => value.format("DD/MM/YYYY"),
              }}
              rules={[
                {
                  required: true,
                  message: "Please select the date of birth",
                },
                {
                  validator: (_, value) => {
                    if (value && value.isBefore(new Date())) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error("Date of birth cannot be in future"),
                    )
                  },
                },
              ]}
            />

            <ProFormSelect
              label="Gender"
              name="gender"
              width={"sm"}
              options={genderOptions}
              placeholder="Please select your gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            />
            <ProFormSelect
              label="State"
              name="state"
              width={"sm"}
              options={indianStates}
              showSearch
              placeholder="Please select your state"
              rules={[{ required: true, message: "Please select your state!" }]}
            />

            <ProFormSelect
              label="Smoking"
              name="smoking"
              options={smokingStatusOptions}
              width={"sm"}
              placeholder="Please select smoking status"
              rules={[
                { required: true, message: "Please select smoking status!" },
              ]}
            />

            <ProFormSelect
              label="Family History"
              name="family_history"
              options={familyHistoryOptions}
              width={"sm"}
              placeholder="Please select Family History"
              rules={[
                { required: true, message: "Please select Family History!" },
              ]}
            />

            <ProFormSelect
              label="Gene"
              name="gene"
              options={geneOptions}
              width={"sm"}
              placeholder="Please select the Gene"
              rules={[{ required: true, message: "Please select the Gene" }]}
            />

            <ProFormText
              label="Variant"
              name="variant"
              width={"sm"}
              rules={[{ required: true, message: "Please select the Variant" }]}
            />

            <ProFormSelect
              label="Treatment at RGCI"
              name="treatment_at_rgci"
              width={"sm"}
              options={treatmentAtRGCIOptions}
              rules={[
                {
                  required: true,
                  message: "Please select the treatment at rgci",
                },
              ]}
            />

            <ProFormText
              label="Phone Number"
              name="phone_number"
              width={"sm"}
              rules={[
                {
                  required: true,
                  message: "Please enter the phone number",
                },
              ]}
            />

            <ProFormSelect
              label="Status at Last Follow-up"
              name="status_at_last_follow_up"
              width={"sm"}
              options={statusAtLastFollowUpOptions}
              rules={[
                {
                  required: true,
                  message: "Please select the status at last followup",
                },
              ]}
            />

            <ProFormDatePicker
              label="Date of Last Follow-up"
              name="date_of_last_follow_up"
              width={"sm"}
              dataFormat="DD/MM/YYYY"
              fieldProps={{
                format: (value) => value.format("DD/MM/YYYY"),
              }}
              rules={[
                {
                  required: true,
                  message: "Please select the date of last followup",
                },
                {
                  validator: (_, value) => {
                    if (value && value.isBefore(new Date())) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error("Date of last followup cannot be in future"),
                    )
                  },
                },
              ]}
            />
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
            <ProFormDatePicker
              label="Date of HPE Diagnosis"
              name="date_of_hpe_diagnosis"
              width={"sm"}
              fieldProps={{
                format: (value) => value.format("DD/MM/YYYY"),
              }}
            />
            <ProFormSelect
              label="ECOG_PS"
              name="ecog_ps"
              width={"sm"}
              options={ecogPSOptions}
            />
            <ProFormSelect
              label="Extrathoracic Mets"
              name="extrathoracic_mets"
              width={"sm"}
              options={extrathoracicMetastasesOptions}
            />
            <ProFormSelect
              label="Brain Mets"
              name="brain_mets"
              width={"sm"}
              options={brainMetastasesOptions}
            />
            <ProFormSelect
              label="Letptomeningeal Mets"
              name="letptomeningeal_mets"
              width={"sm"}
              options={leptomeningealMetastasesOptions}
            />

            <ProFormSelect
              label="LM Mets CSF"
              name="lm_mets_csf"
              width={"md"}
              options={lmMetsOptions}
            />
            <ProFormSelect
              label="Histology"
              name="histology"
              width={"md"}
              options={histoloyOptions}
            />
            <ProFormSelect
              label="PDL1"
              name="pdl1"
              width={"sm"}
              options={pdl1Options}
            />
            <ProFormSelect
              label="BRG1"
              name="brg1"
              width={"sm"}
              options={brg1Options}
            />
            <ProFormSelect
              label="TTF1"
              name="ttf1"
              width={"sm"}
              options={ttf1Options}
            />
            <ProFormDatePicker
              label="Small Cell Transformation Date"
              name="small_cell_transformation_date"
              fieldProps={{
                format: (value) => value.format("DD/MM/YYYY"),
              }}
              width={"sm"}
            />
            <ProFormText label="VAF" name="vaf" width={"sm"} />
            <ProFormText label="Co-Mutation" name="co_mutation" width={"sm"} />
          </ProForm.Group>
        </ProForm.Group>
      </ProForm>
    </ProCard>
  )
}
