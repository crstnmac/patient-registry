import { useState, useImperativeHandle, Ref } from "react"
import { Modal, message } from "antd"

interface Props {
  innerRef: Ref<{ showModal: (params: any) => void } | undefined>
}

const InfoModal = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false)

  useImperativeHandle(props.innerRef, () => ({
    showModal,
  }))

  const showModal = (params: { name: number }) => {
    console.log(params)
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalVisible(false)
    message.success("User information modified successfully 🎉🎉🎉")
  }

  const handleCancel = () => {
    setModalVisible(false)
  }
  return (
    <Modal
      title="Personal information"
      open={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <p>User Info...</p>
      <p>User Info...</p>
      <p>User Info...</p>
    </Modal>
  )
}
export default InfoModal
