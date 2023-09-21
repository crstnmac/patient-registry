import { useLocation, Navigate } from "react-router-dom"
import { searchRoute } from "@/utils/util"
import { rootRouter } from "@/routers/index"
import { HOME_URL } from "@/config/config"
import { RootState, useSelector } from "@/app/store"

/**
 * @description Route guard component
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.global)

  const { authRouter } = useSelector((state: RootState) => state.auth)

  const { pathname } = useLocation()
  const route = searchRoute(pathname, rootRouter)

  if (!route.meta?.requiresAuth) return props.children

  if (!token) return <Navigate to="/login" replace />

  const staticRouter = [HOME_URL, "/403"]
  const routerList = authRouter.concat(staticRouter)
  if (routerList.indexOf(pathname) === -1) return <Navigate to="/403" />

  return props.children
}

export default AuthRouter
