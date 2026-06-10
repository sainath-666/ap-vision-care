"use client"
import { useState } from "react"
import { use } from "react"
import { Video, VideoOff, Mic, MicOff, Phone, Send, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { teleconsultSessions, patients, ophthalmologists } from "@/lib/static-data"

export default function TeleconsultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const session = teleconsultSessions[0]
  const patient = patients.find(p => p.id === session.patientId) || patients[0]
  const doctor = ophthalmologists[0]

  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [connecting, setConnecting] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { from: "Dr. Sridhar Murthy", text: "Good morning! I can see the patient details. Please present the case.", time: "10:01 AM" },
    { from: "You", text: "Good morning Dr. Patient has bilateral refractive error with mild macular edema.", time: "10:02 AM" },
  ])
  const [clinicalNotes, setClinicalNotes] = useState("")
  const [sessionEnded, setSessionEnded] = useState(false)

  const sendMessage = () => {
    if (!message.trim()) return
    setMessages(m => [...m, { from: "You", text: message, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }])
    setMessage("")
  }

  if (sessionEnded) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Session Ended</h3>
          <p className="text-gray-600 text-sm mb-4">Teleconsult session completed successfully</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-4">
            <p className="font-medium text-gray-700 mb-2">Session Summary</p>
            <p><span className="text-gray-500">Duration:</span> 18 minutes</p>
            <p><span className="text-gray-500">Doctor:</span> {doctor.name}</p>
            <p><span className="text-gray-500">Notes saved:</span> {clinicalNotes ? "Yes" : "No"}</p>
          </div>
          <Button>Return to Dashboard</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Teleconsult Session</h2>
          <p className="text-gray-500 text-sm">Session ID: {sessionId}</p>
        </div>
        <Badge variant="success" className="gap-1.5">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          Live Session
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Info Panel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-700 text-xl font-bold">
              {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">{patient.name}</p>
              <p className="text-xs text-gray-500">{patient.age}y • {patient.gender}</p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">ABHA:</span><span className="font-mono">{patient.abhaNumber || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Village:</span><span>{patient.village}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">District:</span><span>{patient.district}</span></div>
            </div>
            {patient.preExistingConditions.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Pre-existing conditions:</p>
                <div className="flex flex-wrap gap-1">
                  {patient.preExistingConditions.map(c => <span key={c} className="bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded">{c}</span>)}
                </div>
              </div>
            )}
            <div className="bg-blue-50 rounded p-2 text-xs">
              <p className="font-medium text-blue-700 mb-1">Vision Summary:</p>
              <p>UCDVA RE: 6/24 | LE: 6/18</p>
              <p>Prescription: -1.5/-0.5@90</p>
              <p>DR Grade: Mild</p>
            </div>
          </CardContent>
        </Card>

        {/* Video Area */}
        <Card className="lg:col-span-1">
          <CardContent className="p-3">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              {connecting ? (
                <div className="text-center">
                  <div className="h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white text-sm">Connecting to Dr. {doctor.name}...</p>
                  <p className="text-gray-400 text-xs mt-1">{doctor.hospital}</p>
                  <Button size="sm" variant="outline" className="mt-3 text-white border-white" onClick={() => setConnecting(false)}>
                    Simulate Connected
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">SM</div>
                      <p className="text-sm">{doctor.name}</p>
                      <p className="text-xs text-gray-400">{doctor.specialization}</p>
                    </div>
                  </div>
                  {/* Self-view */}
                  <div className="absolute bottom-2 right-2 w-20 h-14 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                    <p className="text-white text-xs">You (Live)</p>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="text-xs gap-1">
                      <span className="h-1.5 w-1.5 bg-white rounded-full" />REC
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <button onClick={() => setMicOn(m => !m)} className={`p-2.5 rounded-full transition-colors ${micOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white"}`}>
                {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              <button onClick={() => setVideoOn(v => !v)} className={`p-2.5 rounded-full transition-colors ${videoOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white"}`}>
                {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>
              <button onClick={() => setSessionEnded(true)} className="p-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                <Phone className="h-5 w-5 rotate-[135deg]" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Chat & Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-3 flex flex-col gap-3">
            {/* Doctor Info */}
            <div className="bg-blue-50 rounded p-2 text-xs">
              <p className="font-medium text-blue-700">{doctor.name}</p>
              <p className="text-gray-600">{doctor.specialization} • {doctor.hospital}</p>
            </div>

            {/* Chat */}
            <div className="bg-gray-50 rounded-lg p-2 h-32 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.from === "You" ? "items-end" : "items-start"}`}>
                  <p className="text-xs text-gray-500">{msg.from}</p>
                  <div className={`text-xs p-2 rounded-lg max-w-[85%] ${msg.from === "You" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-700"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              <Input className="h-8 text-xs" placeholder="Type message..." value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()} />
              <Button size="sm" className="h-8 w-8 p-0" onClick={sendMessage}><Send className="h-3.5 w-3.5" /></Button>
            </div>

            {/* Clinical Notes */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Clinical Notes</Label>
              <Textarea
                placeholder="Record clinical findings, diagnosis, recommendations..."
                rows={4}
                className="text-xs"
                value={clinicalNotes}
                onChange={e => setClinicalNotes(e.target.value)}
              />
            </div>
            <Button size="sm" className="text-xs">Save Notes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
