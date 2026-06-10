"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { camps } from "@/lib/static-data"
import { AP_DISTRICTS } from "@/lib/static-data"

const statusBadge = (status: string) => {
  if (status === "Active") return <Badge variant="success">Active</Badge>
  if (status === "Completed") return <Badge variant="info">Completed</Badge>
  if (status === "Scheduled") return <Badge variant="warning">Scheduled</Badge>
  return <Badge variant="secondary">Cancelled</Badge>
}

const typeBadge = (type: string) => {
  const map: Record<string, string> = { Village: "bg-green-100 text-green-700", School: "bg-blue-100 text-blue-700", Tribal: "bg-purple-100 text-purple-700", Industrial: "bg-amber-100 text-amber-700" }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[type] || "bg-gray-100 text-gray-700"}`}>{type}</span>
}

export default function CampsPage() {
  const [search, setSearch] = useState("")
  const [districtFilter, setDistrictFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = camps.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.teamName.toLowerCase().includes(search.toLowerCase())
    const matchDistrict = districtFilter === "All" || c.district === districtFilter
    const matchStatus = statusFilter === "All" || c.status === statusFilter
    return matchSearch && matchDistrict && matchStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Camps Management</h2>
        <p className="text-gray-500 text-sm">All screening camps across Andhra Pradesh</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Camps", value: camps.length, color: "text-blue-700" },
          { label: "Active", value: camps.filter(c => c.status === "Active").length, color: "text-green-700" },
          { label: "Scheduled", value: camps.filter(c => c.status === "Scheduled").length, color: "text-amber-700" },
          { label: "Completed", value: camps.filter(c => c.status === "Completed").length, color: "text-gray-700" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search camps..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
              <option value="All">All Districts</option>
              {AP_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Camp Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <p className="font-medium text-gray-900 text-sm">{camp.name}</p>
                    <p className="text-xs text-gray-500">{camp.mandal}, {camp.village}</p>
                  </TableCell>
                  <TableCell>{typeBadge(camp.type)}</TableCell>
                  <TableCell className="text-sm text-gray-700">{camp.district}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(camp.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">{camp.teamName}</TableCell>
                  <TableCell>{statusBadge(camp.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={camp.target > 0 ? Math.round((camp.screened / camp.target) * 100) : 0} className="h-1.5 w-16" />
                      <span className="text-xs text-gray-600 whitespace-nowrap">{camp.screened}/{camp.target}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-3 border-t">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {camps.length} camps</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
