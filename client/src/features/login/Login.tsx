import { Button, Form, Input, message } from "antd"
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { type Login as TLogin, useLoginMutation } from "./loginAPI"
import { useDispatch } from "../../app/store"
import { setToken, setUserInfo } from "../../app/globalSlice"
import jwtDecode from "jwt-decode"

export default function Login() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login] = useLoginMutation()

  const onFinish = async (loginForm: TLogin.ReqLoginForm) => {
    try {
      setLoading(true)
      const data = await login(loginForm).unwrap()
      dispatch(setToken(data!.access_token))
      dispatch(setUserInfo(jwtDecode(data!.access_token)))
      message.success("Success")
      navigate("/home/index")
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter username" }]}
      >
        <Input placeholder="Username" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="Password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields()
          }}
          icon={<CloseCircleOutlined />}
        >
          Reset
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
