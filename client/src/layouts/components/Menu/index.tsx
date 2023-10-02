import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, Spin } from "antd"
import {
  findAllBreadcrumb,
  getOpenKeys,
  handleRouter,
  searchRoute,
} from "@/utils/util"
import { setMenuList as reduxSetMenuList } from "@/app/globalSlice"
import { setBreadcrumbList } from "@/app/globalSlice"
import { setAuthRouter } from "@/app/authSlice"
import menuApi from "@/features/menu/menuApi"
import type { MenuProps } from "antd"
import * as Icons from "@ant-design/icons"
import { RootState, useDispatch, useSelector } from "@/app/store"

const LayoutMenu = () => {
  const dispatch = useDispatch()
  const { isCollapse, menuList: reduxMenuList } = useSelector(
    (state: RootState) => state.global,
  )
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // Refresh the page menu to keep it highlighted
  useEffect(() => {
    setSelectedKeys([pathname])
    if (!isCollapse) setOpenKeys(getOpenKeys(pathname))
  }, [pathname, isCollapse])

  // Set the currently expanded subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  // Define menu type
  type MenuItem = Required<MenuProps>["items"][number]
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  // Dynamically rendered icon
  const customIcons: { [key: string]: any } = Icons
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name])
  }

  // The key value of the menu returned by the background processing is the key value required by the antd menu.
  const deepLoopFloat = (
    menuList: Menu.MenuOptions[],
    newArr: MenuItem[] = [],
  ) => {
    menuList.forEach((item: Menu.MenuOptions) => {
      // The following judgment code explanation *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children),
        ),
      )
    })
    return newArr
  }

  // Get the menu list and process it into the format required by antd menu
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)
  const { useGetMenuListQuery } = menuApi
  const { data: menuData } = useGetMenuListQuery({})

  console.log(menuData)
  const getMenuData = async () => {
    setLoading(true)
    try {
      const data = menuData?.menus
      if (!data) return
      setMenuList(deepLoopFloat(data))
      // Store all processed breadcrumbs in redux
      dispatch(setBreadcrumbList(findAllBreadcrumb(data)))
      // Process the routing menu into a one-dimensional array, store it in redux, and judge menu permissions
      const dynamicRouter = handleRouter(data)
      dispatch(setAuthRouter(dynamicRouter))
      dispatch(reduxSetMenuList(data))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getMenuData()
  }, [])

  // Click on the current menu to jump to the page
  const navigate = useNavigate()
  const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
    const route = searchRoute(key, reduxMenuList)
    if (route.isLink) window.open(route.isLink, "_blank")
    navigate(key)
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <Spin spinning={loading} tip="Loading...">
        {/* <Logo isCollapse={isCollapse}></Logo> */}
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        ></Menu>
      </Spin>
    </div>
  )
}

export default LayoutMenu
