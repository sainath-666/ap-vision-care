"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type RoleKey = "super-admin" | "nodal-officer" | "screening-team" | "patient"

const roleConfig: Record<RoleKey, { label: string; userName: string; redirectTo: string; color: string }> = {
  "super-admin": { label: "Super Admin", userName: "Admin Suresh", redirectTo: "/portal/super-admin/dashboard", color: "text-purple-700" },
  "nodal-officer": { label: "Nodal Officer", userName: "Ramakrishna Murthy", redirectTo: "/portal/nodal-officer/dashboard", color: "text-blue-700" },
  "screening-team": { label: "Screening Team", userName: "Dr. Prasad Kumar", redirectTo: "/portal/screening-team/dashboard", color: "text-green-700" },
  "patient": { label: "Patient", userName: "Ravi Kumar", redirectTo: "/portal/patient/dashboard", color: "text-amber-700" },
}

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<RoleKey>("super-admin")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOTP = () => {
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }
    setError("")
    setOtpSent(true)
  }

  const handleLogin = async () => {
    if (!mobile) { setError("Please enter mobile number"); return }
    if (!otp) { setError("Please enter OTP"); return }
    setLoading(true)
    setError("")
    await new Promise(r => setTimeout(r, 800))
    document.cookie = `user-role=${selectedRole}; path=/; max-age=86400`
    router.push(roleConfig[selectedRole].redirectTo)
  }

  const demoCredentials: Record<RoleKey, { mobile: string; otp: string }> = {
    "super-admin": { mobile: "9000000001", otp: "123456" },
    "nodal-officer": { mobile: "9000000002", otp: "123456" },
    "screening-team": { mobile: "9000000004", otp: "123456" },
    "patient": { mobile: "9876543210", otp: "123456" },
  }

  const fillDemo = () => {
    setMobile(demoCredentials[selectedRole].mobile)
    setOtp(demoCredentials[selectedRole].otp)
    setOtpSent(true)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 mb-4">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">AP Vision Care</h1>
            <p className="text-blue-200 text-sm mt-1">Government of Andhra Pradesh</p>
          </div>

          <Card className="shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-center text-gray-900">Sign In to Your Portal</CardTitle>
              <CardDescription className="text-center text-gray-500 text-xs">
                Select your role and login with OTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedRole} onValueChange={(v) => { setSelectedRole(v as RoleKey); setOtpSent(false); setError("") }}>
                <TabsList className="grid grid-cols-4 mb-6 w-full h-auto">
                  <TabsTrigger value="super-admin" className="text-xs px-1 py-2">Super<br/>Admin</TabsTrigger>
                  <TabsTrigger value="nodal-officer" className="text-xs px-1 py-2">Nodal<br/>Officer</TabsTrigger>
                  <TabsTrigger value="screening-team" className="text-xs px-1 py-2">Screening<br/>Team</TabsTrigger>
                  <TabsTrigger value="patient" className="text-xs px-1 py-2">Patient</TabsTrigger>
                </TabsList>

                {(Object.keys(roleConfig) as RoleKey[]).map(role => (
                  <TabsContent key={role} value={role}>
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className={`font-semibold ${roleConfig[role].color}`}>{roleConfig[role].label} Portal</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Login as: {roleConfig[role].userName}</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number / Username</Label>
                        <div className="flex gap-2">
                          <Input
                            id="mobile"
                            placeholder="Enter 10-digit mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            maxLength={10}
                          />
                          <Button type="button" variant="outline" onClick={handleSendOTP} className="whitespace-nowrap text-xs">
                            Send OTP
                          </Button>
                        </div>
                      </div>

                      {otpSent && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700">
                          OTP sent to {mobile}. Use <strong>123456</strong> for demo.
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          placeholder="6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                        />
                      </div>

                      {error && <p className="text-red-600 text-sm">{error}</p>}

                      <Button className="w-full" onClick={handleLogin} disabled={loading}>
                        {loading ? "Signing in..." : `Login as ${roleConfig[role].label}`}
                      </Button>

                      <Button variant="outline" className="w-full text-xs" onClick={fillDemo}>
                        Fill Demo Credentials
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-4 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
                <p>Protected by Government of AP Security Standards</p>
                <p>ABDM Compliant | Data encrypted in transit</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
