"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { referrals } from "@/lib/static-data"

const priorityBadge = (priority: string) => {
  if (priority === "Critical") return <Badge variant="destructive">Critical</Badge>
  if (priority === "High") return <Badge variant="warning">High</Badge>
  return <Badge variant="secondary">Routine</Badge>
}

const statusBadge = (status: string) => {
  if (status === "Visited") return <Badge variant="success">Visited</Badge>
  if (status === "Appointment Booked") return <Badge variant="info">Appt. Booked</Badge>
  if (status === "Follow-up") return <Badge variant="warning">Follow-up</Badge>
  return <Badge variant="warning">Pending</Badge>
}

export default function NodalReferralsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Referral Tracking</h2>
        <p className="text-gray-500 text-sm">Monitor patient referrals to specialist hospitals</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Referrals", value: referrals.length, color: "text-blue-700" },
          { label: "Critical", value: referrals.filter(r => r.priority === "Critical").length, color: "text-red-700" },
          { label: "Pending", value: referrals.filter(r => r.status === "Pending").length, color: "text-amber-700" },
          { label: "Visited", value: referrals.filter(r => r.status === "Visited").length, color: "text-green-700" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>EMR Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.sort((a, b) => {
                const p: Record<string, number> = { Critical: 0, High: 1, Routine: 2 }
                return p[a.priority] - p[b.priority]
              }).map((ref) => (
                <TableRow key={ref.id} className={ref.priority === "Critical" ? "bg-red-50" : ref.priority === "High" ? "bg-amber-50" : ""}>
                  <TableCell>
                    <p className="font-medium text-sm text-gray-900">{ref.patientName}</p>
                    <p className="text-xs text-gray-500">{ref.district}</p>
                  </TableCell>
                  <TableCell className="text-xs text-gray-700 max-w-[180px]">{ref.condition}</TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-700">{ref.hospital}</p>
                    <p className="text-xs text-gray-500">{ref.department}</p>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{new Date(ref.emrDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</TableCell>
                  <TableCell>{priorityBadge(ref.priority)}</TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {ref.appointmentDate
                      ? new Date(ref.appointmentDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                      : <span className="text-amber-600">Not booked</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold text-sm ${ref.daysPending > 7 ? "text-red-700" : ref.daysPending > 3 ? "text-amber-700" : "text-green-700"}`}>
                      {ref.daysPending}d
                    </span>
                  </TableCell>
                  <TableCell>{statusBadge(ref.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
