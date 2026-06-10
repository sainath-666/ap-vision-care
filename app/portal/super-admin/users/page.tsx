"use client"
import { useState } from "react"
import { Search, UserPlus, Edit, UserX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { users } from "@/lib/static-data"

const roleBadge = (role: string) => {
  const map: Record<string, string> = {
    "Super Admin": "bg-purple-100 text-purple-700",
    "Nodal Officer": "bg-blue-100 text-blue-700",
    "Optometrist": "bg-green-100 text-green-700",
    "Patient": "bg-amber-100 text-amber-700",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[role] || "bg-gray-100 text-gray-700"}`}>{role}</span>
}

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.district.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "All" || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 text-sm">Manage all portal users across roles and districts</p>
        </div>
        <Button className="gap-2"><UserPlus className="h-4 w-4" />Add User</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by name, district, email..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select
              className="h-10 px-3 rounded-md border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Nodal Officer">Nodal Officer</option>
              <option value="Optometrist">Optometrist</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Email / Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{roleBadge(user.role)}</TableCell>
                  <TableCell className="text-sm text-gray-600">{user.district}</TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-700">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.mobile}</p>
                  </TableCell>
                  <TableCell>
                    {user.status === "Active"
                      ? <Badge variant="success">Active</Badge>
                      : <Badge variant="secondary">Inactive</Badge>}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700"><UserX className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {users.length} users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
