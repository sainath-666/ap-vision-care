import { Sidebar } from "./sidebar"
import { Header } from "./header"

type Role = "super-admin" | "nodal-officer" | "screening-team" | "patient"

interface RoleLayoutProps {
  role: Role
  title: string
  userName: string
  roleLabel: string
  children: React.ReactNode
}

export function RoleLayout({ role, title, userName, roleLabel, children }: RoleLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <Header title={title} userName={userName} role={roleLabel} />
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
