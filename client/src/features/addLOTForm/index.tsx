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

const AddLOTForm = () => {
  const params = useParams()

  const { id, lotId } = params

  const [form] = ProForm.useForm()

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: "Failed to add LOT",
    })
  }

  const { useAddLOTMutation, useUpdateLOTMutation } = patientTableApi

  const [addLOT, { isLoading }] = useAddLOTMutation()
  const [updateLOT] = useUpdateLOTMutation()
  const navigate = useNavigate()

  const { state } = useLocation()

  const { patientLOT, isEdit } = state

  console.log(isEdit)

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
      navigate(`/patients/${id}`, {
        state: {
          patientId: id,
          isEdit: true,
        },
      })
      return
    }

    addLOT({
      patientId: id,
      ...values,
    })
    message.success({ content: "LOT added successfully" })
    navigate(`/patients/${id}`, {
      state: {
        patientId: id,
        isEdit: false,
      },
    })
  }

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(patientLOT)
    }
  }, [form, isEdit, patientLOT])

  const drugs = [
    "Gefitinib",
    "Erlotinib",
    "Afatinib",
    "Osimertinib",
    "Amivantamab",
    "Crizotinib",
    "Alectinib",
    "Brigatinib",
    "Lorlatinib",
    "Ceretinib",
    "Entrectinib",
    "Dacomitinib",
    "Selpercatenib",
    "Pralsetinib",
    "Capmatinib",
    "Savolitinib",
    "Osi-Savo",
    "Trastuzumab deruxtecan",
    "Larotrectinib",
    "Tepotinib",
    "Moboceritinib",
  ]

  const drugsChemotherapy = [
    "Pem",
    "Pem_Cis",
    "Pem_Carb",
    "Gem_cis",
    "Gem_carb",
    "Paclitaxel",
    "Docetaxel",
  ]

  const treatment = [
    "Chemotherapy",
    "Targeted",
    "Immunotherapy",
    "Chemo-immuno",
    "Radiation",
    "Surgery",
    "No treatment",
  ]

  const drugImmuno = [
    "Nivolumab",
    "Pembrolizumab",
    "Druvalumab",
    "Atezolizumab",
  ]

  const pet_cet = [
    {
      value: "CR",
      label: "Complete Response",
    },
    {
      value: "PR",
      label: "Partial Response",
    },
    {
      value: "SD",
      label: "Stable Disease",
    },
    {
      value: "PD",
      label: "Progressive Disease",
    },
    {
      value: "Not assessed",
      label: "Not Assessed",
    },
  ]

  const intracranialResponses = [
    {
      value: "CR",
      label: "Complete Response",
    },
    {
      value: "PR",
      label: "Partial Response",
    },
    {
      value: "SD",
      label: "Stable Disease",
    },
    {
      value: "PD/new lesions",
      label: "Progressive Disease/New lesions",
    },
    {
      value: "Not assessed",
      label: "Not Assessed",
    },
  ]

  const treatmentOptions = treatment.map((treatment) => {
    return {
      value: treatment,
      label: treatment,
    }
  })

  const drugsTargeted = drugs.map((drug) => {
    return {
      value: drug,
      label: drug,
    }
  })

  const drugsChemo = drugsChemotherapy.map((drug) => {
    return {
      value: drug,
      label: drug,
    }
  })

  const drugsImmuno = drugImmuno.map((drug) => {
    return {
      value: drug,
      label: drug,
    }
  })

  const petCetOptions = pet_cet.map((pet) => {
    return {
      value: pet.value,
      label: pet.label,
    }
  })

  const intracranialResponseOptions = intracranialResponses.map((pet) => {
    return {
      value: pet.value,
      label: pet.label,
    }
  })

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
          <ProForm.Item
            label="Treatment"
            name="treatment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              width={"sm"}
              showSearch
              options={treatmentOptions}
              placeholder="Please select your gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            />
          </ProForm.Item>

          <ProForm.Item
            label="Drug Targeted"
            name="drug_name_targeted"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              options={drugsTargeted}
              width={"sm"}
              showSearch
              placeholder="Please select the drug"
              rules={[{ required: true, message: "Please select the drug!" }]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Drug Name Chemotherapy"
            name="drug_name_chemo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              options={drugsChemo}
              width={"sm"}
              showSearch
              placeholder="Please select the drug"
              rules={[{ required: true, message: "Please select the drug!" }]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Drug Immunotherapy"
            name="drug_name_immuno"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              options={drugsImmuno}
              width={"sm"}
              showSearch
              placeholder="Please select the drug"
              rules={[{ required: true, message: "Please select the drug!" }]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Date start of Treatment"
            name="date_of_start_of_treatment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormDatePicker
              width={"sm"}
              fieldProps={{
                format: (value) => value.format("DD-MM-YYYY"),
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Response PET CT"
            name="response_pet_ct"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              options={petCetOptions}
              width={"sm"}
              showSearch
              placeholder="Please select response PET CT"
              rules={[
                {
                  required: true,
                  message: "Please select response PET CT ",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Intracranial Response"
            name="intracranial_response"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormSelect
              options={intracranialResponseOptions}
              width={"md"}
              showSearch
              placeholder="Please select response PET CT"
              rules={[
                {
                  required: true,
                  message: "Please select response PET CT ",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Is Progressed"
            name="progressed_on_line"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
              rules={[
                {
                  required: true,
                  message: "Has the patient progressed ?",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Date of Progression"
            name="date_of_progression"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormDatePicker
              width={"sm"}
              fieldProps={{
                format: (value) => value.format("DD-MM-YYYY"),
              }}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Biopsy"
            name="biopsy_progression"
            rules={[
              {
                required: true,
              },
            ]}
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
              placeholder="Biopsy"
              rules={[
                {
                  required: true,
                  message: "Biopsy",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="NGS at progression"
            name="ngs_at_progression"
            rules={[
              {
                required: true,
              },
            ]}
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
              rules={[
                {
                  required: true,
                  message: "NGS at progression",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="NGS Result"
            name="ngs_result"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormText width={"sm"} placeholder="NGS result" />
          </ProForm.Item>
          <ProForm.Item
            label="Other Remarks"
            name="other_remarks"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ProFormText width={"md"} placeholder="Other Remarks" />
          </ProForm.Item>
        </ProForm.Group>
      </ProForm>
    </ProCard>
  )
}

export default AddLOTForm
