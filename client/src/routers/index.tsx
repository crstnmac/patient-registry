import { Navigate, useRoutes } from "react-router-dom"
import Login from "@/views/login"
import { RouteObject } from "./interface"
import { NonIndexRouteObject } from "react-router-dom"

const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true })

export const routerArray: RouteObject[] = []
Object.keys(metaRouters as Record<string, any>).forEach((item) => {
  Object.keys(metaRouters[item] as Record<string, RouteObject[]>).forEach(
    (key: string) => {
      routerArray.push(
        ...(metaRouters[item] as Record<string, RouteObject[]>)[key],
      )
    },
  )
})

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "Login",
      key: "login",
    },
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]

const Router = () => {
  const routes = useRoutes(rootRouter as NonIndexRouteObject[])
  return routes
}

export default Router
