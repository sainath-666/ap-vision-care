export interface District {
  id: string;
  name: string;
  screened: number;
  spectacles: number;
  referrals: number;
  teleconsults: number;
  camps: number;
  target: number;
  slaStatus: "good" | "warning" | "breach";
  completionPct: number;
  drPrevalence: number;
  burdenScore: number;
}

export interface Patient {
  id: string;
  abhaNumber?: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  dob: string;
  mobile: string;
  district: string;
  mandal: string;
  village: string;
  preExistingConditions: string[];
  registeredAt: string;
  campId: string;
  status: "Registered" | "EMR Done" | "Submitted";
}

export interface EMR {
  id: string;
  patientId: string;
  patientName: string;
  campId: string;
  campName: string;
  date: string;
  optometristId: string;
  optometristName: string;
  chiefComplaints: string[];
  ocularHistory: string[];
  existingGlassesPower?: string;
  rightUCDVA: string;
  leftUCDVA: string;
  rightBCDVA: string;
  leftBCDVA: string;
  rightPH: string;
  leftPH: string;
  rightUCNVA: string;
  leftUCNVA: string;
  iop: string;
  colorVision: "Normal" | "Defective";
  muscleFunctionTest: "Normal" | "Abnormal";
  rightSph: number;
  rightCyl: number;
  rightAxis: number;
  rightAdd: number;
  leftSph: number;
  leftCyl: number;
  leftAxis: number;
  leftAdd: number;
  cupToDiscRatio: number;
  opticDiscPallor: boolean;
  macularEdema: boolean;
  amd: boolean;
  drGrade: "None" | "Mild" | "Moderate" | "Severe" | "PDR";
  hrGrade: "None" | "Grade1" | "Grade2" | "Grade3" | "Grade4";
  outcome: "Normal" | "Spectacles" | "Teleconsult" | "Referral";
  approvalStatus: "Pending" | "Approved" | "Rejected";
  approverNote?: string;
}

export interface Camp {
  id: string;
  name: string;
  type: "Village" | "School" | "Tribal" | "Industrial";
  district: string;
  mandal: string;
  village: string;
  date: string;
  teamId: string;
  teamName: string;
  status: "Scheduled" | "Active" | "Completed" | "Cancelled";
  screened: number;
  target: number;
  nodalOfficerId: string;
}

export interface SpectacleOrder {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  district: string;
  vendorId: string;
  vendorName: string;
  orderedAt: string;
  status: "Pending" | "Manufacturing" | "QA" | "Dispatched" | "Delivered";
  expectedDelivery: string;
  actualDelivery?: string;
  slaDays: number;
  daysElapsed: number;
  slaBreached: boolean;
  prescription: {
    rightSph: number; rightCyl: number; rightAxis: number; rightAdd: number;
    leftSph: number; leftCyl: number; leftAxis: number; leftAdd: number;
  };
}

export interface TeleconsultSession {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  ophthalmologistId: string;
  ophthalmologistName: string;
  scheduledAt: string;
  duration?: number;
  status: "Scheduled" | "Active" | "Completed" | "Missed";
  notes?: string;
  diagnosis?: string;
  recommendation?: string;
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  emrDate: string;
  priority: "Critical" | "High" | "Routine";
  hospital: string;
  department: string;
  condition: string;
  status: "Pending" | "Appointment Booked" | "Visited" | "Follow-up";
  appointmentDate?: string;
  daysPending: number;
  district: string;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  orders: number;
  delivered: number;
  slaPct: number;
  breaches: number;
  rating: number;
  status: "Active" | "Inactive" | "Suspended";
  onboardedDate: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  entity: string;
  entityId: string;
  performedBy: string;
  role: string;
  ipAddress: string;
  details?: string;
}

export interface ScreeningTeam {
  id: string;
  name: string;
  lead: string;
  members: string[];
  district: string;
  activeCamp?: string;
  status: "Active" | "Inactive";
  performanceScore: number;
  totalScreened: number;
}

export interface AIHotspot {
  district: string;
  burdenScore: number;
  drPrevalence: number;
  cataractRisk: number;
  glaucomaRisk: number;
  refractiveError: number;
  predictedDemand: number;
  riskLevel: "Critical" | "High" | "Moderate" | "Low";
}

export interface MonthlyKPI {
  month: string;
  screened: number;
  spectacles: number;
  referrals: number;
  teleconsults: number;
}

export interface User {
  id: string;
  name: string;
  role: "Super Admin" | "Nodal Officer" | "Optometrist" | "Patient";
  district: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  email: string;
  mobile: string;
}
