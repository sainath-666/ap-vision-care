"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { patients } from "@/lib/static-data"

export default function PatientsPage() {
  const [search, setSearch] = useState("")
  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.abhaNumber || "").includes(search) ||
    p.village.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Patient List</h2>
          <p className="text-gray-500 text-sm">Today&apos;s camp patients — June 10, 2024</p>
        </div>
        <Link href="/portal/screening-team/register">
          <Button size="sm" className="gap-1.5">+ Register Patient</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Registered", value: patients.filter(p => p.status === "Registered").length, color: "text-blue-700" },
          { label: "EMR Done", value: patients.filter(p => p.status === "EMR Done").length, color: "text-amber-700" },
          { label: "Submitted", value: patients.filter(p => p.status === "Submitted").length, color: "text-green-700" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by name, ABHA, village..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>ABHA Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registered At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-sm text-gray-900">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">{patient.age}y / {patient.gender}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-600">{patient.abhaNumber || <span className="text-gray-400">—</span>}</TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-700">{patient.village}</p>
                    <p className="text-xs text-gray-500">{patient.mandal}, {patient.district}</p>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {new Date(patient.registeredAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      patient.status === "Submitted" ? "success"
                        : patient.status === "EMR Done" ? "warning"
                          : "secondary"
                    }>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/portal/screening-team/emr/${patient.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <FileText className="h-3.5 w-3.5" />EMR
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-3 border-t">
            <p className="text-xs text-gray-500">Showing {filtered.length} patients</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
