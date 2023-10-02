import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Dropdown, MenuProps, Modal } from "antd"
import {
  PieChartOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { useDispatch } from "../app/store"
import { logout, selectUserInfo, updateCollapse } from "../app/globalSlice"
import { useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
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
        // navigate("/login")
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

  // return (
  //   <Layout>
  //     <Layout>
  //       <Sider width={200} style={{ background: colorBgContainer }}>
  //         <Header
  //           style={{
  //             borderRight: "1px solid #0f0f0f0f",
  //             backgroundColor: colorBgContainer,
  //             borderBottom: "1px solid #0f0f0f0f",
  //           }}
  //         ></Header>

  //         <Menu
  //           mode="inline"
  //           defaultSelectedKeys={["1"]}
  //           defaultOpenKeys={["sub1"]}
  //           items={[
  //             {
  //               key: "1",
  //               icon: <TeamOutlined />,
  //               label: "Patients",
  //               title: "Patients",
  //               onClick: () => {
  //                 navigate("/patients")
  //               },
  //             },
  //             {
  //               key: "2",
  //               icon: <PieChartTwoTone />,
  //               label: "Analytics",
  //               title: "Analytics",
  //               onClick: () => {
  //                 navigate("/analytics")
  //               },
  //             },
  //           ]}
  //           style={{ height: "100%", borderRight: "1px solid #0f0f0f0f" }}
  //         />
  //       </Sider>
  //       <Layout>
  //         <Header
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "space-between",
  //             backgroundColor: colorBgContainer,
  //           }}
  //         >
  //           <h1 className="font-bold text-2xl">RGCI Patient Database</h1>
  //           <Dropdown
  //             menu={{
  //               items: menuItems,
  //             }}
  //             placement="bottomLeft"
  //           >
  //             <Button>{userInfo?.username}</Button>
  //           </Dropdown>
  //         </Header>
  //         <Content
  //           style={{
  //             padding: 18,
  //             margin: 0,
  //             minHeight: "100vh",
  //             background: colorBgContainer,
  //             borderTop: "1px solid #0f0f0f0f",
  //           }}
  //         >
  //           <Outlet></Outlet>
  //           <Modal
  //             title="Profile"
  //             open={isModalOpen}
  //             onOk={handleOk}
  //             onCancel={handleCancel}
  //           >
  //             <p>Username: {userInfo?.username}</p>
  //             <p>Role: {userInfo?.role}</p>
  //             <p>Email: {userInfo?.email}</p>
  //           </Modal>
  //         </Content>
  //       </Layout>
  //     </Layout>
  //   </Layout>
  // )

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
              path: "/patients/:id/add-checkup",
              name: "Add Checkup",
              icon: <UserAddOutlined />,
            },
            {
              path: "/patients/:id/edit-patient",
              name: "Edit Patient",
              icon: <UserAddOutlined />,
            },
            {
              path: "/patients/:id/get-checkups",
              name: "Checkups",
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
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: "Home",
        },
        ...routers,
      ]}
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
