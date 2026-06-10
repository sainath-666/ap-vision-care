import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle } from "lucide-react"

const steps = [
  { label: "Ordered", date: "Jun 10, 2024", done: true },
  { label: "Manufacturing", date: "Jun 11, 2024", done: true },
  { label: "Quality Check", date: "Expected Jun 13", done: false, current: true },
  { label: "Dispatched", date: "Expected Jun 14", done: false },
  { label: "Delivered", date: "Expected Jun 17", done: false },
]

export default function PatientSpectaclesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Spectacle Order Tracking</h2>
        <p className="text-gray-500 text-sm">Track your spectacle order status</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
        ℹ️ This order is not applicable for you as your case has been referred. However, here is a sample order tracking view.
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Order #SO001</CardTitle>
            <Badge variant="warning">In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step Indicator */}
          <div className="relative mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center relative" style={{ flex: 1 }}>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-4 left-1/2 w-full h-0.5 ${steps[i + 1].done || (step.current && !step.done) ? "bg-blue-300" : step.done ? "bg-blue-500" : "bg-gray-200"}`} style={{ transform: "translateY(-50%)" }} />
                  )}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 border-2 ${step.done ? "bg-blue-600 border-blue-600" : step.current ? "bg-white border-blue-600 border-dashed" : "bg-white border-gray-200"}`}>
                    {step.done
                      ? <CheckCircle className="h-5 w-5 text-white" />
                      : step.current
                        ? <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse" />
                        : <Circle className="h-5 w-5 text-gray-300" />
                    }
                  </div>
                  <p className={`text-xs mt-2 font-medium text-center ${step.done ? "text-blue-700" : step.current ? "text-blue-600" : "text-gray-400"}`}>{step.label}</p>
                  <p className={`text-xs mt-0.5 text-center ${step.done ? "text-gray-600" : "text-gray-400"}`}>{step.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Order Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-500 text-xs">Order ID</p><p className="font-mono font-semibold">SO001</p></div>
              <div><p className="text-gray-500 text-xs">Vendor</p><p>Vision Optics Hyderabad</p></div>
              <div><p className="text-gray-500 text-xs">Ordered On</p><p>June 10, 2024</p></div>
              <div><p className="text-gray-500 text-xs">Expected Delivery</p><p className="text-green-700 font-semibold">June 17, 2024</p></div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500 mb-2">Prescription</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-white rounded p-2 border">
                  <p className="font-semibold text-blue-700 mb-1">Right Eye</p>
                  <p>Sph: -2.00 / Cyl: -0.50</p>
                  <p>Axis: 180° / Add: +1.50</p>
                </div>
                <div className="bg-white rounded p-2 border">
                  <p className="font-semibold text-green-700 mb-1">Left Eye</p>
                  <p>Sph: -1.75 / Cyl: -0.25</p>
                  <p>Axis: 175° / Add: +1.50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <p className="font-medium">Delivery Information:</p>
            <p className="mt-1">Spectacles will be delivered at the next camp or at your village Panchayat office. You will receive an SMS notification when dispatched.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
