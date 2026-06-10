import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendors } from "@/lib/static-data"
import { Star, Phone, Mail } from "lucide-react"

export default function NodalVendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Vendor Directory</h2>
        <p className="text-gray-500 text-sm">Spectacle manufacturing vendors serving your district</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map(vendor => (
          <Card key={vendor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                <Badge variant={vendor.status === "Active" ? "success" : "destructive"}>{vendor.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{vendor.location}</p>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{vendor.contact}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Mail className="h-3 w-3" />{vendor.email}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-blue-50 rounded p-1.5">
                  <p className="font-bold text-blue-700">{vendor.orders}</p>
                  <p className="text-gray-500">Orders</p>
                </div>
                <div className="bg-green-50 rounded p-1.5">
                  <p className="font-bold text-green-700">{vendor.slaPct}%</p>
                  <p className="text-gray-500">SLA %</p>
                </div>
                <div className="bg-amber-50 rounded p-1.5">
                  <p className="font-bold text-amber-700 flex items-center justify-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />{vendor.rating}
                  </p>
                  <p className="text-gray-500">Rating</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Onboarded: {new Date(vendor.onboardedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">SLA %</TableHead>
                <TableHead className="text-right">Breaches</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map(vendor => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium text-sm text-gray-900">{vendor.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">{vendor.location}</TableCell>
                  <TableCell className="text-right text-sm font-semibold text-blue-700">{vendor.orders}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold text-sm ${vendor.slaPct >= 95 ? "text-green-700" : "text-amber-700"}`}>{vendor.slaPct}%</span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-red-700 font-semibold">{vendor.breaches}</TableCell>
                  <TableCell className="text-xs text-gray-600">{vendor.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
