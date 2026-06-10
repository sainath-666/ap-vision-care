import { NextResponse } from "next/server"

const roleMap: Record<string, { role: string; userName: string; redirectTo: string }> = {
  "super-admin": { role: "super-admin", userName: "Admin Suresh", redirectTo: "/portal/super-admin/dashboard" },
  "nodal-officer": { role: "nodal-officer", userName: "Ramakrishna Murthy", redirectTo: "/portal/nodal-officer/dashboard" },
  "screening-team": { role: "screening-team", userName: "Dr. Prasad Kumar", redirectTo: "/portal/screening-team/dashboard" },
  "patient": { role: "patient", userName: "Ravi Kumar", redirectTo: "/portal/patient/dashboard" },
}

export async function POST(request: Request) {
  const body = await request.json()
  const { role, mobile, otp } = body

  if (!role || !mobile || !otp) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Demo: accept any OTP for demo
  const user = roleMap[role]
  if (!user) {
    return NextResponse.json({ error: "Invalid role" }, { status: 401 })
  }

  const response = NextResponse.json({
    success: true,
    user: { role: user.role, name: user.userName },
    redirectTo: user.redirectTo,
  })

  response.cookies.set("user-role", role, {
    httpOnly: false,
    maxAge: 86400,
    path: "/",
  })

  return response
}
