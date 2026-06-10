"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { emrRecords } from "@/lib/static-data"

const outcomeBadge = (outcome: string) => {
  if (outcome === "Normal") return <Badge variant="success">Normal</Badge>
  if (outcome === "Spectacles") return <Badge variant="info">Spectacles</Badge>
  if (outcome === "Teleconsult") return <Badge variant="warning">Teleconsult</Badge>
  return <Badge variant="destructive">Referral</Badge>
}

export default function ApprovalsPage() {
  const pending = emrRecords.filter(e => e.approvalStatus === "Pending")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [statuses, setStatuses] = useState<Record<string, string>>({})

  const handleAction = (id: string, action: "Approved" | "Rejected") => {
    setStatuses(s => ({ ...s, [id]: action }))
  }

  const allItems = emrRecords

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Approval Queue</h2>
        <p className="text-gray-500 text-sm">{pending.length} EMRs pending your approval</p>
      </div>

      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 font-medium">
          ⚡ {pending.length} EMR{pending.length > 1 ? "s" : ""} require{pending.length === 1 ? "s" : ""} immediate review
        </div>
      )}

      <div className="space-y-4">
        {allItems.map((emr) => {
          const isExpanded = expanded === emr.id
          const actionDone = statuses[emr.id]
          const currentStatus = actionDone || emr.approvalStatus

          return (
            <Card key={emr.id} className={currentStatus === "Pending" ? "border-amber-200" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{emr.patientName}</h3>
                    <p className="text-xs text-gray-500">{emr.campName} • {emr.date} • Dr. {emr.optometristName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {outcomeBadge(emr.outcome)}
                    <Badge variant={currentStatus === "Approved" ? "success" : currentStatus === "Rejected" ? "destructive" : "warning"}>
                      {currentStatus}
                    </Badge>
                    <button onClick={() => setExpanded(isExpanded ? null : emr.id)} className="p-1 hover:bg-gray-100 rounded">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Summary row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">UCDVA Right</p>
                    <p className="font-semibold text-gray-900">{emr.rightUCDVA}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">UCDVA Left</p>
                    <p className="font-semibold text-gray-900">{emr.leftUCDVA}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">DR Grade</p>
                    <p className={`font-semibold ${emr.drGrade !== "None" ? "text-red-700" : "text-green-700"}`}>{emr.drGrade}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">CDR</p>
                    <p className={`font-semibold ${emr.cupToDiscRatio > 0.6 ? "text-red-700" : "text-green-700"}`}>{emr.cupToDiscRatio}</p>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="border-t pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Chief Complaints</h4>
                        <div className="flex flex-wrap gap-1">
                          {emr.chiefComplaints.map(c => <span key={c} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">{c}</span>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Ocular/Systemic History</h4>
                        <div className="flex flex-wrap gap-1">
                          {emr.ocularHistory.map(h => <span key={h} className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">{h}</span>)}
                          {emr.ocularHistory.length === 0 && <span className="text-xs text-gray-500">None</span>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div><p className="text-gray-500">Prescription RE</p><p className="font-medium">Sph: {emr.rightSph} / Cyl: {emr.rightCyl} / Axis: {emr.rightAxis}°</p></div>
                      <div><p className="text-gray-500">Prescription LE</p><p className="font-medium">Sph: {emr.leftSph} / Cyl: {emr.leftCyl} / Axis: {emr.leftAxis}°</p></div>
                      <div><p className="text-gray-500">IOP</p><p className="font-medium">{emr.iop}</p></div>
                      <div><p className="text-gray-500">Macular Edema</p><p className={`font-medium ${emr.macularEdema ? "text-red-700" : "text-green-700"}`}>{emr.macularEdema ? "Yes" : "No"}</p></div>
                      <div><p className="text-gray-500">Optic Disc Pallor</p><p className={`font-medium ${emr.opticDiscPallor ? "text-red-700" : "text-green-700"}`}>{emr.opticDiscPallor ? "Yes" : "No"}</p></div>
                      <div><p className="text-gray-500">HR Grade</p><p className="font-medium">{emr.hrGrade}</p></div>
                    </div>
                  </div>

                  {currentStatus === "Pending" && !actionDone && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Approver Note (optional)</label>
                        <Textarea
                          placeholder="Add a note for this decision..."
                          value={notes[emr.id] || ""}
                          onChange={e => setNotes(n => ({ ...n, [emr.id]: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="gap-2 flex-1" variant="success" onClick={() => handleAction(emr.id, "Approved")}>
                          <Check className="h-4 w-4" />Approve EMR
                        </Button>
                        <Button className="gap-2 flex-1" variant="destructive" onClick={() => handleAction(emr.id, "Rejected")}>
                          <X className="h-4 w-4" />Reject
                        </Button>
                      </div>
                    </div>
                  )}
                  {actionDone && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${actionDone === "Approved" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {actionDone === "Approved" ? "✓ EMR Approved" : "✗ EMR Rejected"} — {new Date().toLocaleTimeString()}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
