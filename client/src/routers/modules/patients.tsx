import { LayoutIndex } from "../../routers/constant"
import { RouteObject } from "../../routers/interface"
import AddPatients from "../../views/addPatients"
import Patients from "../../views/patients/index"

const patientsRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/patients/index",
        element: <Patients />,
        meta: {
          requiresAuth: true,
          title: "Patients",
          key: "patients",
        },
      },
      {
        path: "/patients/index/add-patient",
        element: <AddPatients />,
        meta: {
          requiresAuth: true,
          title: "Add Patients",
          key: "patients",
        },
      },
      {
        path: "/patients/index/edit-patient",
        element: <AddPatients />,
        meta: {
          requiresAuth: true,
          title: "Edit Patients",
          key: "patients",
        },
      },
    ],
  },
]

export default patientsRouter
