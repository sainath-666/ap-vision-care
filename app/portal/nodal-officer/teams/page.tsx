"use client"
import { Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { screeningTeams } from "@/lib/static-data"

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Screening Teams</h2>
        <p className="text-gray-500 text-sm">Manage and monitor all screening teams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screeningTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{team.name}</CardTitle>
                <Badge variant={team.status === "Active" ? "success" : "secondary"}>{team.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-700">
                <p className="font-medium">{team.lead}</p>
                <p className="text-xs text-gray-500">Team Lead</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {team.members.map(m => (
                  <span key={m} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">{m}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>District: <strong>{team.district}</strong></span>
                <span>Screened: <strong className="text-blue-700">{team.totalScreened.toLocaleString()}</strong></span>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><Star className="h-3 w-3 text-amber-500" />Performance</span>
                  <span className={`font-semibold ${team.performanceScore >= 90 ? "text-green-700" : team.performanceScore >= 80 ? "text-amber-700" : "text-red-700"}`}>
                    {team.performanceScore}/100
                  </span>
                </div>
                <Progress value={team.performanceScore} className="h-1.5" />
              </div>
              {team.activeCamp && (
                <div className="bg-green-50 rounded p-2 text-xs text-green-700">
                  Active Camp: {team.activeCamp}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Teams Summary Table</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Camp Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Total Screened</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {screeningTeams.map(team => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium text-sm text-gray-900">{team.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">{team.lead}</TableCell>
                  <TableCell className="text-sm text-gray-600">{team.members.length}</TableCell>
                  <TableCell className="text-sm text-gray-700">{team.district}</TableCell>
                  <TableCell>
                    {team.activeCamp
                      ? <Badge variant="success">In Camp</Badge>
                      : <Badge variant="secondary">Available</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={team.performanceScore} className="h-1.5 w-16" />
                      <span className="text-xs">{team.performanceScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-blue-700">{team.totalScreened.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
