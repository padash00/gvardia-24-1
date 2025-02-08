"use client"

import React from "react"

interface RoleBasedAccessProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ allowedRoles, children }) => {
  const [user, setUser] = React.useState<{ role: string } | null>(null)

  React.useEffect(() => {
    const role = localStorage.getItem("role")
    if (role) {
      setUser({ role })
    }
  }, [])

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

export default RoleBasedAccess

