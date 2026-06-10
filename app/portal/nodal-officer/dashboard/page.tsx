"use client"
import { CheckSquare, AlertTriangle, Tent, Glasses, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { emrRecords, spectacleOrders, camps } from "@/lib/static-data"

const gunturCamp = camps.find(c => c.district === "Guntur" && c.status === "Active")
const pendingApprovals = emrRecords.filter(e => e.approvalStatus === "Pending")
const gunturOrders = spectacleOrders.filter(o => o.district === "Guntur")

const pipelineData = [
  { status: "Pending", count: gunturOrders.filter(o => o.status === "Pending").length },
  { status: "Manuf.", count: gunturOrders.filter(o => o.status === "Manufacturing").length },
  { status: "QA", count: gunturOrders.filter(o => o.status === "QA").length },
  { status: "Dispatched", count: gunturOrders.filter(o => o.status === "Dispatched").length },
  { status: "Delivered", count: gunturOrders.filter(o => o.status === "Delivered").length },
]

const slaItems = gunturOrders.map(o => ({
  id: o.id,
  patient: o.patientName,
  daysLeft: o.slaDays - o.daysElapsed,
  breached: o.slaBreached,
  status: o.status,
})).sort((a, b) => a.daysLeft - b.daysLeft)

export default function NodalOfficerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Guntur District Dashboard</h2>
        <p className="text-gray-500 text-sm">Nodal Officer — Real-time district overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Tent className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{camps.filter(c => c.district === "Guntur").length}</p>
                <p className="text-xs text-gray-500">Total Camps</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={pendingApprovals.length > 0 ? "border-amber-300" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${pendingApprovals.length > 0 ? "bg-amber-50" : "bg-green-50"}`}>
                <CheckSquare className={`h-5 w-5 ${pendingApprovals.length > 0 ? "text-amber-600" : "text-green-600"}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${pendingApprovals.length > 0 ? "text-amber-700" : "text-green-700"}`}>{pendingApprovals.length}</p>
                <p className="text-xs text-gray-500">Pending Approvals</p>
              </div>
            </div>
            {pendingApprovals.length > 0 && <p className="text-xs text-amber-600 mt-2 font-medium">⚡ Action required</p>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Glasses className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{gunturOrders.length}</p>
                <p className="text-xs text-gray-500">Spectacle Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-700">{gunturOrders.filter(o => o.slaBreached).length}</p>
                <p className="text-xs text-gray-500">SLA Breaches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Camp */}
      {gunturCamp && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Tent className="h-4 w-4 text-blue-600" />
              Today&apos;s Active Camp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{gunturCamp.name}</p>
                <p className="text-sm text-gray-600">{gunturCamp.mandal}, {gunturCamp.village} • Team: {gunturCamp.teamName}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-700">{gunturCamp.screened}</p>
                  <p className="text-xs text-gray-500">Screened</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-700">{gunturCamp.target}</p>
                  <p className="text-xs text-gray-500">Target</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{gunturCamp.target - gunturCamp.screened}</p>
                  <p className="text-xs text-gray-500">Remaining</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{Math.round((gunturCamp.screened / gunturCamp.target) * 100)}%</span>
              </div>
              <Progress value={Math.round((gunturCamp.screened / gunturCamp.target) * 100)} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Spectacle Order Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={pipelineData}
              xKey="status"
              bars={[{ key: "count", color: "#2563eb", name: "Orders" }]}
              height={200}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              SLA Countdown (Guntur Orders)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {slaItems.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-2 rounded-lg ${item.breached ? "bg-red-50" : item.daysLeft <= 2 ? "bg-amber-50" : "bg-gray-50"}`}>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.patient}</p>
                    <p className="text-xs text-gray-500">{item.id.toUpperCase()} • {item.status}</p>
                  </div>
                  {item.breached
                    ? <Badge variant="destructive">Breached</Badge>
                    : item.daysLeft <= 0
                      ? <Badge variant="destructive">Due today</Badge>
                      : <Badge variant={item.daysLeft <= 2 ? "warning" : "success"}>{item.daysLeft}d left</Badge>
                  }
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
