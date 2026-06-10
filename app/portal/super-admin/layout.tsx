import { RoleLayout } from "@/components/layout/role-layout"

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleLayout role="super-admin" title="Super Admin Portal" userName="Admin Suresh" roleLabel="Super Administrator">
      {children}
    </RoleLayout>
  )
}
