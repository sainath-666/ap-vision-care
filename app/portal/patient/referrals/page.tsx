import { AlertCircle, MapPin, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PatientReferralsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Referral</h2>
        <p className="text-gray-500 text-sm">Hospital referral details and appointment information</p>
      </div>

      {/* Priority Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-700">High Priority Referral</p>
          <p className="text-sm text-red-600 mt-0.5">Please attend your appointment. Early treatment is important for your eye condition.</p>
        </div>
      </div>

      {/* Referral Card */}
      <Card className="border-red-100">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base">Referral to SVIMS Tirupati</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Ophthalmology Department</p>
            </div>
            <Badge variant="destructive">High Priority</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Hospital</p>
                  <p className="font-semibold text-gray-900">SVIMS — Sri Venkateswara Institute of Medical Sciences</p>
                  <p className="text-sm text-gray-600">Tirupati, Chittoor District, Andhra Pradesh</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Appointment</p>
                  <p className="font-semibold text-gray-900">June 20, 2024 — 10:30 AM</p>
                  <Badge variant="info" className="mt-1">Appointment Booked</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Condition / Diagnosis</p>
                <p className="font-semibold text-gray-900 text-sm">Diabetic Retinopathy Grade I</p>
                <p className="text-sm text-gray-700">with Macular Edema</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Referred by</p>
                <p className="text-sm text-gray-700">Dr. Prasad Kumar, AP Vision Care</p>
                <p className="text-xs text-gray-500">Narasaraopet Camp, June 10, 2024</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-amber-600" />
              <p className="font-semibold text-amber-700 text-sm">Documents to Carry</p>
            </div>
            <ul className="space-y-2">
              {[
                "ABHA card (Ayushman Bharat Health Account card)",
                "Original Aadhaar Card",
                "AP Vision Care Referral Letter (printable from below)",
                "Blood glucose records / Diabetic reports (last 3 months)",
                "Any previous spectacle prescription",
                "Previous eye examination reports (if any)",
              ].map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 text-sm">
            <p className="font-semibold text-blue-700 mb-2">Important Instructions</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Report to OPD Registration counter by 9:30 AM</li>
              <li>• Fasting for 4 hours before the appointment (pupil dilation)</li>
              <li>• Bring a companion — driving not recommended after eye drops</li>
              <li>• Contact: 0877-2287777 for queries</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 h-10 border border-blue-300 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
              Download Referral Letter
            </button>
            <button className="flex-1 h-10 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Directions
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
