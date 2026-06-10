"use client"
import { AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { spectacleOrders } from "@/lib/static-data"

const steps = ["Pending", "Manufacturing", "QA", "Dispatched", "Delivered"]

function OrderPipeline({ status }: { status: string }) {
  const idx = steps.indexOf(status)
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${i <= idx ? "bg-blue-600" : "bg-gray-200"}`} />
          {i < steps.length - 1 && <div className={`h-0.5 w-3 ${i < idx ? "bg-blue-600" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )
}

export default function SpectaclesPage() {
  const breached = spectacleOrders.filter(o => o.slaBreached)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Spectacle Order Tracking</h2>
        <p className="text-gray-500 text-sm">Monitor orders through the manufacturing and delivery pipeline</p>
      </div>

      {breached.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">{breached.length} SLA Breach{breached.length > 1 ? "es" : ""} Detected</p>
            <p className="text-xs text-red-600 mt-0.5">Orders: {breached.map(o => o.id.toUpperCase()).join(", ")}</p>
          </div>
        </div>
      )}

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {steps.map(step => (
          <Card key={step} className="text-center">
            <CardContent className="p-3">
              <p className="text-xl font-bold text-blue-700">{spectacleOrders.filter(o => o.status === step).length}</p>
              <p className="text-xs text-gray-500 mt-0.5">{step}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>SLA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spectacleOrders.map((order) => (
                <TableRow key={order.id} className={order.slaBreached ? "bg-red-50" : order.daysElapsed >= order.slaDays - 1 ? "bg-amber-50" : ""}>
                  <TableCell className="text-xs font-mono font-semibold text-blue-700">{order.id.toUpperCase()}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-gray-900">{order.patientName}</p>
                    <p className="text-xs text-gray-500">{order.district}</p>
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">{order.vendorName}</TableCell>
                  <TableCell className="text-xs text-gray-600">{new Date(order.orderedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</TableCell>
                  <TableCell><OrderPipeline status={order.status} /></TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === "Delivered" ? "success"
                        : order.status === "Dispatched" ? "info"
                          : "warning"
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {new Date(order.expectedDelivery).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </TableCell>
                  <TableCell>
                    {order.slaBreached
                      ? <Badge variant="destructive">Breached</Badge>
                      : order.status === "Delivered"
                        ? <Badge variant="success">On Time</Badge>
                        : (
                          <div className="flex items-center gap-2">
                            <Progress value={Math.round((order.daysElapsed / order.slaDays) * 100)} className="h-1.5 w-12" />
                            <span className="text-xs">{order.slaDays - order.daysElapsed}d</span>
                          </div>
                        )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
