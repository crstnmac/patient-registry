import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { Input, message } from "antd"
import patientTableApi, { PatientTable } from "../patientTable/patientTableApi"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function AddPatientForm() {
  const [form] = ProForm.useForm()

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed:", errorInfo)
  }
  const navigate = useNavigate()

  const { state } = useLocation()

  const { isEdit, patient } = state

  const { useAddPatientMutation, useUpdatePatientMutation } = patientTableApi

  const [addPatient, { isLoading }] = useAddPatientMutation()

  const [updatePatient] = useUpdatePatientMutation()

  const onFinish = async (values: any) => {
    if (isEdit) {
      updatePatient({
        _id: patient?._id,
        ...values,
      })
      message.success("Patient updated successfully")
      navigate("/patients")
      return
    }
    addPatient(values)
    message.success("Patient added successfully")
    navigate("/patients")
  }

  useEffect(() => {
    if (isEdit && patient) {
      form.setFieldsValue(patient)
    }
  }, [form, patient, isEdit])

  return (
    <ProCard>
      <ProForm<PatientTable.Patient>
        layout="vertical"
        form={form}
        onFinish={onFinish}
        loading={isLoading}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <ProForm.Group>
          <ProForm.Item label="CR Number" name="cr_number" required>
            <Input />
          </ProForm.Item>
          <ProForm.Item label="Name" name="name" required>
            <Input />
          </ProForm.Item>
          <ProForm.Item label="Age" name="age" required>
            <Input type="number" />
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
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
              ]}
              placeholder="Please select your gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            />
          </ProForm.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProForm.Item label="State" name="state" required>
            <Input />
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
              options={[
                {
                  value: "Never",
                  label: "Never",
                },
                {
                  value: "Ex",
                  label: "Ex",
                },
                {
                  value: "Current",
                  label: "Current",
                },
              ]}
              placeholder="Please select smoking status"
              rules={[
                { required: true, message: "Please select smoking status!" },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item label="Family History" name="family_history" required>
            <ProFormSelect
              options={[
                {
                  value: "Positive",
                  label: "Positive",
                },
                {
                  value: "Negative",
                  label: "Negative",
                },
              ]}
              placeholder="Please select Family History"
              rules={[
                { required: true, message: "Please select Family History!" },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item label="Gene" name="gene" required>
            <ProFormSelect
              options={[
                {
                  value: "EGFR",
                  label: "EGFR",
                },
                {
                  value: "ALK",
                  label: "ALK",
                },
                {
                  value: "ROS1",
                  label: "ROS1",
                },
                {
                  value: "RET",
                  label: "RET",
                },
                {
                  value: "KRAS",
                  label: "KRAS",
                },
                {
                  value: "BRAF",
                  label: "BRAF",
                },
                {
                  value: "ERBB2",
                  label: "ERBB2",
                },
                {
                  value: "NTRK1",
                  label: "NTRK1",
                },
                {
                  value: "NTRK2",
                  label: "NTRK2",
                },
                {
                  value: "NTRK3",
                  label: "NTRK3",
                },
                {
                  value: "MET",
                  label: "MET",
                },
                {
                  value: "Other Rare",
                  label: "Other Rare",
                },
                {
                  value: "Not Tested",
                  label: "Not Tested",
                },
                {
                  value: "None",
                  label: "None",
                },
              ]}
              placeholder="Please select the Gene"
              rules={[{ required: true, message: "Please select the Gene" }]}
            />
          </ProForm.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProForm.Item label="Variant" name="variant" required>
            <ProFormText />
          </ProForm.Item>
          <ProForm.Item
            label="Treatment at RGCI"
            name="treatment_at_rgci"
            required
          >
            <ProFormSelect
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
            />
          </ProForm.Item>
          <ProForm.Item label="Phone Number" name="phone_number" required>
            <ProFormText />
          </ProForm.Item>
          <ProForm.Item
            label="Status at Last Follow-up"
            name="status_at_last_follow_up"
            required
          >
            <ProFormSelect
              options={[
                {
                  value: "Alive",
                  label: "Alive",
                },
                {
                  value: "Dead",
                  label: "Dead",
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item
            label="Date of Last Follow-up"
            name="date_of_last_follow_up"
            required
          >
            <ProFormDatePicker />
          </ProForm.Item>
        </ProForm.Group>

        {/* You can add a dynamic checkup section here if needed */}
      </ProForm>
    </ProCard>
  )

  // return (
  //   <ProLayout
  //     fixSiderbar
  //     fixedHeader
  //     breakpoint={false}
  //     defaultCollapsed
  //     pageTitleRender={false}
  //     menuDataRender={() => [
  //       {
  //         path: "/one",
  //         icon: <SmileOutlined />,
  //         name: "一级名称",
  //         children: [
  //           {
  //             path: "two",
  //             name: "二级名称",
  //           },
  //         ],
  //       },
  //     ]}
  //     layout="mix"
  //     location={{
  //       pathname: "/one/two",
  //     }}
  //   >
  //     <PageContainer title="输入表单">
  //       <Card>
  //         <ProForm
  //           submitter={{
  //             render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
  //           }}
  //           onFinish={async (values) => console.log(values)}
  //         >
  //           <ProForm.Group>
  //             <ProFormText
  //               name="name"
  //               label="签约客户名称"
  //               tooltip="最长为 24 位"
  //               placeholder="请输入名称"
  //             />
  //             <ProFormText
  //               width="md"
  //               name="company"
  //               label="我方公司名称"
  //               placeholder="请输入名称"
  //             />
  //           </ProForm.Group>
  //           <ProForm.Group>
  //             <ProFormText
  //               name={["contract", "name"]}
  //               label="合同名称"
  //               placeholder="请输入名称"
  //             />
  //             <ProFormDateRangePicker
  //               name={["contract", "createTime"]}
  //               label="合同生效时间"
  //             />
  //           </ProForm.Group>
  //           <ProForm.Group>
  //             <ProFormSelect
  //               options={[
  //                 {
  //                   value: "chapter",
  //                   label: "盖章后生效",
  //                 },
  //               ]}
  //               width="xs"
  //               name="chapter"
  //               label="合同约定生效方式"
  //             />
  //             <ProFormSelect
  //               width="xs"
  //               options={[
  //                 {
  //                   value: "time",
  //                   label: "履行完终止",
  //                 },
  //               ]}
  //               name="unusedMode"
  //               label="合同约定失效效方式"
  //             />
  //           </ProForm.Group>
  //           <ProFormText width="sm" name="id" label="主合同编号" />
  //           <ProFormText
  //             name="project"
  //             disabled
  //             label="项目名称"
  //             initialValue="xxxx项目"
  //           />
  //           <ProFormText
  //             width="xs"
  //             name="mangerName"
  //             disabled
  //             label="商务经理"
  //             initialValue="启途"
  //           />
  //           <ProForm.Group>
  //             <ProFormSelect
  //               initialValue="money"
  //               options={[
  //                 {
  //                   value: "money",
  //                   label: "确认金额",
  //                 },
  //               ]}
  //               width="xs"
  //               name="useMode"
  //               label="金额类型"
  //             />
  //             <ProFormSelect
  //               options={[
  //                 {
  //                   value: "6",
  //                   label: "6%",
  //                 },
  //                 {
  //                   value: "12",
  //                   label: "12%",
  //                 },
  //               ]}
  //               initialValue="6"
  //               width="xs"
  //               name="taxRate"
  //               label="税率"
  //             />
  //             <ProFormRadio.Group
  //               label="发票类型"
  //               name="invoiceType"
  //               initialValue="发票"
  //               options={["发票", "普票", "无票"]}
  //             />
  //           </ProForm.Group>
  //           <ProFormUploadButton
  //             extra="支持扩展名：.jpg .zip .doc .wps"
  //             label="倒签报备附件"
  //             name="file"
  //             title="上传文件"
  //           />
  //           <ProFormDigit
  //             width="xs"
  //             name="num"
  //             label="合同份数"
  //             initialValue={5}
  //           />
  //           <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
  //         </ProForm>
  //       </Card>
  //     </PageContainer>
  //   </ProLayout>
  // )
}
