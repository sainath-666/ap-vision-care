"use client"
import { useState } from "react"
import { Plus, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { camps, screeningTeams } from "@/lib/static-data"

const statusBadge = (status: string) => {
  if (status === "Active") return <Badge variant="success">Active</Badge>
  if (status === "Completed") return <Badge variant="info">Completed</Badge>
  if (status === "Scheduled") return <Badge variant="warning">Scheduled</Badge>
  return <Badge variant="secondary">Cancelled</Badge>
}

export default function NodalCampsPage() {
  const [showCreate, setShowCreate] = useState(false)
  const gunturCamps = camps.filter(c => c.district === "Guntur" || true) // show all for demo

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Camp Management</h2>
          <p className="text-gray-500 text-sm">Schedule and manage eye screening camps</p>
        </div>
        <Button className="gap-2" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" />Schedule Camp
        </Button>
      </div>

      {/* Calendar-style upcoming camps */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            Upcoming & Recent Camps
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Camp Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gunturCamps.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <p className="font-medium text-sm text-gray-900">{camp.name}</p>
                    <p className="text-xs text-gray-500">ID: {camp.id}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">{camp.type}</span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-700">{camp.district}</p>
                    <p className="text-xs text-gray-500">{camp.mandal}</p>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {new Date(camp.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">{camp.teamName}</TableCell>
                  <TableCell>{statusBadge(camp.status)}</TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-600">
                      {camp.screened}/{camp.target}
                      {camp.status === "Completed" && <span className="ml-1 text-green-600">✓</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Schedule Camp Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Schedule New Camp</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Camp Name</Label><Input placeholder="e.g., Guntur East Village Camp" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Camp Type</Label>
                <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm">
                  <option>Village</option><option>School</option><option>Tribal</option><option>Industrial</option>
                </select>
              </div>
              <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Mandal</Label><Input placeholder="Mandal name" /></div>
              <div className="space-y-2"><Label>Village</Label><Input placeholder="Village name" /></div>
            </div>
            <div className="space-y-2">
              <Label>Assign Team</Label>
              <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm">
                {screeningTeams.map(t => <option key={t.id} value={t.id}>{t.name} — {t.lead}</option>)}
              </select>
            </div>
            <div className="space-y-2"><Label>Target Patients</Label><Input type="number" defaultValue="80" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={() => setShowCreate(false)}>Schedule Camp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
