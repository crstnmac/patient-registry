import { LayoutIndex } from "@/routers/constant"
import { RouteObject } from "@/routers/interface"
import Analytics from "@/views/analytics/index"

const analyticsRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/analytics/index",
        element: <Analytics />,
        meta: {
          requiresAuth: true,
          title: "Analytics",
          key: "analytics",
        },
      },
    ],
  },
]

export default analyticsRouter
