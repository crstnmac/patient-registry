import { useState, useImperativeHandle, Ref } from "react"
import { Modal, message } from "antd"

interface Props {
  innerRef: Ref<{ showModal: (params: any) => void }>
}

const PasswordModal = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useImperativeHandle(props.innerRef, () => ({
    showModal,
  }))

  const showModal = (params: { name: number }) => {
    console.log(params)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    message.success("Password changed successfully 🎉🎉🎉")
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal
      title="Change Password"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <p>Some Password...</p>
      <p>Some Password...</p>
      <p>Some Password...</p>
    </Modal>
  )
}
export default PasswordModal
