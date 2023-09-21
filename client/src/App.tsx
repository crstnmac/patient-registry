import React from "react"
import { HashRouter } from "react-router-dom"
import AuthRouter from "./routers/utils/authRouter"
import Router from "./routers"

const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken()

  //   return (
  //     <Layout>
  //       <Layout>
  //         <Sider width={200} style={{ background: colorBgContainer }}>
  //           <Header
  //             style={{
  //               borderRight: "1px solid #0f0f0f0f",
  //               backgroundColor: colorBgContainer,
  //               borderBottom: "1px solid #0f0f0f0f",
  //             }}
  //           ></Header>

  //           <Menu
  //             mode="inline"
  //             defaultSelectedKeys={["1"]}
  //             defaultOpenKeys={["sub1"]}
  //             style={{ height: "100%", borderRight: "1px solid #0f0f0f0f" }}
  //           >
  //             <Menu.Item key="1" icon={<UserOutlined />}>
  //               Patients
  //             </Menu.Item>
  //             <Menu.Item key="2" icon={<PieChartTwoTone />}>
  //               Analytics
  //             </Menu.Item>
  //           </Menu>
  //         </Sider>
  //         <Layout>
  //           <Header
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               backgroundColor: colorBgContainer,
  //             }}
  //           ></Header>
  //           <Content
  //             style={{
  //               padding: 24,
  //               margin: 0,
  //               minHeight: "100vh",
  //               background: colorBgContainer,
  //               borderTop: "1px solid #0f0f0f0f",
  //             }}
  //           >
  //             <Outlet></Outlet>
  //           </Content>
  //         </Layout>
  //       </Layout>
  //     </Layout>
  //   )
  // }

  return (
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HashRouter>
  )
}
export default App
