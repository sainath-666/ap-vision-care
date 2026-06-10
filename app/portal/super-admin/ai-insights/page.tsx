"use client"
import { Brain, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { LineChartComponent } from "@/components/charts/line-chart"
import { aiHotspots, referrals, demandForecast } from "@/lib/static-data"

const riskBadge = (level: string) => {
  if (level === "Critical") return <Badge variant="destructive">Critical</Badge>
  if (level === "High") return <Badge variant="warning">High</Badge>
  if (level === "Moderate") return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Moderate</Badge>
  return <Badge variant="success">Low</Badge>
}

const priorityBadge = (priority: string) => {
  if (priority === "Critical") return <Badge variant="destructive">Critical</Badge>
  if (priority === "High") return <Badge variant="warning">High</Badge>
  return <Badge variant="secondary">Routine</Badge>
}

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Analytics & Insights
        </h2>
        <p className="text-gray-500 text-sm">Disease hotspot prediction, demand forecasting, and referral prioritization</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "High Risk Districts", value: aiHotspots.filter(h => h.riskLevel === "High" || h.riskLevel === "Critical").length, color: "text-red-700" },
          { label: "Avg DR Prevalence", value: (aiHotspots.reduce((a, h) => a + h.drPrevalence, 0) / aiHotspots.length).toFixed(1) + "%", color: "text-amber-700" },
          { label: "Predicted Jul Demand", value: "4,200", color: "text-blue-700" },
          { label: "Critical Referrals", value: referrals.filter(r => r.priority === "Critical").length, color: "text-purple-700" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">DR Prevalence by District (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={aiHotspots.map(h => ({ district: h.district.substring(0, 6), drPrevalence: h.drPrevalence, cataractRisk: h.cataractRisk }))}
              xKey="district"
              bars={[
                { key: "drPrevalence", color: "#dc2626", name: "DR Prevalence %" },
                { key: "cataractRisk", color: "#f59e0b", name: "Cataract Risk %" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Spectacle Demand Forecast (Next 3 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={demandForecast}
              xKey="month"
              lines={[
                { key: "predicted", color: "#2563eb", name: "Predicted Demand" },
                { key: "upper", color: "#93c5fd", name: "Upper Bound" },
                { key: "lower", color: "#bfdbfe", name: "Lower Bound" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      {/* Disease Hotspots */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Disease Burden Hotspot Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead className="text-right">Burden Score</TableHead>
                <TableHead className="text-right">DR %</TableHead>
                <TableHead className="text-right">Cataract Risk %</TableHead>
                <TableHead className="text-right">Glaucoma Risk %</TableHead>
                <TableHead className="text-right">Refractive Error %</TableHead>
                <TableHead className="text-right">Predicted Demand</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiHotspots.sort((a, b) => b.burdenScore - a.burdenScore).map((h) => (
                <TableRow key={h.district}>
                  <TableCell className="font-medium text-gray-900">{h.district}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-bold ${h.burdenScore >= 75 ? "text-red-700" : h.burdenScore >= 65 ? "text-amber-700" : "text-green-700"}`}>
                      {h.burdenScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-red-700 font-semibold">{h.drPrevalence}%</TableCell>
                  <TableCell className="text-right text-amber-700">{h.cataractRisk}%</TableCell>
                  <TableCell className="text-right text-purple-700">{h.glaucomaRisk}%</TableCell>
                  <TableCell className="text-right text-blue-700">{h.refractiveError}%</TableCell>
                  <TableCell className="text-right text-gray-700">{h.predictedDemand.toLocaleString()}</TableCell>
                  <TableCell>{riskBadge(h.riskLevel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Referral Priority Queue */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Referral Prioritization Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.sort((a, b) => {
                const p: Record<string, number> = { Critical: 0, High: 1, Routine: 2 }
                return p[a.priority] - p[b.priority]
              }).map((r) => (
                <TableRow key={r.id} className={r.priority === "Critical" ? "bg-red-50" : r.priority === "High" ? "bg-amber-50" : ""}>
                  <TableCell>
                    <p className="font-medium text-sm text-gray-900">{r.patientName}</p>
                    <p className="text-xs text-gray-500">{r.district}</p>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 max-w-xs">{r.condition}</TableCell>
                  <TableCell className="text-sm text-gray-700">{r.hospital}</TableCell>
                  <TableCell>{priorityBadge(r.priority)}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${r.daysPending > 7 ? "text-red-700" : r.daysPending > 3 ? "text-amber-700" : "text-green-700"}`}>
                      {r.daysPending} days
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={r.status === "Visited" ? "success" : r.status === "Appointment Booked" ? "info" : "warning"}>
                      {r.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
