"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { auditLogs } from "@/lib/static-data"

const actionBadge = (action: string) => {
  const map: Record<string, string> = {
    CREATE: "bg-green-100 text-green-700",
    UPDATE: "bg-blue-100 text-blue-700",
    APPROVE: "bg-purple-100 text-purple-700",
    REJECT: "bg-red-100 text-red-700",
    LOGIN: "bg-gray-100 text-gray-700",
    GENERATE: "bg-amber-100 text-amber-700",
    DELETE: "bg-red-100 text-red-700",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[action] || "bg-gray-100 text-gray-700"}`}>{action}</span>
}

const PAGE_SIZE = 10

export default function AuditPage() {
  const [search, setSearch] = useState("")
  const [entityFilter, setEntityFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All")
  const [page, setPage] = useState(0)

  const filtered = auditLogs.filter(log => {
    const matchSearch = log.performedBy.toLowerCase().includes(search.toLowerCase()) ||
      log.entityId.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase())
    const matchEntity = entityFilter === "All" || log.entity === entityFilter
    const matchRole = roleFilter === "All" || log.role === roleFilter
    return matchSearch && matchEntity && matchRole
  })

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const entities = Array.from(new Set(auditLogs.map(l => l.entity)))
  const roles = Array.from(new Set(auditLogs.map(l => l.role)))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Audit Log</h2>
        <p className="text-gray-500 text-sm">Complete audit trail of all system actions</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by user, action, entity ID..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(0) }} />
            </div>
            <select className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={entityFilter} onChange={e => { setEntityFilter(e.target.value); setPage(0) }}>
              <option value="All">All Entities</option>
              {entities.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <select className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(0) }}>
              <option value="All">All Roles</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Entity ID</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </TableCell>
                  <TableCell>{actionBadge(log.action)}</TableCell>
                  <TableCell className="text-sm text-gray-700">{log.entity}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-600">{log.entityId}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{log.performedBy}</TableCell>
                  <TableCell className="text-xs text-gray-600">{log.role}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-500">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</button>
              <button className="px-3 py-1 text-xs border rounded hover:bg-gray-50 disabled:opacity-50" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
