import Link from "next/link"
import { Eye, Users, Glasses, Tent, Map, Shield, Brain, Wifi, Video, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Total Screened", value: "1,42,847", icon: Users, color: "text-blue-600" },
  { label: "Spectacles Delivered", value: "38,291", icon: Glasses, color: "text-green-600" },
  { label: "Camps Conducted", value: "487", icon: Tent, color: "text-amber-600" },
  { label: "Districts Covered", value: "13", icon: Map, color: "text-purple-600" },
]

const features = [
  { title: "Multi-Role Portals", desc: "Separate dashboards for Super Admin, Nodal Officers, Screening Teams, and Patients", icon: Users, color: "bg-blue-50 text-blue-600" },
  { title: "ABHA Integration", desc: "Seamless integration with Ayushman Bharat Health Account for patient identity", icon: Shield, color: "bg-green-50 text-green-600" },
  { title: "AI Analytics", desc: "Disease hotspot prediction, demand forecasting, and referral prioritization", icon: Brain, color: "bg-purple-50 text-purple-600" },
  { title: "Offline PWA", desc: "Works without internet for remote village camps with data sync when connected", icon: Wifi, color: "bg-amber-50 text-amber-600" },
  { title: "Tele-consultation", desc: "Real-time video consultation with specialist ophthalmologists across AP", icon: Video, color: "bg-red-50 text-red-600" },
  { title: "Government Compliant", desc: "NHM compliant reporting, audit trails, and data governance built-in", icon: FileText, color: "bg-indigo-50 text-indigo-600" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-700 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">AP Vision Care</p>
                <p className="text-xs text-blue-200 leading-tight">Government of Andhra Pradesh</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-blue-200">National Health Mission | Eye Care Program</span>
              <Link href="/login">
                <Button variant="outline" size="sm" className="bg-white text-blue-700 hover:bg-blue-50 border-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 rounded-full px-4 py-1.5 text-sm mb-6">
            <Award className="h-4 w-4" />
            National Health Mission — Andhra Pradesh
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">AP Vision Care Platform</h1>
          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">Statewide Digital Eye Care Management System</p>
          <p className="text-blue-200 mb-10 max-w-2xl mx-auto text-base">
            Empowering 13 districts of Andhra Pradesh with technology-driven vision screening,
            AI-powered disease detection, and seamless spectacle delivery for rural and underserved communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8">Access Portal</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Program Impact — FY 2023-24</h2>
            <p className="text-gray-500">Real-time statistics across all 13 AP districts</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Features</h2>
            <p className="text-gray-500">Comprehensive digital infrastructure for eye care delivery</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Covering All 13 Districts of Andhra Pradesh</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Srikakulam","Vizianagaram","Visakhapatnam","East Godavari","West Godavari","Krishna","Guntur","Prakasam","Nellore","Kurnool","Kadapa","Anantapur","Chittoor"].map(d => (
              <span key={d} className="inline-block bg-white border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded-full font-medium shadow-sm">{d}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-400" />
              <div>
                <p className="font-bold">AP Vision Care Platform</p>
                <p className="text-sm text-gray-400">Government of Andhra Pradesh</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>National Health Mission — AP Eye Care Program</p>
              <p>Designed &amp; Developed by NHM Technology Division</p>
            </div>
            <div className="text-sm text-gray-400 text-right">
              <p>Helpline: 1800-425-0082</p>
              <p>apvisioncare@ap.gov.in</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            © 2024 Government of Andhra Pradesh. All Rights Reserved. | ABDM Compliant | ISO 27001 Certified
          </div>
        </div>
      </footer>
    </div>
  )
}
