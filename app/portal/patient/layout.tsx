import { RoleLayout } from "@/components/layout/role-layout"

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleLayout role="patient" title="Patient Portal" userName="Ravi Kumar" roleLabel="Patient — Guntur">
      {children}
    </RoleLayout>
  )
}
