import { Download, QrCode } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const prescriptions = [
  {
    id: "rx001",
    date: "June 10, 2024",
    camp: "Narasaraopet Village Camp",
    optometrist: "Dr. Prasad Kumar",
    rightEye: { sph: -2.0, cyl: -0.5, axis: 180, add: 1.5 },
    leftEye: { sph: -1.75, cyl: -0.25, axis: 175, add: 1.5 },
    note: "Bifocal lenses recommended for near and distance vision",
    outcome: "Referral",
  }
]

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Prescriptions</h2>
        <p className="text-gray-500 text-sm">Eye prescriptions from your screenings</p>
      </div>

      {prescriptions.map(rx => (
        <Card key={rx.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <CardTitle className="text-base">Prescription — {rx.date}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Camp: {rx.camp}</p>
                <p className="text-sm text-gray-500">Optometrist: {rx.optometrist}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={rx.outcome === "Referral" ? "destructive" : rx.outcome === "Spectacles" ? "info" : "success"}>
                  {rx.outcome}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Prescription Table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-3 text-left font-semibold text-blue-700 border border-gray-200">Eye</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200">Sph (D)</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200">Cyl (D)</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200">Axis (°)</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200">Add Power</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 font-semibold text-blue-700 border border-gray-200">Right Eye (RE)</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.rightEye.sph > 0 ? "+" : ""}{rx.rightEye.sph.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.rightEye.cyl.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.rightEye.axis}°</td>
                    <td className="p-3 text-center font-mono border border-gray-200">+{rx.rightEye.add.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold text-green-700 border border-gray-200">Left Eye (LE)</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.leftEye.sph > 0 ? "+" : ""}{rx.leftEye.sph.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.leftEye.cyl.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono border border-gray-200">{rx.leftEye.axis}°</td>
                    <td className="p-3 text-center font-mono border border-gray-200">+{rx.leftEye.add.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {rx.note && (
              <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 mb-4">
                <strong>Note:</strong> {rx.note}
              </div>
            )}

            {/* QR Code Placeholder */}
            <div className="flex items-center gap-4 mt-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-24 h-24 flex flex-col items-center justify-center">
                <QrCode className="h-8 w-8 text-gray-400 mb-1" />
                <p className="text-xs text-gray-400">QR Code</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-3">Scan QR code at any government hospital or optical shop to access this prescription</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" />Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <QrCode className="h-3.5 w-3.5" />View QR
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {prescriptions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No prescriptions found. Complete an eye screening to get your prescription.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
