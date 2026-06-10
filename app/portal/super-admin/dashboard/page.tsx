"use client"
import { Users, Glasses, Send, Video, AlertTriangle, Tent, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChartComponent } from "@/components/charts/area-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { PieChartComponent } from "@/components/charts/pie-chart"
import { monthlyKPIs, districts, recentActivities, spectacleOrders, outcomeDistribution } from "@/lib/static-data"

const kpiCards = [
  { label: "Total Screened", value: "1,42,847", icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+12.4%" },
  { label: "Spectacles Ordered", value: "38,291", icon: Glasses, color: "text-green-600", bg: "bg-green-50", change: "+8.2%" },
  { label: "Referrals", value: "12,847", icon: Send, color: "text-red-600", bg: "bg-red-50", change: "+5.1%" },
  { label: "Teleconsults", value: "8,234", icon: Video, color: "text-purple-600", bg: "bg-purple-50", change: "+18.7%" },
  { label: "SLA Breaches", value: "127", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", change: "-3.2%" },
  { label: "Active Camps", value: "23", icon: Tent, color: "text-indigo-600", bg: "bg-indigo-50", change: "+2" },
]

const activityIcons: Record<string, string> = {
  emr: "📋", camp: "🏕️", order: "📦", approval: "✅", referral: "🏥", teleconsult: "📹", alert: "⚠️", vendor: "🏪", report: "📊"
}

const slaBreaches = spectacleOrders.filter(o => o.slaBreached)

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Statewide Overview</h2>
        <p className="text-gray-500 text-sm">Government of Andhra Pradesh — NHM Eye Care Program Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${kpi.bg} mb-3`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{kpi.label}</p>
                <p className={`text-xs mt-1 font-medium ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change} vs last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Monthly Screening Trend (Jul 2023 – Jun 2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartComponent
              data={monthlyKPIs}
              xKey="month"
              areas={[
                { key: "screened", color: "#2563eb", name: "Screened" },
                { key: "spectacles", color: "#16a34a", name: "Spectacles" },
              ]}
              height={250}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              Outcome Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={outcomeDistribution} height={250} />
          </CardContent>
        </Card>
      </div>

      {/* District Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">District-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartComponent
            data={districts.map(d => ({ name: d.name.replace(" ", "\n"), screened: d.screened, spectacles: d.spectacles }))}
            xKey="name"
            bars={[
              { key: "screened", color: "#2563eb", name: "Screened" },
              { key: "spectacles", color: "#16a34a", name: "Spectacles" },
            ]}
            height={260}
          />
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <span className="text-lg">{activityIcons[activity.type] || "📌"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Breaches */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              SLA Breach Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {slaBreaches.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-green-600 font-medium">No active SLA breaches</p>
                <p className="text-sm text-gray-500 mt-1">All orders are on track</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Days Over</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slaBreaches.map((order) => (
                    <TableRow key={order.id} className="bg-red-50">
                      <TableCell className="text-xs font-mono">{order.id.toUpperCase()}</TableCell>
                      <TableCell className="text-xs">{order.patientName}</TableCell>
                      <TableCell className="text-xs">{order.vendorName}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{order.daysElapsed - order.slaDays}d over</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-700 font-medium">127 total SLA breaches this month across all vendors</p>
              <p className="text-xs text-amber-600 mt-0.5">Primary cause: Manufacturing delays at Vizag vendor</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
