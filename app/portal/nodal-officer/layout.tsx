import { RoleLayout } from "@/components/layout/role-layout"

export default function NodalOfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleLayout role="nodal-officer" title="Nodal Officer Portal" userName="Ramakrishna Murthy" roleLabel="Nodal Officer — Guntur">
      {children}
    </RoleLayout>
  )
}
