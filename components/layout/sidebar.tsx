"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Eye, LayoutDashboard, Map, Users, Tent, Package, Brain, FileBarChart, ClipboardList, Settings, UserCheck, CalendarDays, CheckSquare, Send, Glasses, UserPlus, FileText, Video, Home, Stethoscope, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Role = "super-admin" | "nodal-officer" | "screening-team" | "patient"

const navItems: Record<Role, { href: string; label: string; icon: React.ElementType }[]> = {
  "super-admin": [
    { href: "/portal/super-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portal/super-admin/districts", label: "Districts", icon: Map },
    { href: "/portal/super-admin/users", label: "Users", icon: Users },
    { href: "/portal/super-admin/camps", label: "Camps", icon: Tent },
    { href: "/portal/super-admin/vendors", label: "Vendors", icon: Package },
    { href: "/portal/super-admin/ai-insights", label: "AI Insights", icon: Brain },
    { href: "/portal/super-admin/reports", label: "Reports", icon: FileBarChart },
    { href: "/portal/super-admin/audit", label: "Audit Log", icon: ClipboardList },
    { href: "/portal/super-admin/settings", label: "Settings", icon: Settings },
  ],
  "nodal-officer": [
    { href: "/portal/nodal-officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portal/nodal-officer/teams", label: "Teams", icon: UserCheck },
    { href: "/portal/nodal-officer/camps", label: "Camps", icon: CalendarDays },
    { href: "/portal/nodal-officer/approvals", label: "Approvals", icon: CheckSquare },
    { href: "/portal/nodal-officer/referrals", label: "Referrals", icon: Send },
    { href: "/portal/nodal-officer/spectacles", label: "Spectacles", icon: Glasses },
    { href: "/portal/nodal-officer/vendors", label: "Vendors", icon: Package },
  ],
  "screening-team": [
    { href: "/portal/screening-team/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portal/screening-team/register", label: "Register Patient", icon: UserPlus },
    { href: "/portal/screening-team/emr/new", label: "EMR Form", icon: FileText },
    { href: "/portal/screening-team/patients", label: "Patient List", icon: Users },
    { href: "/portal/screening-team/teleconsult/session1", label: "Teleconsult", icon: Video },
  ],
  "patient": [
    { href: "/portal/patient/dashboard", label: "Dashboard", icon: Home },
    { href: "/portal/patient/prescriptions", label: "Prescriptions", icon: Stethoscope },
    { href: "/portal/patient/spectacles", label: "Spectacles", icon: ShoppingBag },
    { href: "/portal/patient/referrals", label: "Referrals", icon: Send },
    { href: "/portal/patient/teleconsult", label: "Teleconsult", icon: Video },
  ],
}

const roleLabels: Record<Role, string> = {
  "super-admin": "Super Admin",
  "nodal-officer": "Nodal Officer",
  "screening-team": "Screening Team",
  "patient": "Patient",
}

const roleColors: Record<Role, string> = {
  "super-admin": "bg-purple-100 text-purple-700",
  "nodal-officer": "bg-blue-100 text-blue-700",
  "screening-team": "bg-green-100 text-green-700",
  "patient": "bg-amber-100 text-amber-700",
}

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname()
  const items = navItems[role]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Eye className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">AP Vision Care</p>
          <p className="text-xs text-gray-500 leading-tight">Govt. of Andhra Pradesh</p>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-3 border-b border-gray-100">
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", roleColors[role])}>
          {roleLabels[role]}
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-blue-600" : "text-gray-400")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">AP Vision Care v1.0.0</p>
        <p className="text-xs text-gray-400">NHM Andhra Pradesh</p>
      </div>
    </aside>
  )
}
