import { useRef } from "react"
import { Avatar, Modal, Menu, Dropdown, message, MenuProps } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { HOME_URL } from "@/config/config"
import { useDispatch } from "@/app/store"
import { setToken } from "@/app/globalSlice"
import PasswordModal from "./PasswordModal"
import InfoModal from "./InfoModal"
import avatar from "@/assets/images/avatar.png"

const AvatarIcon = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  interface ModalProps {
    showModal: (params: { name: number }) => void
  }
  const passRef = useRef<ModalProps>(null)
  const infoRef = useRef<ModalProps>(null)

  const logout = () => {
    Modal.confirm({
      title: "Warm reminder 🧡",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to log out?",
      okText: "Ok",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(setToken(""))
        message.success("Log out successfully!")
        navigate("/login")
      },
    })
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span className="dropdown-item">Home</span>,
      onClick: () => navigate(HOME_URL),
    },
    {
      key: "2",
      label: <span className="dropdown-item">Edit </span>,
      onClick: () => infoRef.current!.showModal({ name: 11 }),
    },
    {
      key: "3",
      label: <span className="dropdown-item">Change Password</span>,
      onClick: () => passRef.current!.showModal({ name: 11 }),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <span className="dropdown-item">Sign out</span>,
      onClick: logout,
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
        <Avatar size="large" src={avatar} />
      </Dropdown>
      <InfoModal innerRef={infoRef}></InfoModal>
      <PasswordModal innerRef={passRef}></PasswordModal>
    </>
  )
}

export default AvatarIcon
