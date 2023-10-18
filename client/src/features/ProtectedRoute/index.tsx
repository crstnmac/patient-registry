import { selectUserInfo } from "@/app/globalSlice"
import { useAppSelector } from "@/app/hooks"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ children, allowedRoles }: any) {
  const navigate = useNavigate()

  const isAuthorized = useAppSelector(selectUserInfo)?.user_id !== undefined

  const areRolesRequired = !!allowedRoles?.length

  const currentRole = useAppSelector(selectUserInfo)?.role

  const rolesMatch = areRolesRequired
    ? allowedRoles?.includes(currentRole || "admin")
    : true

  if (!isAuthorized || !rolesMatch) {
    navigate("/login")
  }

  return children
}
