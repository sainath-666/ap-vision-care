"use client"
import { useState, useEffect } from "react"
import { use } from "react"
import { CheckCircle, ChevronLeft, ChevronRight, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { patients } from "@/lib/static-data"

const STEPS = ["Symptoms & History", "Vision Assessment", "Refraction", "Fundus Assessment", "Review & Submit"]
const VA_OPTIONS = ["6/6", "6/9", "6/12", "6/18", "6/24", "6/36", "6/60", "CF", "HM", "PL", "NPL"]
const DR_GRADES = ["None", "Mild", "Moderate", "Severe", "PDR"]
const HR_GRADES = ["None", "Grade1", "Grade2", "Grade3", "Grade4"]
const CDR_OPTIONS = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"]
const COMPLAINTS = ["Diminished vision distance", "Diminished vision near", "Redness", "Watering", "Pain", "Blurred vision", "Photophobia", "Flashers/Floaters", "Diplopia", "Digital eye strain"]
const HISTORY = ["Diabetes", "Hypertension", "Thyroid", "Glaucoma history", "Cataract history", "Trauma", "Previous surgery"]

function computeOutcome(formData: FormData): string {
  const worse = (va: string) => {
    const order = ["6/6", "6/9", "6/12", "6/18", "6/24", "6/36", "6/60", "CF", "HM", "PL", "NPL"]
    const idx = order.indexOf(va)
    return idx > 3 // worse than 6/18 = idx > 3
  }
  const rightBad = worse(formData.rightUCDVA)
  const leftBad = worse(formData.leftUCDVA)

  if (rightBad || leftBad) {
    if (["Moderate", "Severe", "PDR"].includes(formData.drGrade) || parseFloat(formData.cdr) > 0.6 || formData.macularEdema) {
      return "Referral"
    }
    if (formData.rightSph !== 0 || formData.rightCyl !== 0 || formData.leftSph !== 0 || formData.leftCyl !== 0) {
      return "Spectacles"
    }
    return "Teleconsult"
  }
  return "Normal"
}

interface FormData {
  complaints: string[]
  history: string[]
  existingGlasses: string
  rightUCDVA: string
  leftUCDVA: string
  rightBCDVA: string
  leftBCDVA: string
  rightPH: string
  leftPH: string
  rightUCNVA: string
  leftUCNVA: string
  iop: string
  colorVision: string
  muscleFunctionTest: string
  rightSph: number
  rightCyl: number
  rightAxis: number
  rightAdd: number
  leftSph: number
  leftCyl: number
  leftAxis: number
  leftAdd: number
  cdr: string
  opticDiscPallor: boolean
  macularEdema: boolean
  amd: boolean
  drGrade: string
  hrGrade: string
}

export default function EMRPage({ params }: { params: Promise<{ patientId: string }> }) {
  const { patientId } = use(params)
  const patient = patients.find(p => p.id === patientId) || patients[0]

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    complaints: [], history: [], existingGlasses: "",
    rightUCDVA: "6/18", leftUCDVA: "6/18",
    rightBCDVA: "6/9", leftBCDVA: "6/9",
    rightPH: "6/12", leftPH: "6/12",
    rightUCNVA: "N8", leftUCNVA: "N8",
    iop: "14 / 15", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -1.5, rightCyl: -0.5, rightAxis: 90, rightAdd: 0,
    leftSph: -1.25, leftCyl: -0.5, leftAxis: 85, leftAdd: 0,
    cdr: "0.4", opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "None", hrGrade: "None",
  })

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(`emr-${patientId}`, JSON.stringify({ step, formData }))
  }, [step, formData, patientId])

  const update = (key: keyof FormData, val: unknown) => setFormData(d => ({ ...d, [key]: val }))
  const toggleArr = (key: "complaints" | "history", val: string) => {
    setFormData(d => {
      const arr = d[key] as string[]
      return { ...d, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  const outcome = computeOutcome(formData)
  const outcomeColor = { Normal: "text-green-700", Spectacles: "text-blue-700", Teleconsult: "text-amber-700", Referral: "text-red-700" }[outcome] || "text-gray-700"

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">EMR Submitted Successfully</h3>
            <p className="text-green-700 mb-1">Patient: <strong>{patient.name}</strong></p>
            <div className="bg-white rounded-lg p-4 my-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Outcome Decision</p>
              <p className={`text-2xl font-bold ${outcomeColor}`}>{outcome}</p>
              {outcome === "Spectacles" && <p className="text-xs text-gray-500 mt-1">Prescription forwarded to vendor queue</p>}
              {outcome === "Referral" && <p className="text-xs text-red-600 mt-1">Referral created — awaiting nodal approval</p>}
              {outcome === "Teleconsult" && <p className="text-xs text-amber-600 mt-1">Teleconsult scheduled with specialist</p>}
            </div>
            <Button onClick={() => setSubmitted(false)}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Eye Medical Record (EMR)</h2>
        <p className="text-gray-500 text-sm">Patient: {patient.name} • {patient.age}y • {patient.gender} • ABHA: {patient.abhaNumber || "Not provided"}</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setStep(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                i === step ? "bg-blue-600 text-white" : i < step ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {i < step ? "✓" : i + 1} {s}
            </button>
            {i < STEPS.length - 1 && <div className={`h-0.5 w-4 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Step {step + 1}: {STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1 */}
          {step === 0 && (
            <>
              <div>
                <Label className="mb-2 block text-sm font-semibold">Chief Complaints</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COMPLAINTS.map(c => (
                    <div key={c} className="flex items-center gap-2">
                      <Checkbox id={c} checked={formData.complaints.includes(c)} onCheckedChange={() => toggleArr("complaints", c)} />
                      <label htmlFor={c} className="text-sm text-gray-700 cursor-pointer">{c}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block text-sm font-semibold">Ocular / Systemic History</Label>
                <div className="grid grid-cols-2 gap-2">
                  {HISTORY.map(h => (
                    <div key={h} className="flex items-center gap-2">
                      <Checkbox id={h} checked={formData.history.includes(h)} onCheckedChange={() => toggleArr("history", h)} />
                      <label htmlFor={h} className="text-sm text-gray-700 cursor-pointer">{h}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Existing Glasses Power (if any)</Label>
                <Input placeholder="e.g., RE: -1.50 sph, LE: -1.25 sph" value={formData.existingGlasses} onChange={e => update("existingGlasses", e.target.value)} />
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-2 font-medium text-gray-600">Test</th>
                      <th className="text-center p-2 font-medium text-blue-600">Right Eye (RE)</th>
                      <th className="text-center p-2 font-medium text-green-600">Left Eye (LE)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { label: "UCDVA", rKey: "rightUCDVA", lKey: "leftUCDVA" },
                      { label: "BCDVA", rKey: "rightBCDVA", lKey: "leftBCDVA" },
                      { label: "PH", rKey: "rightPH", lKey: "leftPH" },
                    ].map(row => (
                      <tr key={row.label}>
                        <td className="p-2 font-medium text-gray-700">{row.label}</td>
                        <td className="p-2">
                          <select className="h-8 w-full px-2 rounded border border-gray-300 text-sm"
                            value={(formData as unknown as Record<string, string>)[row.rKey]}
                            onChange={e => update(row.rKey as keyof FormData, e.target.value)}>
                            {VA_OPTIONS.map(v => <option key={v}>{v}</option>)}
                          </select>
                        </td>
                        <td className="p-2">
                          <select className="h-8 w-full px-2 rounded border border-gray-300 text-sm"
                            value={(formData as unknown as Record<string, string>)[row.lKey]}
                            onChange={e => update(row.lKey as keyof FormData, e.target.value)}>
                            {VA_OPTIONS.map(v => <option key={v}>{v}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="p-2 font-medium text-gray-700">UCNVA</td>
                      <td className="p-2"><Input className="h-8 text-sm" value={formData.rightUCNVA} onChange={e => update("rightUCNVA", e.target.value)} /></td>
                      <td className="p-2"><Input className="h-8 text-sm" value={formData.leftUCNVA} onChange={e => update("leftUCNVA", e.target.value)} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2"><Label>IOP (mmHg)</Label><Input value={formData.iop} onChange={e => update("iop", e.target.value)} placeholder="RE / LE" /></div>
                <div className="space-y-2">
                  <Label>Color Vision</Label>
                  <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" value={formData.colorVision} onChange={e => update("colorVision", e.target.value)}>
                    <option>Normal</option><option>Defective</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Muscle Function Test</Label>
                  <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" value={formData.muscleFunctionTest} onChange={e => update("muscleFunctionTest", e.target.value)}>
                    <option>Normal</option><option>Abnormal</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <>
              {[
                { eye: "Right Eye (RE)", sph: "rightSph", cyl: "rightCyl", axis: "rightAxis", add: "rightAdd" },
                { eye: "Left Eye (LE)", sph: "leftSph", cyl: "leftCyl", axis: "leftAxis", add: "leftAdd" },
              ].map(eye => (
                <div key={eye.eye}>
                  <h4 className="font-semibold text-gray-700 mb-3">{eye.eye}</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Sph (D)", key: eye.sph, step: 0.25 },
                      { label: "Cyl (D)", key: eye.cyl, step: 0.25 },
                      { label: "Axis (°)", key: eye.axis, step: 1 },
                      { label: "Add Power", key: eye.add, step: 0.25 },
                    ].map(field => (
                      <div key={field.key} className="space-y-2">
                        <Label className="text-xs">{field.label}</Label>
                        <Input
                          type="number"
                          step={field.step}
                          className="h-9 text-sm"
                          value={(formData as unknown as Record<string, number>)[field.key]}
                          onChange={e => update(field.key as keyof FormData, parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Prescription Preview */}
              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <p className="font-semibold text-blue-700 mb-2">Prescription Preview</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><p className="text-gray-500">RE:</p><p className="font-mono">Sph {formData.rightSph > 0 ? "+" : ""}{formData.rightSph} / Cyl {formData.rightCyl > 0 ? "+" : ""}{formData.rightCyl} / Axis {formData.rightAxis}° {formData.rightAdd > 0 ? `/ Add +${formData.rightAdd}` : ""}</p></div>
                  <div><p className="text-gray-500">LE:</p><p className="font-mono">Sph {formData.leftSph > 0 ? "+" : ""}{formData.leftSph} / Cyl {formData.leftCyl > 0 ? "+" : ""}{formData.leftCyl} / Axis {formData.leftAxis}° {formData.leftAdd > 0 ? `/ Add +${formData.leftAdd}` : ""}</p></div>
                </div>
              </div>
            </>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cup to Disc Ratio</Label>
                  <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" value={formData.cdr} onChange={e => update("cdr", e.target.value)}>
                    {CDR_OPTIONS.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>DR Grade</Label>
                  <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" value={formData.drGrade} onChange={e => update("drGrade", e.target.value)}>
                    {DR_GRADES.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Hypertensive Retinopathy Grade</Label>
                  <select className="h-10 w-full px-3 rounded-md border border-gray-300 text-sm" value={formData.hrGrade} onChange={e => update("hrGrade", e.target.value)}>
                    {HR_GRADES.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Optic Disc Pallor", key: "opticDiscPallor" },
                  { label: "Macular Edema", key: "macularEdema" },
                  { label: "AMD (Age-related Macular Degeneration)", key: "amd" },
                ].map(item => (
                  <div key={item.key} className="flex items-center gap-2">
                    <Checkbox
                      id={item.key}
                      checked={(formData as unknown as Record<string, boolean>)[item.key]}
                      onCheckedChange={v => update(item.key as keyof FormData, v)}
                    />
                    <label htmlFor={item.key} className="text-sm text-gray-700 cursor-pointer">{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 - Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Patient: {patient.name}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-500 text-xs">Complaints</p><p className="font-medium">{formData.complaints.join(", ") || "None"}</p></div>
                  <div><p className="text-gray-500 text-xs">History</p><p className="font-medium">{formData.history.join(", ") || "None"}</p></div>
                  <div><p className="text-gray-500 text-xs">UCDVA RE/LE</p><p className="font-medium">{formData.rightUCDVA} / {formData.leftUCDVA}</p></div>
                  <div><p className="text-gray-500 text-xs">IOP</p><p className="font-medium">{formData.iop}</p></div>
                  <div><p className="text-gray-500 text-xs">Prescription RE</p><p className="font-mono text-xs">Sph {formData.rightSph} / Cyl {formData.rightCyl} / Ax {formData.rightAxis}°</p></div>
                  <div><p className="text-gray-500 text-xs">Prescription LE</p><p className="font-mono text-xs">Sph {formData.leftSph} / Cyl {formData.leftCyl} / Ax {formData.leftAxis}°</p></div>
                  <div><p className="text-gray-500 text-xs">DR Grade</p><p className={`font-medium ${formData.drGrade !== "None" ? "text-red-700" : "text-green-700"}`}>{formData.drGrade}</p></div>
                  <div><p className="text-gray-500 text-xs">CDR</p><p className={`font-medium ${parseFloat(formData.cdr) > 0.6 ? "text-red-700" : "text-green-700"}`}>{formData.cdr}</p></div>
                </div>
              </div>

              {/* AI Decision */}
              <div className={`rounded-lg p-4 border-2 ${
                outcome === "Normal" ? "bg-green-50 border-green-300"
                  : outcome === "Spectacles" ? "bg-blue-50 border-blue-300"
                    : outcome === "Teleconsult" ? "bg-amber-50 border-amber-300"
                      : "bg-red-50 border-red-300"
              }`}>
                <p className="text-xs font-semibold text-gray-500 mb-1">DECISION ENGINE RESULT</p>
                <p className={`text-2xl font-bold ${outcomeColor}`}>{outcome}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {outcome === "Normal" && "Vision within normal limits. No intervention required."}
                  {outcome === "Spectacles" && "Refractive error detected. Prescription spectacles recommended."}
                  {outcome === "Teleconsult" && "Vision impairment without clear etiology. Specialist consultation required."}
                  {outcome === "Referral" && "Serious pathology detected. Immediate referral to ophthalmologist required."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="gap-2">
          <ChevronLeft className="h-4 w-4" />Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Save className="h-3.5 w-3.5" />Save Draft
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)} className="gap-2">
              Next<ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setSubmitted(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4" />Submit EMR
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
