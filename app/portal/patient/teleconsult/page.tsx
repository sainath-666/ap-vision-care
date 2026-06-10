"use client"
import { useState } from "react"
import { Video, Star, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ophthalmologists, teleconsultSessions } from "@/lib/static-data"

export default function PatientTeleconsultPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Tele-consultation</h2>
        <p className="text-gray-500 text-sm">Connect with specialist ophthalmologists online</p>
      </div>

      {/* Upcoming Sessions */}
      {teleconsultSessions.filter(s => s.patientId === "p001" || true).slice(0, 1).map(session => (
        <Card key={session.id} className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700 flex items-center gap-2">
              <Video className="h-4 w-4" />
              Upcoming Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-gray-900">{session.ophthalmologistName}</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  {new Date(session.scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <Badge variant="success" className="mt-2">Scheduled</Badge>
              </div>
              <Button className="gap-2">
                <Video className="h-4 w-4" />Join Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Available Doctors */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Available Ophthalmologists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ophthalmologists.map(doc => (
            <Card key={doc.id} className={`cursor-pointer transition-all ${selectedDoc === doc.id ? "border-blue-500 ring-1 ring-blue-500" : "hover:border-blue-300"} ${!doc.available ? "opacity-60" : ""}`}
              onClick={() => doc.available && setSelectedDoc(doc.id)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                      {doc.name.split(" ").filter(n => n !== "Dr.").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-600">{doc.specialization}</p>
                      <p className="text-xs text-gray-500">{doc.hospital}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                        <span className="text-xs text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={doc.available ? "success" : "secondary"}>
                    {doc.available ? "Available" : "Busy"}
                  </Badge>
                </div>

                {doc.available && selectedDoc === doc.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Label className="text-xs font-medium text-gray-700 mb-2 block">Select Time Slot (Today)</Label>
                    <div className="flex flex-wrap gap-2">
                      {doc.slots.map(slot => (
                        <button
                          key={slot}
                          onClick={(e) => { e.stopPropagation(); setSelectedSlot(slot) }}
                          className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                            selectedSlot === slot ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedDoc && selectedSlot && !booked && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Confirm Booking</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  {ophthalmologists.find(d => d.id === selectedDoc)?.name} • Today at {selectedSlot}
                </p>
              </div>
              <Button onClick={() => setBooked(true)} className="gap-2">
                <Calendar className="h-4 w-4" />Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {booked && (
        <Card className="border-green-300 bg-green-50">
          <CardContent className="p-4 text-center">
            <p className="text-green-700 font-semibold text-lg mb-1">✓ Appointment Booked!</p>
            <p className="text-sm text-green-600">
              {ophthalmologists.find(d => d.id === selectedDoc)?.name} at {selectedSlot} today
            </p>
            <p className="text-xs text-gray-500 mt-2">You will receive an SMS with the joining link</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
