import React, { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({
  allowedRoles,
  userRole,
}: {
  allowedRoles: string[]
  userRole: string | undefined
}) => {
  const navigate = useNavigate()

  console.log("userRole", userRole)
  console.log("allowedRoles", allowedRoles)

  useEffect(() => {
    if (!allowedRoles.includes(userRole as string)) {
      navigate("/access-denied")
    }
  }, [allowedRoles, userRole, navigate])

  return <Outlet />
}

export default ProtectedRoute
