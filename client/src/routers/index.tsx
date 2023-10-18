import ProtectedRoute from "@/features/protectedRoute"
import LayoutIndex from "@/layouts"
import AddLOT from "@/views/addLOT"
import AddPatients from "@/views/addPatients"
import Analytics from "@/views/analytics"
import Login from "@/views/login"
import { LOTs } from "@/views/lots"
import PatientDetails from "@/views/patientDetails"
import Patients from "@/views/patients"
import { RouteObject, useRoutes } from "react-router-dom"

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <LayoutIndex />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/patients",
    element: <LayoutIndex />,
    children: [
      {
        path: "/patients/",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Patients />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <PatientDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/add-patient",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddPatients />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id/add-lot",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddLOT />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id/edit-patient",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddPatients />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id/edit-lot/:lotId",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddLOT />
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id/get-lots",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <LOTs />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/analytics",
    element: <LayoutIndex />,
    children: [
      {
        path: "/analytics/",
        element: <Analytics />,
      },
    ],
  },
  {
    path: "/settings",
    element: <LayoutIndex />,
  },
  {
    path: "*",
    element: <LayoutIndex />,
    children: [
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]

const Router = () => {
  const router = useRoutes(routesConfig)

  return router
}

export default Router
