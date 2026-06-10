import { RoleLayout } from "@/components/layout/role-layout"

export default function ScreeningTeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleLayout role="screening-team" title="Screening Team Portal" userName="Dr. Prasad Kumar" roleLabel="Optometrist — Team Alpha">
      {children}
    </RoleLayout>
  )
}
