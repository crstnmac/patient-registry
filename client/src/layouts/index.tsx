import { useEffect, useState } from "react"
import { Dropdown, Modal } from "antd"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "@/app/store"
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserAddOutlined,
  PieChartOutlined,
} from "@ant-design/icons"
import { logout, selectUserInfo, updateCollapse } from "@/app/globalSlice"
import { useAppSelector } from "@/app/hooks"
import { MenuProps } from "antd/lib"
import { ProLayout } from "@ant-design/pro-components"

const LayoutIndex = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const userInfo = useAppSelector(selectUserInfo)

  const isLoggedIn = useAppSelector((state) => state.global.userInfo)
  const isCollapsed = useAppSelector((state) => state.global.isCollapse)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  const dispatch = useDispatch()

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => {
        showModal()
      },
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(logout())
      },
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <ProLayout
      title="RGCI Patient Database"
      fixSiderbar
      fixedHeader
      logo={false}
      breakpoint={false}
      collapsed={isCollapsed}
      onCollapse={(collapsed) => {
        dispatch(updateCollapse(collapsed))
      }}
      footerRender={() => (
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            fontSize: "12px",
            color: "rgba(0, 0, 0, 0.45)",
          }}
        >
          <span>
            ©2023 Created by{" "}
            <a
              href=""
              rel="noopener noreferrer"
              target="_blank"
              style={{ color: "rgba(0, 0, 0, 0.45)" }}
            >
              RGCI
            </a>
          </span>
        </div>
      )}
      pageTitleRender={false}
      menuDataRender={() => [
        {
          path: "/patients",
          icon: <TeamOutlined />,
          name: "Patients",
          children: [
            {
              path: "/patients/add-patient",
              name: "Create Patient",
              icon: <UserAddOutlined />,
            },
            {
              path: "/patients/:id/add-lot",
              name: "Add LOT",
              icon: <UserAddOutlined />,
            },
            {
              path: "/patients/:id/edit-patient",
              name: "Edit Patient",
              icon: <UserAddOutlined />,
            },
            {
              path: "/patients/:id/get-lots",
              name: "Line of Treatments",
              icon: <UserAddOutlined />,
            },
          ],
          hideChildrenInMenu: true,
        },
        {
          path: "/analytics",
          icon: <PieChartOutlined />,
          name: "Analytics",
        },
      ]}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/8186664?v=4",
        size: "small",
        title: userInfo?.username,
        shape: "circle",
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: menuItems,
              }}
            >
              {dom}
            </Dropdown>
          )
        },
      }}
      menuItemRender={(item: any, defaultDom: any) => (
        <Link to={item.path}> {defaultDom} </Link>
      )}
      subMenuItemRender={(item: any, defaultDom: any) => (
        <Link to={item.path}> {defaultDom} </Link>
      )}
      breadcrumbRender={(routers = []) => [...routers]}
      layout="mix"
      location={location}
    >
      <Outlet />
      <Modal
        title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Username: {userInfo?.username}</p>
        <p>Role: {userInfo?.role}</p>
        <p>Email: {userInfo?.email}</p>
      </Modal>
    </ProLayout>
  )
}

export default LayoutIndex
