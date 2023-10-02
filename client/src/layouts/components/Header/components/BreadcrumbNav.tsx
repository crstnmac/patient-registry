import { Breadcrumb } from "antd"
import { useLocation } from "react-router-dom"
import { HOME_URL } from "@/config/config"
import { RootState, useSelector } from "@/app/store"

const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const breadcrumbState = useSelector((state: RootState) => state.global)
  const breadcrumbList = breadcrumbState.breadcrumbList[pathname] || []

  const items = breadcrumbList.map((item) => {
    return {
      key: item.path,
      label: item.name,
      href: item.path,
    }
  })

  return (
    <>
      <Breadcrumb items={items} />
    </>
  )
}

export default BreadcrumbNav
