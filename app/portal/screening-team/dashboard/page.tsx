"use client"
import Link from "next/link"
import { UserPlus, FileText, Wifi, WifiOff, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { patients } from "@/lib/static-data"

const todaysPatients = patients.filter(p => p.campId === "c001").slice(0, 5)
const screened = 34
const target = 80

export default function ScreeningDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Today&apos;s Camp</h2>
          <p className="text-gray-500 text-sm">Narasaraopet Village Camp — Guntur District</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <Wifi className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-700 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Camp Progress */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Camp Progress — June 10, 2024</p>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-5xl font-bold">{screened}</p>
                  <p className="text-blue-200 text-sm">Screened</p>
                </div>
                <div className="text-blue-200 text-2xl">/</div>
                <div>
                  <p className="text-3xl font-bold text-blue-100">{target}</p>
                  <p className="text-blue-200 text-sm">Target</p>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-amber-300">{target - screened}</p>
                  <p className="text-blue-200 text-sm">Remaining</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-48">
              <p className="text-blue-100 text-sm mb-2">{Math.round((screened / target) * 100)}% complete</p>
              <div className="bg-blue-500 rounded-full h-3">
                <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${Math.round((screened / target) * 100)}%` }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/portal/screening-team/register">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200 hover:border-blue-400">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Register Patient</p>
                <p className="text-xs text-gray-500">New patient enrollment</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/portal/screening-team/emr/p001">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200 hover:border-green-400">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Start EMR</p>
                <p className="text-xs text-gray-500">Eye Medical Record</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Registered", value: patients.filter(p => p.campId === "c001" && p.status === "Registered").length, color: "text-blue-700" },
          { label: "EMR Done", value: patients.filter(p => p.campId === "c001" && p.status === "EMR Done").length, color: "text-amber-700" },
          { label: "Submitted", value: patients.filter(p => p.campId === "c001" && p.status === "Submitted").length, color: "text-green-700" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            Recent Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todaysPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.age}y • {patient.gender} • {patient.village}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    patient.status === "Submitted" ? "success"
                      : patient.status === "EMR Done" ? "warning"
                        : "secondary"
                  }>
                    {patient.status}
                  </Badge>
                  <Link href={`/portal/screening-team/emr/${patient.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs h-7">EMR</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connectivity Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
              <Wifi className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Internet Connected</p>
              <p className="text-xs text-gray-500">All data syncing in real-time. 34 records uploaded successfully.</p>
            </div>
            <Badge variant="success">Synced</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
