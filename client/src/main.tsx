import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import App from "./App"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider } from "antd"
import en_US from "antd/locale/en_US"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StyleProvider hashPriority="high">
        <ConfigProvider locale={en_US}>
          <App />
        </ConfigProvider>
      </StyleProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
)
