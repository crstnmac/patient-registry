import { Layout, theme } from "antd"
import React from "react"
import BreadcrumbNav from "./components/BreadcrumbNav"
// import AvatarIcon from "./components/AvatarIcon"

const LayoutHeader = () => {
  const { Header } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorBgContainer,
      }}
    >
      <BreadcrumbNav />
    </Header>
  )
}

export default LayoutHeader
