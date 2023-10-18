import React from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./routers"
import { App as AntdApp } from "antd"
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <AntdApp>
        <Router />
      </AntdApp>
    </BrowserRouter>
  )
}
export default App
