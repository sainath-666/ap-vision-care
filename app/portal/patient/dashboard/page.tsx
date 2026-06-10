import Link from "next/link"
import { Eye, Calendar, Glasses, Send, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activities = [
  { date: "Jun 10, 2024", action: "Eye screening completed", detail: "Narasaraopet Village Camp", icon: CheckCircle, color: "text-green-600" },
  { date: "Jun 10, 2024", action: "EMR submitted", detail: "Dr. Prasad Kumar — Outcome: Referral", icon: CheckCircle, color: "text-blue-600" },
  { date: "Jun 10, 2024", action: "Referral created", detail: "SVIMS Tirupati — Priority: High", icon: AlertCircle, color: "text-amber-600" },
  { date: "Jun 11, 2024", action: "Appointment booked", detail: "SVIMS Tirupati — Jun 20, 2024", icon: Calendar, color: "text-purple-600" },
]

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Welcome back,</p>
              <h2 className="text-2xl font-bold">Ravi Kumar</h2>
              <p className="text-blue-200 text-sm mt-1">42 years • Male • Guntur District</p>
              <div className="mt-3 bg-white/20 rounded-lg px-3 py-1.5 inline-block">
                <p className="text-xs text-blue-100">ABHA Number</p>
                <p className="font-mono text-sm font-semibold">91-1234-5678-9012</p>
              </div>
            </div>
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-gray-500 font-medium">Vision Score</span>
            </div>
            <p className="text-xl font-bold text-gray-900">6/24 RE</p>
            <p className="text-xs text-gray-500">6/18 LE (UCDVA)</p>
            <Badge variant="warning" className="mt-2 text-xs">Below Normal</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-500 font-medium">Last Screened</span>
            </div>
            <p className="text-xl font-bold text-gray-900">Jun 10</p>
            <p className="text-xs text-gray-500">2024 • Narasaraopet</p>
            <Badge variant="success" className="mt-2 text-xs">Recent</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Glasses className="h-4 w-4 text-purple-600" />
              <span className="text-xs text-gray-500 font-medium">Spectacles</span>
            </div>
            <p className="text-xl font-bold text-gray-900">N/A</p>
            <p className="text-xs text-gray-500">Referral case</p>
            <Badge variant="secondary" className="mt-2 text-xs">Not Applicable</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Send className="h-4 w-4 text-red-600" />
              <span className="text-xs text-gray-500 font-medium">Referral Status</span>
            </div>
            <p className="text-xl font-bold text-red-700">High</p>
            <p className="text-xs text-gray-500">SVIMS Tirupati</p>
            <Badge variant="warning" className="mt-2 text-xs">Appt. Booked</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "View Prescription", href: "/portal/patient/prescriptions", icon: Eye, color: "bg-blue-50 text-blue-600" },
          { label: "Track Referral", href: "/portal/patient/referrals", icon: Send, color: "bg-red-50 text-red-600" },
          { label: "Book Teleconsult", href: "/portal/patient/teleconsult", icon: Clock, color: "bg-green-50 text-green-600" },
          { label: "Track Spectacles", href: "/portal/patient/spectacles", icon: Glasses, color: "bg-purple-50 text-purple-600" },
        ].map(action => {
          const Icon = action.icon
          return (
            <Link key={action.label} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Upcoming Appointment */}
      <Card className="border-amber-200 bg-amber-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-700">
            <AlertCircle className="h-4 w-4" />
            Upcoming Appointment — Action Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">SVIMS Tirupati — Ophthalmology Dept</p>
              <p className="text-sm text-gray-600 mt-0.5">Date: <strong>June 20, 2024</strong> • Time: <strong>10:30 AM</strong></p>
              <p className="text-xs text-gray-500 mt-1">Condition: Diabetic Retinopathy Grade I with Macular Edema</p>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Documents to carry:</p>
                <ul className="list-disc list-inside space-y-0.5 mt-1">
                  <li>ABHA card / Aadhaar</li>
                  <li>Referral letter from AP Vision Care</li>
                  <li>Previous prescription (if any)</li>
                  <li>Blood glucose records</li>
                </ul>
              </div>
            </div>
            <Link href="/portal/patient/referrals">
              <Button size="sm" className="whitespace-nowrap">View Details</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-4">
              {activities.map((activity, i) => {
                const Icon = activity.icon
                return (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`h-8 w-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shrink-0 z-10 ${activity.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.detail}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
