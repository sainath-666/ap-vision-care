"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { districts } from "@/lib/static-data"

const slaBadge = (status: string) => {
  if (status === "good") return <Badge variant="success">Good</Badge>
  if (status === "warning") return <Badge variant="warning">Warning</Badge>
  return <Badge variant="destructive">Breach</Badge>
}

export default function DistrictsPage() {
  const [search, setSearch] = useState("")
  const filtered = districts.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">District Management</h2>
          <p className="text-gray-500 text-sm">All 13 Andhra Pradesh districts — eye care program coverage</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search district..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((d) => (
          <Card key={d.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-900">{d.name}</CardTitle>
                {slaBadge(d.slaStatus)}
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <div className="flex justify-between"><span>Screened</span><span className="font-semibold text-blue-700">{d.screened.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Spectacles</span><span className="font-semibold text-green-700">{d.spectacles.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Referrals</span><span className="font-semibold text-red-700">{d.referrals.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Camps</span><span className="font-semibold">{d.camps}</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Target Completion</span>
                  <span className="font-semibold text-gray-700">{d.completionPct}%</span>
                </div>
                <Progress value={d.completionPct} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* District Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">District Summary Table</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead className="text-right">Screened</TableHead>
                <TableHead className="text-right">Spectacles</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Teleconsults</TableHead>
                <TableHead>SLA Status</TableHead>
                <TableHead>Completion %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium text-gray-900">{d.name}</TableCell>
                  <TableCell className="text-right text-blue-700 font-semibold">{d.screened.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-green-700 font-semibold">{d.spectacles.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-700">{d.referrals.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-purple-700">{d.teleconsults.toLocaleString()}</TableCell>
                  <TableCell>{slaBadge(d.slaStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={d.completionPct} className="h-1.5 w-16" />
                      <span className="text-xs text-gray-600">{d.completionPct}%</span>
                    </div>
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
