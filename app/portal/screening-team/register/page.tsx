"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { QrCode, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AP_DISTRICTS, AP_MANDALS } from "@/lib/static-data"

const schema = z.object({
  abhaNumber: z.string().optional(),
  mobile: z.string().min(10, "Enter valid 10-digit mobile").max(10, "Max 10 digits"),
  otp: z.string().min(6, "Enter 6-digit OTP"),
  name: z.string().min(2, "Name required"),
  age: z.string().min(1, "Age required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1, "DOB required"),
  district: z.string().min(1, "District required"),
  mandal: z.string().min(1, "Mandal required"),
  village: z.string().min(1, "Village required"),
})

type FormData = z.infer<typeof schema>

const CONDITIONS = ["Diabetes", "Hypertension", "Thyroid", "Glaucoma history", "Cataract history", "Trauma", "Previous eye surgery"]

export default function RegisterPatientPage() {
  const [otpSent, setOtpSent] = useState(false)
  const [conditions, setConditions] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [patientId] = useState("P" + Math.floor(Math.random() * 900 + 100))

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { gender: "Male" }
  })

  const selectedDistrict = watch("district")
  const mandals = selectedDistrict && AP_MANDALS[selectedDistrict] ? AP_MANDALS[selectedDistrict] : []

  const toggleCondition = (c: string) => {
    setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const onSubmit = (data: FormData) => {
    console.log({ ...data, conditions })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Patient Registered Successfully</h3>
            <p className="text-green-700 mb-1">Patient ID: <strong>{patientId}</strong></p>
            <p className="text-green-600 text-sm mb-6">Patient has been registered for today&apos;s camp. Proceed to EMR entry.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setSubmitted(false)} variant="outline">Register Another</Button>
              <Button>Start EMR</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Register New Patient</h2>
        <p className="text-gray-500 text-sm">Camp: Narasaraopet Village Camp — June 10, 2024</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ABHA */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">ABHA Details (Optional)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label>ABHA Number</Label>
                <Input placeholder="XX-XXXX-XXXX-XXXX" {...register("abhaNumber")} />
              </div>
              <Button type="button" variant="outline" className="mt-8 gap-1.5 shrink-0">
                <QrCode className="h-4 w-4" />Scan QR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Verification */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">Mobile Verification</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label>Mobile Number *</Label>
                <Input placeholder="10-digit mobile" maxLength={10} {...register("mobile")} />
                {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
              </div>
              <Button type="button" variant="outline" className="mt-8 shrink-0" onClick={() => setOtpSent(true)}>Send OTP</Button>
            </div>
            {otpSent && (
              <>
                <div className="bg-green-50 border border-green-200 p-2 rounded text-xs text-green-700">OTP sent. Use 123456 for demo.</div>
                <div className="space-y-2">
                  <Label>OTP *</Label>
                  <Input placeholder="6-digit OTP" maxLength={6} {...register("otp")} />
                  {errors.otp && <p className="text-red-500 text-xs">{errors.otp.message}</p>}
                </div>
              </>
            )}
            {!otpSent && <Input type="hidden" {...register("otp")} value="" />}
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">Personal Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Enter full name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Age *</Label>
                <Input type="number" placeholder="Age in years" {...register("age")} />
                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" {...register("gender")}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Date of Birth *</Label>
                <Input type="date" {...register("dob")} />
                {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">Location</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>District *</Label>
                <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" {...register("district")}>
                  <option value="">Select District</option>
                  {AP_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Mandal *</Label>
                <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" {...register("mandal")}>
                  <option value="">Select Mandal</option>
                  {mandals.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.mandal && <p className="text-red-500 text-xs">{errors.mandal.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Village *</Label>
                <Input placeholder="Village/Town name" {...register("village")} />
                {errors.village && <p className="text-red-500 text-xs">{errors.village.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pre-existing Conditions */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">Pre-existing Conditions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CONDITIONS.map(condition => (
                <div key={condition} className="flex items-center gap-2">
                  <Checkbox
                    id={condition}
                    checked={conditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                  />
                  <label htmlFor={condition} className="text-sm text-gray-700 cursor-pointer">{condition}</label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Register Patient
        </Button>
      </form>
    </div>
  )
}
