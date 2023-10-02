import LayoutIndex from "@/layouts"
import AddCheckup from "@/views/addCheckup"
import AddPatients from "@/views/addPatients"
import Analytics from "@/views/analytics"
import { Checkups } from "@/views/checkups"
import Login from "@/views/login"
import Patients from "@/views/patients"
import { Routes, Route } from "react-router-dom"

const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LayoutIndex />} />
        <Route path="login" element={<Login />} />
        <Route path="patients" element={<LayoutIndex />}>
          <Route index element={<Patients />} />
          <Route path="add-patient" element={<AddPatients />} />
          <Route path=":id/add-checkup" element={<AddCheckup />} />
          <Route path=":id/edit-patient" element={<AddPatients />} />
          <Route path=":id/edit-checkup/:checkupId" element={<AddCheckup />} />
          <Route path=":id/get-checkups" element={<Checkups />} />
        </Route>
        <Route path="analytics" element={<LayoutIndex />}>
          <Route index element={<Analytics />} />
        </Route>
        <Route path="settings" element={<LayoutIndex />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default Router
