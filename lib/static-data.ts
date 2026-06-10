import type { District, Patient, EMR, Camp, SpectacleOrder, TeleconsultSession, Referral, Vendor, AuditLog, ScreeningTeam, AIHotspot, MonthlyKPI, User } from "./types";

export const AP_DISTRICTS = [
  "Srikakulam", "Vizianagaram", "Visakhapatnam", "East Godavari",
  "West Godavari", "Krishna", "Guntur", "Prakasam", "Nellore",
  "Kurnool", "Kadapa", "Anantapur", "Chittoor"
];

export const AP_MANDALS: Record<string, string[]> = {
  "Guntur": ["Narasaraopet", "Mangalagiri", "Tenali", "Bapatla", "Ponnur"],
  "Visakhapatnam": ["Bheemunipatnam", "Gajuwaka", "Padmanabham", "Anakapalle"],
  "Krishna": ["Vijayawada", "Machilipatnam", "Gudivada", "Nuzvid"],
  "East Godavari": ["Rajahmundry", "Kakinada", "Amalapuram", "Peddapuram"],
  "West Godavari": ["Eluru", "Bhimavaram", "Narasapuram", "Palacole"],
  "Chittoor": ["Tirupati", "Chittoor", "Madanapalle", "Puttur"],
  "Kurnool": ["Kurnool", "Nandyal", "Adoni", "Yemmiganur"],
  "Kadapa": ["Kadapa", "Proddatur", "Rajampet", "Mydukur"],
  "Anantapur": ["Anantapur", "Dharmavaram", "Hindupur", "Kadiri"],
  "Nellore": ["Nellore", "Kavali", "Gudur", "Atmakur"],
  "Prakasam": ["Ongole", "Chirala", "Kandukur", "Markapur"],
  "Srikakulam": ["Srikakulam", "Palasa", "Narasannapeta", "Etcherla"],
  "Vizianagaram": ["Vizianagaram", "Bobbili", "Parvathipuram", "Salur"],
};

export const districts: District[] = [
  { id: "d1", name: "Srikakulam", screened: 9234, spectacles: 2456, referrals: 812, teleconsults: 523, camps: 18, target: 12000, slaStatus: "good", completionPct: 77, drPrevalence: 8.2, burdenScore: 62 },
  { id: "d2", name: "Vizianagaram", screened: 8102, spectacles: 2134, referrals: 712, teleconsults: 448, camps: 15, target: 11000, slaStatus: "warning", completionPct: 73, drPrevalence: 9.1, burdenScore: 65 },
  { id: "d3", name: "Visakhapatnam", screened: 14823, spectacles: 3912, referrals: 1423, teleconsults: 867, camps: 28, target: 18000, slaStatus: "good", completionPct: 82, drPrevalence: 11.3, burdenScore: 74 },
  { id: "d4", name: "East Godavari", screened: 13456, spectacles: 3567, referrals: 1234, teleconsults: 756, camps: 25, target: 16000, slaStatus: "good", completionPct: 84, drPrevalence: 10.8, burdenScore: 71 },
  { id: "d5", name: "West Godavari", screened: 11234, spectacles: 2987, referrals: 987, teleconsults: 634, camps: 22, target: 14000, slaStatus: "good", completionPct: 80, drPrevalence: 10.2, burdenScore: 68 },
  { id: "d6", name: "Krishna", screened: 12567, spectacles: 3345, referrals: 1123, teleconsults: 712, camps: 24, target: 15000, slaStatus: "warning", completionPct: 83, drPrevalence: 11.7, burdenScore: 73 },
  { id: "d7", name: "Guntur", screened: 15234, spectacles: 4023, referrals: 1456, teleconsults: 923, camps: 30, target: 18000, slaStatus: "good", completionPct: 85, drPrevalence: 12.4, burdenScore: 78 },
  { id: "d8", name: "Prakasam", screened: 10123, spectacles: 2678, referrals: 889, teleconsults: 567, camps: 20, target: 13000, slaStatus: "breach", completionPct: 78, drPrevalence: 9.6, burdenScore: 66 },
  { id: "d9", name: "Nellore", screened: 11456, spectacles: 3023, referrals: 1012, teleconsults: 645, camps: 22, target: 14000, slaStatus: "good", completionPct: 82, drPrevalence: 10.1, burdenScore: 69 },
  { id: "d10", name: "Kurnool", screened: 9876, spectacles: 2612, referrals: 867, teleconsults: 534, camps: 19, target: 13000, slaStatus: "warning", completionPct: 76, drPrevalence: 8.9, burdenScore: 64 },
  { id: "d11", name: "Kadapa", screened: 8934, spectacles: 2367, referrals: 789, teleconsults: 487, camps: 17, target: 12000, slaStatus: "good", completionPct: 74, drPrevalence: 8.5, burdenScore: 63 },
  { id: "d12", name: "Anantapur", screened: 10234, spectacles: 2712, referrals: 912, teleconsults: 578, camps: 20, target: 13500, slaStatus: "breach", completionPct: 75, drPrevalence: 9.3, burdenScore: 67 },
  { id: "d13", name: "Chittoor", screened: 7574, spectacles: 2020, referrals: 631, teleconsults: 410, camps: 15, target: 11000, slaStatus: "good", completionPct: 69, drPrevalence: 8.0, burdenScore: 60 },
];

export const patients: Patient[] = [
  { id: "p001", abhaNumber: "91-1234-5678-9012", name: "Ravi Kumar", age: 42, gender: "Male", dob: "1982-03-15", mobile: "9876543210", district: "Guntur", mandal: "Narasaraopet", village: "Pedakurapadu", preExistingConditions: ["Diabetes", "Hypertension"], registeredAt: "2024-06-10T09:30:00", campId: "c001", status: "Submitted" },
  { id: "p002", abhaNumber: "91-2345-6789-0123", name: "Lakshmi Devi", age: 58, gender: "Female", dob: "1966-07-22", mobile: "9876543211", district: "Guntur", mandal: "Narasaraopet", village: "Krosuru", preExistingConditions: ["Diabetes"], registeredAt: "2024-06-10T09:45:00", campId: "c001", status: "Submitted" },
  { id: "p003", name: "Suresh Babu", age: 35, gender: "Male", dob: "1989-11-08", mobile: "9876543212", district: "Guntur", mandal: "Mangalagiri", village: "Mangalagiri Town", preExistingConditions: [], registeredAt: "2024-06-10T10:00:00", campId: "c001", status: "EMR Done" },
  { id: "p004", abhaNumber: "91-3456-7890-1234", name: "Padma Rao", age: 65, gender: "Female", dob: "1959-04-12", mobile: "9876543213", district: "Krishna", mandal: "Machilipatnam", village: "Pedana", preExistingConditions: ["Hypertension", "Thyroid"], registeredAt: "2024-06-08T10:15:00", campId: "c002", status: "Submitted" },
  { id: "p005", name: "Venkat Reddy", age: 48, gender: "Male", dob: "1976-09-30", mobile: "9876543214", district: "Visakhapatnam", mandal: "Gajuwaka", village: "Steel Plant Area", preExistingConditions: ["Diabetes"], registeredAt: "2024-06-09T11:00:00", campId: "c003", status: "Submitted" },
  { id: "p006", abhaNumber: "91-4567-8901-2345", name: "Anitha Kumari", age: 29, gender: "Female", dob: "1995-01-17", mobile: "9876543215", district: "Guntur", mandal: "Tenali", village: "Kolakaluru", preExistingConditions: [], registeredAt: "2024-06-10T11:30:00", campId: "c001", status: "Registered" },
  { id: "p007", name: "Krishnamurthy", age: 72, gender: "Male", dob: "1952-06-05", mobile: "9876543216", district: "Chittoor", mandal: "Tirupati", village: "Renigunta", preExistingConditions: ["Glaucoma history", "Diabetes", "Hypertension"], registeredAt: "2024-06-07T09:00:00", campId: "c004", status: "Submitted" },
  { id: "p008", name: "Rajamma", age: 55, gender: "Female", dob: "1969-08-14", mobile: "9876543217", district: "East Godavari", mandal: "Rajahmundry", village: "Dowleswaram", preExistingConditions: ["Hypertension"], registeredAt: "2024-06-06T10:30:00", campId: "c005", status: "Submitted" },
  { id: "p009", abhaNumber: "91-5678-9012-3456", name: "Narayana Das", age: 38, gender: "Male", dob: "1986-12-20", mobile: "9876543218", district: "Kurnool", mandal: "Nandyal", village: "Srisailam Road", preExistingConditions: [], registeredAt: "2024-06-05T09:45:00", campId: "c006", status: "Submitted" },
  { id: "p010", name: "Saraswathi", age: 45, gender: "Female", dob: "1979-02-28", mobile: "9876543219", district: "Nellore", mandal: "Kavali", village: "Kota", preExistingConditions: ["Diabetes"], registeredAt: "2024-06-04T10:00:00", campId: "c007", status: "Submitted" },
  { id: "p011", name: "Bhaskar Rao", age: 52, gender: "Male", dob: "1972-05-10", mobile: "9876543220", district: "Guntur", mandal: "Bapatla", village: "Chirala Road", preExistingConditions: ["Diabetes", "Hypertension"], registeredAt: "2024-06-10T12:00:00", campId: "c001", status: "Registered" },
  { id: "p012", name: "Meena Kumari", age: 33, gender: "Female", dob: "1991-09-03", mobile: "9876543221", district: "Guntur", mandal: "Ponnur", village: "Phirangipuram", preExistingConditions: [], registeredAt: "2024-06-10T12:15:00", campId: "c001", status: "Registered" },
  { id: "p013", abhaNumber: "91-6789-0123-4567", name: "Srinivas Goud", age: 61, gender: "Male", dob: "1963-11-25", mobile: "9876543222", district: "Visakhapatnam", mandal: "Anakapalle", village: "Bheemunipatnam", preExistingConditions: ["Cataract history"], registeredAt: "2024-06-09T13:00:00", campId: "c003", status: "Submitted" },
  { id: "p014", name: "Vijayalakshmi", age: 40, gender: "Female", dob: "1984-03-07", mobile: "9876543223", district: "West Godavari", mandal: "Bhimavaram", village: "Undi", preExistingConditions: ["Thyroid"], registeredAt: "2024-06-08T14:00:00", campId: "c008", status: "Submitted" },
  { id: "p015", name: "Ramesh Naidu", age: 67, gender: "Male", dob: "1957-07-19", mobile: "9876543224", district: "Srikakulam", mandal: "Palasa", village: "Vajrapukotturu", preExistingConditions: ["Diabetes", "Cataract history"], registeredAt: "2024-06-03T09:30:00", campId: "c009", status: "Submitted" },
];

export const emrRecords: EMR[] = [
  {
    id: "e001", patientId: "p001", patientName: "Ravi Kumar", campId: "c001", campName: "Narasaraopet Village Camp",
    date: "2024-06-10", optometristId: "u004", optometristName: "Dr. Prasad Kumar",
    chiefComplaints: ["Diminished vision distance", "Digital eye strain"],
    ocularHistory: ["Diabetes", "Hypertension"],
    existingGlassesPower: "RE: -1.50 sph, LE: -1.25 sph",
    rightUCDVA: "6/24", leftUCDVA: "6/18", rightBCDVA: "6/9", leftBCDVA: "6/6",
    rightPH: "6/9", leftPH: "6/6", rightUCNVA: "N10", leftUCNVA: "N8",
    iop: "RE: 14, LE: 16", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -2.0, rightCyl: -0.5, rightAxis: 180, rightAdd: 1.5,
    leftSph: -1.75, leftCyl: -0.25, leftAxis: 175, leftAdd: 1.5,
    cupToDiscRatio: 0.4, opticDiscPallor: false, macularEdema: true, amd: false,
    drGrade: "Mild", hrGrade: "Grade1",
    outcome: "Referral", approvalStatus: "Approved",
  },
  {
    id: "e002", patientId: "p002", patientName: "Lakshmi Devi", campId: "c001", campName: "Narasaraopet Village Camp",
    date: "2024-06-10", optometristId: "u004", optometristName: "Dr. Prasad Kumar",
    chiefComplaints: ["Diminished vision distance", "Blurred vision"],
    ocularHistory: ["Diabetes"],
    rightUCDVA: "6/36", leftUCDVA: "6/24", rightBCDVA: "6/12", leftBCDVA: "6/9",
    rightPH: "6/12", leftPH: "6/9", rightUCNVA: "N12", leftUCNVA: "N10",
    iop: "RE: 16, LE: 17", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -2.5, rightCyl: -1.0, rightAxis: 90, rightAdd: 2.0,
    leftSph: -2.25, leftCyl: -0.75, leftAxis: 85, leftAdd: 2.0,
    cupToDiscRatio: 0.5, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "Mild", hrGrade: "None",
    outcome: "Spectacles", approvalStatus: "Approved",
  },
  {
    id: "e003", patientId: "p005", patientName: "Venkat Reddy", campId: "c003", campName: "Steel Plant Industrial Camp",
    date: "2024-06-09", optometristId: "u005", optometristName: "Dr. Sunitha Rao",
    chiefComplaints: ["Diminished vision distance", "Redness", "Digital eye strain"],
    ocularHistory: ["Diabetes"],
    rightUCDVA: "6/60", leftUCDVA: "6/60", rightBCDVA: "6/18", leftBCDVA: "6/18",
    rightPH: "6/24", leftPH: "6/24", rightUCNVA: "N36", leftUCNVA: "N36",
    iop: "RE: 18, LE: 19", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -3.5, rightCyl: -1.5, rightAxis: 180, rightAdd: 0,
    leftSph: -3.0, leftCyl: -1.25, leftAxis: 170, leftAdd: 0,
    cupToDiscRatio: 0.5, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "Moderate", hrGrade: "Grade2",
    outcome: "Referral", approvalStatus: "Approved",
  },
  {
    id: "e004", patientId: "p007", patientName: "Krishnamurthy", campId: "c004", campName: "Tirupati Urban Camp",
    date: "2024-06-07", optometristId: "u006", optometristName: "Dr. Hari Prasad",
    chiefComplaints: ["Diminished vision distance", "Pain", "Watering"],
    ocularHistory: ["Glaucoma history", "Diabetes"],
    rightUCDVA: "CF", leftUCDVA: "6/60", rightBCDVA: "6/36", leftBCDVA: "6/24",
    rightPH: "6/60", leftPH: "6/36", rightUCNVA: "N36+", leftUCNVA: "N24",
    iop: "RE: 28, LE: 22", colorVision: "Defective", muscleFunctionTest: "Normal",
    rightSph: -4.0, rightCyl: -2.0, rightAxis: 90, rightAdd: 2.5,
    leftSph: -3.5, leftCyl: -1.5, leftAxis: 85, leftAdd: 2.5,
    cupToDiscRatio: 0.8, opticDiscPallor: true, macularEdema: false, amd: false,
    drGrade: "Severe", hrGrade: "Grade2",
    outcome: "Referral", approvalStatus: "Pending",
  },
  {
    id: "e005", patientId: "p008", patientName: "Rajamma", campId: "c005", campName: "Rajahmundry School Camp",
    date: "2024-06-06", optometristId: "u007", optometristName: "Dr. Kavitha Reddy",
    chiefComplaints: ["Diminished vision distance", "Headache"],
    ocularHistory: ["Hypertension"],
    rightUCDVA: "6/12", leftUCDVA: "6/12", rightBCDVA: "6/6", leftBCDVA: "6/6",
    rightPH: "6/6", leftPH: "6/6", rightUCNVA: "N8", leftUCNVA: "N8",
    iop: "RE: 14, LE: 15", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -1.0, rightCyl: -0.5, rightAxis: 90, rightAdd: 0,
    leftSph: -1.25, leftCyl: -0.25, leftAxis: 95, leftAdd: 0,
    cupToDiscRatio: 0.3, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "None", hrGrade: "Grade1",
    outcome: "Spectacles", approvalStatus: "Approved",
  },
  {
    id: "e006", patientId: "p009", patientName: "Narayana Das", campId: "c006", campName: "Nandyal Village Camp",
    date: "2024-06-05", optometristId: "u008", optometristName: "Dr. Mohan Rao",
    chiefComplaints: ["Blurred vision", "Digital eye strain"],
    ocularHistory: [],
    rightUCDVA: "6/9", leftUCDVA: "6/9", rightBCDVA: "6/6", leftBCDVA: "6/6",
    rightPH: "6/6", leftPH: "6/6", rightUCNVA: "N6", leftUCNVA: "N6",
    iop: "RE: 13, LE: 14", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -0.75, rightCyl: -0.25, rightAxis: 180, rightAdd: 0,
    leftSph: -0.5, leftCyl: -0.25, leftAxis: 175, leftAdd: 0,
    cupToDiscRatio: 0.3, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "None", hrGrade: "None",
    outcome: "Spectacles", approvalStatus: "Approved",
  },
  {
    id: "e007", patientId: "p003", patientName: "Suresh Babu", campId: "c001", campName: "Narasaraopet Village Camp",
    date: "2024-06-10", optometristId: "u004", optometristName: "Dr. Prasad Kumar",
    chiefComplaints: ["Redness", "Watering"],
    ocularHistory: [],
    rightUCDVA: "6/6", leftUCDVA: "6/6", rightBCDVA: "6/6", leftBCDVA: "6/6",
    rightPH: "6/6", leftPH: "6/6", rightUCNVA: "N6", leftUCNVA: "N6",
    iop: "RE: 12, LE: 13", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: 0, rightCyl: 0, rightAxis: 0, rightAdd: 0,
    leftSph: 0, leftCyl: 0, leftAxis: 0, leftAdd: 0,
    cupToDiscRatio: 0.3, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "None", hrGrade: "None",
    outcome: "Teleconsult", approvalStatus: "Pending",
  },
  {
    id: "e008", patientId: "p004", patientName: "Padma Rao", campId: "c002", campName: "Machilipatnam Village Camp",
    date: "2024-06-08", optometristId: "u009", optometristName: "Dr. Geetha Krishnan",
    chiefComplaints: ["Diminished vision distance", "Near vision problem"],
    ocularHistory: ["Hypertension", "Thyroid"],
    rightUCDVA: "6/18", leftUCDVA: "6/18", rightBCDVA: "6/9", leftBCDVA: "6/9",
    rightPH: "6/9", leftPH: "6/9", rightUCNVA: "N10", leftUCNVA: "N10",
    iop: "RE: 15, LE: 15", colorVision: "Normal", muscleFunctionTest: "Normal",
    rightSph: -1.5, rightCyl: -0.5, rightAxis: 90, rightAdd: 2.0,
    leftSph: -1.5, leftCyl: -0.5, leftAxis: 85, leftAdd: 2.0,
    cupToDiscRatio: 0.4, opticDiscPallor: false, macularEdema: false, amd: false,
    drGrade: "None", hrGrade: "Grade1",
    outcome: "Spectacles", approvalStatus: "Approved",
  },
];

export const camps: Camp[] = [
  { id: "c001", name: "Narasaraopet Village Camp", type: "Village", district: "Guntur", mandal: "Narasaraopet", village: "Pedakurapadu", date: "2024-06-10", teamId: "t001", teamName: "Team Alpha", status: "Active", screened: 34, target: 80, nodalOfficerId: "u002" },
  { id: "c002", name: "Machilipatnam Village Camp", type: "Village", district: "Krishna", mandal: "Machilipatnam", village: "Pedana", date: "2024-06-08", teamId: "t002", teamName: "Team Beta", status: "Completed", screened: 78, target: 80, nodalOfficerId: "u002" },
  { id: "c003", name: "Steel Plant Industrial Camp", type: "Industrial", district: "Visakhapatnam", mandal: "Gajuwaka", village: "Steel Plant Area", date: "2024-06-09", teamId: "t003", teamName: "Team Gamma", status: "Completed", screened: 120, target: 100, nodalOfficerId: "u003" },
  { id: "c004", name: "Tirupati Urban Camp", type: "Village", district: "Chittoor", mandal: "Tirupati", village: "Renigunta", date: "2024-06-07", teamId: "t004", teamName: "Team Delta", status: "Completed", screened: 65, target: 70, nodalOfficerId: "u010" },
  { id: "c005", name: "Rajahmundry School Camp", type: "School", district: "East Godavari", mandal: "Rajahmundry", village: "Dowleswaram", date: "2024-06-06", teamId: "t005", teamName: "Team Epsilon", status: "Completed", screened: 210, target: 200, nodalOfficerId: "u011" },
  { id: "c006", name: "Nandyal Village Camp", type: "Village", district: "Kurnool", mandal: "Nandyal", village: "Srisailam Road", date: "2024-06-05", teamId: "t006", teamName: "Team Zeta", status: "Completed", screened: 89, target: 90, nodalOfficerId: "u012" },
  { id: "c007", name: "Kavali Village Camp", type: "Village", district: "Nellore", mandal: "Kavali", village: "Kota", date: "2024-06-04", teamId: "t007", teamName: "Team Eta", status: "Completed", screened: 76, target: 80, nodalOfficerId: "u013" },
  { id: "c008", name: "Bhimavaram Tribal Camp", type: "Tribal", district: "West Godavari", mandal: "Bhimavaram", village: "Undi", date: "2024-06-08", teamId: "t002", teamName: "Team Beta", status: "Completed", screened: 56, target: 60, nodalOfficerId: "u014" },
  { id: "c009", name: "Palasa Tribal Camp", type: "Tribal", district: "Srikakulam", mandal: "Palasa", village: "Vajrapukotturu", date: "2024-06-03", teamId: "t008", teamName: "Team Theta", status: "Completed", screened: 48, target: 50, nodalOfficerId: "u015" },
  { id: "c010", name: "Anantapur School Camp", type: "School", district: "Anantapur", mandal: "Anantapur", village: "Town Area", date: "2024-06-12", teamId: "t001", teamName: "Team Alpha", status: "Scheduled", screened: 0, target: 180, nodalOfficerId: "u002" },
  { id: "c011", name: "Kurnool Industrial Camp", type: "Industrial", district: "Kurnool", mandal: "Kurnool", village: "Industrial Area", date: "2024-06-13", teamId: "t006", teamName: "Team Zeta", status: "Scheduled", screened: 0, target: 150, nodalOfficerId: "u012" },
  { id: "c012", name: "Vizianagaram Tribal Camp", type: "Tribal", district: "Vizianagaram", mandal: "Bobbili", village: "Hill Area", date: "2024-06-14", teamId: "t009", teamName: "Team Iota", status: "Scheduled", screened: 0, target: 60, nodalOfficerId: "u016" },
];

export const spectacleOrders: SpectacleOrder[] = [
  { id: "so001", patientId: "p002", patientName: "Lakshmi Devi", emrId: "e002", district: "Guntur", vendorId: "v001", vendorName: "Vision Optics Hyderabad", orderedAt: "2024-06-10", status: "Manufacturing", expectedDelivery: "2024-06-17", slaDays: 7, daysElapsed: 2, slaBreached: false, prescription: { rightSph: -2.5, rightCyl: -1.0, rightAxis: 90, rightAdd: 2.0, leftSph: -2.25, leftCyl: -0.75, leftAxis: 85, leftAdd: 2.0 } },
  { id: "so002", patientId: "p005", patientName: "Venkat Reddy", emrId: "e003", district: "Visakhapatnam", vendorId: "v002", vendorName: "Lens Craft Vizag", orderedAt: "2024-06-09", status: "QA", expectedDelivery: "2024-06-16", slaDays: 7, daysElapsed: 3, slaBreached: false, prescription: { rightSph: -3.5, rightCyl: -1.5, rightAxis: 180, rightAdd: 0, leftSph: -3.0, leftCyl: -1.25, leftAxis: 170, leftAdd: 0 } },
  { id: "so003", patientId: "p008", patientName: "Rajamma", emrId: "e005", district: "East Godavari", vendorId: "v003", vendorName: "EyeCare Rajahmundry", orderedAt: "2024-06-06", status: "Dispatched", expectedDelivery: "2024-06-13", slaDays: 7, daysElapsed: 6, slaBreached: false, prescription: { rightSph: -1.0, rightCyl: -0.5, rightAxis: 90, rightAdd: 0, leftSph: -1.25, leftCyl: -0.25, leftAxis: 95, leftAdd: 0 } },
  { id: "so004", patientId: "p009", patientName: "Narayana Das", emrId: "e006", district: "Kurnool", vendorId: "v004", vendorName: "OptiKurnool", orderedAt: "2024-06-05", status: "Delivered", expectedDelivery: "2024-06-12", actualDelivery: "2024-06-11", slaDays: 7, daysElapsed: 7, slaBreached: false, prescription: { rightSph: -0.75, rightCyl: -0.25, rightAxis: 180, rightAdd: 0, leftSph: -0.5, leftCyl: -0.25, leftAxis: 175, leftAdd: 0 } },
  { id: "so005", patientId: "p004", patientName: "Padma Rao", emrId: "e008", district: "Krishna", vendorId: "v002", vendorName: "Lens Craft Vizag", orderedAt: "2024-06-08", status: "Pending", expectedDelivery: "2024-06-15", slaDays: 7, daysElapsed: 4, slaBreached: false, prescription: { rightSph: -1.5, rightCyl: -0.5, rightAxis: 90, rightAdd: 2.0, leftSph: -1.5, leftCyl: -0.5, leftAxis: 85, leftAdd: 2.0 } },
  { id: "so006", patientId: "p010", patientName: "Saraswathi", emrId: "e009", district: "Nellore", vendorId: "v005", vendorName: "VisionCare Nellore", orderedAt: "2024-05-28", status: "Delivered", expectedDelivery: "2024-06-04", actualDelivery: "2024-06-05", slaDays: 7, daysElapsed: 8, slaBreached: true, prescription: { rightSph: -2.0, rightCyl: -0.75, rightAxis: 90, rightAdd: 1.5, leftSph: -1.75, leftCyl: -0.5, leftAxis: 80, leftAdd: 1.5 } },
  { id: "so007", patientId: "p013", patientName: "Srinivas Goud", emrId: "e010", district: "Visakhapatnam", vendorId: "v002", vendorName: "Lens Craft Vizag", orderedAt: "2024-06-09", status: "Manufacturing", expectedDelivery: "2024-06-16", slaDays: 7, daysElapsed: 3, slaBreached: false, prescription: { rightSph: -1.5, rightCyl: -1.0, rightAxis: 180, rightAdd: 2.5, leftSph: -1.25, leftCyl: -0.75, leftAxis: 175, leftAdd: 2.5 } },
];

export const teleconsultSessions: TeleconsultSession[] = [
  { id: "ts001", patientId: "p003", patientName: "Suresh Babu", emrId: "e007", ophthalmologistId: "doc001", ophthalmologistName: "Dr. Sridhar Murthy (SVIMS)", scheduledAt: "2024-06-12T10:00:00", status: "Scheduled" },
  { id: "ts002", patientId: "p011", patientName: "Bhaskar Rao", emrId: "e011", ophthalmologistId: "doc002", ophthalmologistName: "Dr. Lalitha Nair (KIMS)", scheduledAt: "2024-06-11T14:00:00", status: "Scheduled" },
  { id: "ts003", patientId: "p014", patientName: "Vijayalakshmi", emrId: "e012", ophthalmologistId: "doc001", ophthalmologistName: "Dr. Sridhar Murthy (SVIMS)", scheduledAt: "2024-06-10T11:00:00", duration: 25, status: "Completed", notes: "Dry eye syndrome diagnosed", diagnosis: "Keratoconjunctivitis sicca", recommendation: "Lubricating eye drops TID" },
  { id: "ts004", patientId: "p006", patientName: "Anitha Kumari", emrId: "e013", ophthalmologistId: "doc003", ophthalmologistName: "Dr. Venkata Raman (NTR Trust)", scheduledAt: "2024-06-13T09:00:00", status: "Scheduled" },
];

export const referrals: Referral[] = [
  { id: "r001", patientId: "p001", patientName: "Ravi Kumar", emrId: "e001", emrDate: "2024-06-10", priority: "High", hospital: "SVIMS Tirupati", department: "Ophthalmology Dept", condition: "Diabetic Retinopathy Grade I with Macular Edema", status: "Appointment Booked", appointmentDate: "2024-06-20", daysPending: 2, district: "Guntur" },
  { id: "r002", patientId: "p005", patientName: "Venkat Reddy", emrId: "e003", emrDate: "2024-06-09", priority: "Critical", hospital: "KIMS Vizag", department: "Vitreo-Retina", condition: "Diabetic Retinopathy Moderate + Hypertensive Retinopathy Grade 2", status: "Pending", daysPending: 3, district: "Visakhapatnam" },
  { id: "r003", patientId: "p007", patientName: "Krishnamurthy", emrId: "e004", emrDate: "2024-06-07", priority: "Critical", hospital: "SVIMS Tirupati", department: "Glaucoma Clinic", condition: "Advanced Glaucoma + High IOP (28 mmHg) + Optic Disc Pallor", status: "Appointment Booked", appointmentDate: "2024-06-14", daysPending: 5, district: "Chittoor" },
  { id: "r004", patientId: "p015", patientName: "Ramesh Naidu", emrId: "e014", emrDate: "2024-06-03", priority: "High", hospital: "GGH Rajam", department: "Cataract Clinic", condition: "Mature Cataract Right Eye", status: "Visited", appointmentDate: "2024-06-08", daysPending: 0, district: "Srikakulam" },
  { id: "r005", patientId: "p013", patientName: "Srinivas Goud", emrId: "e010", emrDate: "2024-06-09", priority: "Routine", hospital: "KIMS Vizag", department: "Ophthalmology", condition: "Posterior Vitreous Detachment Evaluation", status: "Pending", daysPending: 3, district: "Visakhapatnam" },
];

export const vendors: Vendor[] = [
  { id: "v001", name: "Vision Optics Hyderabad", location: "Hyderabad", contact: "040-23456789", email: "ops@visionoptics.in", orders: 1245, delivered: 1198, slaPct: 96.2, breaches: 47, rating: 4.5, status: "Active", onboardedDate: "2023-01-15" },
  { id: "v002", name: "Lens Craft Vizag", location: "Visakhapatnam", contact: "0891-2345678", email: "lenscraft@vizag.in", orders: 987, delivered: 934, slaPct: 94.6, breaches: 53, rating: 4.2, status: "Active", onboardedDate: "2023-03-20" },
  { id: "v003", name: "EyeCare Rajahmundry", location: "Rajahmundry", contact: "0883-2345678", email: "eyecare@rjy.in", orders: 756, delivered: 710, slaPct: 93.9, breaches: 46, rating: 4.0, status: "Active", onboardedDate: "2023-02-10" },
  { id: "v004", name: "OptiKurnool", location: "Kurnool", contact: "08518-234567", email: "opti@kurnool.in", orders: 534, delivered: 498, slaPct: 93.3, breaches: 36, rating: 3.9, status: "Active", onboardedDate: "2023-05-01" },
  { id: "v005", name: "VisionCare Nellore", location: "Nellore", contact: "0861-2345678", email: "vc@nellore.in", orders: 612, delivered: 567, slaPct: 92.6, breaches: 45, rating: 3.7, status: "Active", onboardedDate: "2023-04-15" },
];

export const auditLogs: AuditLog[] = [
  { id: "al001", timestamp: "2024-06-10T09:35:00", action: "CREATE", entity: "Patient", entityId: "p001", performedBy: "Dr. Prasad Kumar", role: "Optometrist", ipAddress: "192.168.1.101", details: "New patient registered with ABHA number" },
  { id: "al002", timestamp: "2024-06-10T10:15:00", action: "CREATE", entity: "EMR", entityId: "e001", performedBy: "Dr. Prasad Kumar", role: "Optometrist", ipAddress: "192.168.1.101", details: "EMR created for Ravi Kumar" },
  { id: "al003", timestamp: "2024-06-10T10:45:00", action: "APPROVE", entity: "EMR", entityId: "e001", performedBy: "Ramakrishna Murthy", role: "Nodal Officer", ipAddress: "10.0.0.50", details: "EMR approved, referral created" },
  { id: "al004", timestamp: "2024-06-10T11:00:00", action: "CREATE", entity: "SpectacleOrder", entityId: "so001", performedBy: "System", role: "System", ipAddress: "10.0.0.1", details: "Spectacle order auto-created after approval" },
  { id: "al005", timestamp: "2024-06-10T11:30:00", action: "UPDATE", entity: "Camp", entityId: "c001", performedBy: "Ramakrishna Murthy", role: "Nodal Officer", ipAddress: "10.0.0.50", details: "Camp screened count updated to 34" },
  { id: "al006", timestamp: "2024-06-09T14:00:00", action: "LOGIN", entity: "User", entityId: "u004", performedBy: "Dr. Prasad Kumar", role: "Optometrist", ipAddress: "192.168.1.101" },
  { id: "al007", timestamp: "2024-06-09T16:30:00", action: "APPROVE", entity: "EMR", entityId: "e003", performedBy: "Venkateswara Rao", role: "Nodal Officer", ipAddress: "10.0.0.51", details: "EMR approved with referral" },
  { id: "al008", timestamp: "2024-06-08T09:00:00", action: "CREATE", entity: "Camp", entityId: "c010", performedBy: "Ramakrishna Murthy", role: "Nodal Officer", ipAddress: "10.0.0.50", details: "New camp scheduled for Anantapur" },
  { id: "al009", timestamp: "2024-06-07T15:00:00", action: "UPDATE", entity: "Vendor", entityId: "v001", performedBy: "Admin Suresh", role: "Super Admin", ipAddress: "10.0.0.10", details: "SLA config updated to 7 days" },
  { id: "al010", timestamp: "2024-06-06T11:00:00", action: "GENERATE", entity: "Report", entityId: "rep001", performedBy: "Admin Suresh", role: "Super Admin", ipAddress: "10.0.0.10", details: "Monthly District Report generated for May 2024" },
];

export const screeningTeams: ScreeningTeam[] = [
  { id: "t001", name: "Team Alpha", lead: "Dr. Prasad Kumar", members: ["Raju Naik", "Lakshmi Priya", "Ramesh T"], district: "Guntur", activeCamp: "c001", status: "Active", performanceScore: 92, totalScreened: 1245 },
  { id: "t002", name: "Team Beta", lead: "Dr. Sunitha Rao", members: ["Kishore Kumar", "Anitha S"], district: "Krishna", status: "Active", performanceScore: 88, totalScreened: 1087 },
  { id: "t003", name: "Team Gamma", lead: "Dr. Venkata Rao", members: ["Sridhar M", "Padmaja K", "Naresh P"], district: "Visakhapatnam", status: "Active", performanceScore: 95, totalScreened: 1456 },
  { id: "t004", name: "Team Delta", lead: "Dr. Hari Prasad", members: ["Chandra S", "Usha R"], district: "Chittoor", status: "Active", performanceScore: 85, totalScreened: 932 },
  { id: "t005", name: "Team Epsilon", lead: "Dr. Kavitha Reddy", members: ["Gopi N", "Mani T", "Priya K"], district: "East Godavari", status: "Active", performanceScore: 91, totalScreened: 1324 },
  { id: "t006", name: "Team Zeta", lead: "Dr. Mohan Rao", members: ["Vinay K", "Sushma P"], district: "Kurnool", status: "Active", performanceScore: 87, totalScreened: 987 },
  { id: "t007", name: "Team Eta", lead: "Dr. Geetha Krishnan", members: ["Anil R", "Bhavana S"], district: "Nellore", status: "Active", performanceScore: 89, totalScreened: 1123 },
  { id: "t008", name: "Team Theta", lead: "Dr. Babu Rao", members: ["Kiran T", "Sravani K"], district: "Srikakulam", status: "Active", performanceScore: 83, totalScreened: 876 },
];

export const aiHotspots: AIHotspot[] = [
  { district: "Guntur", burdenScore: 78, drPrevalence: 12.4, cataractRisk: 18.2, glaucomaRisk: 4.3, refractiveError: 35.6, predictedDemand: 4800, riskLevel: "High" },
  { district: "Visakhapatnam", burdenScore: 74, drPrevalence: 11.3, cataractRisk: 16.8, glaucomaRisk: 3.9, refractiveError: 33.2, predictedDemand: 4200, riskLevel: "High" },
  { district: "Krishna", burdenScore: 73, drPrevalence: 11.7, cataractRisk: 17.1, glaucomaRisk: 4.1, refractiveError: 34.5, predictedDemand: 4000, riskLevel: "High" },
  { district: "East Godavari", burdenScore: 71, drPrevalence: 10.8, cataractRisk: 15.9, glaucomaRisk: 3.7, refractiveError: 32.8, predictedDemand: 3800, riskLevel: "Moderate" },
  { district: "West Godavari", burdenScore: 68, drPrevalence: 10.2, cataractRisk: 15.2, glaucomaRisk: 3.5, refractiveError: 31.4, predictedDemand: 3500, riskLevel: "Moderate" },
  { district: "Anantapur", burdenScore: 67, drPrevalence: 9.3, cataractRisk: 14.8, glaucomaRisk: 3.2, refractiveError: 30.2, predictedDemand: 3200, riskLevel: "Moderate" },
  { district: "Vizianagaram", burdenScore: 65, drPrevalence: 9.1, cataractRisk: 14.3, glaucomaRisk: 3.0, refractiveError: 29.8, predictedDemand: 2900, riskLevel: "Moderate" },
  { district: "Nellore", burdenScore: 69, drPrevalence: 10.1, cataractRisk: 15.0, glaucomaRisk: 3.6, refractiveError: 31.8, predictedDemand: 3400, riskLevel: "Moderate" },
  { district: "Kurnool", burdenScore: 64, drPrevalence: 8.9, cataractRisk: 13.9, glaucomaRisk: 2.9, refractiveError: 29.1, predictedDemand: 2800, riskLevel: "Moderate" },
  { district: "Prakasam", burdenScore: 66, drPrevalence: 9.6, cataractRisk: 14.6, glaucomaRisk: 3.1, refractiveError: 30.8, predictedDemand: 3100, riskLevel: "Moderate" },
  { district: "Kadapa", burdenScore: 63, drPrevalence: 8.5, cataractRisk: 13.4, glaucomaRisk: 2.7, refractiveError: 28.4, predictedDemand: 2600, riskLevel: "Low" },
  { district: "Srikakulam", burdenScore: 62, drPrevalence: 8.2, cataractRisk: 13.1, glaucomaRisk: 2.6, refractiveError: 27.9, predictedDemand: 2500, riskLevel: "Low" },
  { district: "Chittoor", burdenScore: 60, drPrevalence: 8.0, cataractRisk: 12.8, glaucomaRisk: 2.5, refractiveError: 27.2, predictedDemand: 2300, riskLevel: "Low" },
];

export const monthlyKPIs: MonthlyKPI[] = [
  { month: "Jul 2023", screened: 8234, spectacles: 2187, referrals: 723, teleconsults: 456 },
  { month: "Aug 2023", screened: 9456, spectacles: 2512, referrals: 834, teleconsults: 523 },
  { month: "Sep 2023", screened: 10234, spectacles: 2734, referrals: 912, teleconsults: 589 },
  { month: "Oct 2023", screened: 11567, spectacles: 3087, referrals: 1023, teleconsults: 645 },
  { month: "Nov 2023", screened: 12345, spectacles: 3287, referrals: 1089, teleconsults: 689 },
  { month: "Dec 2023", screened: 10987, spectacles: 2934, referrals: 978, teleconsults: 612 },
  { month: "Jan 2024", screened: 13456, spectacles: 3587, referrals: 1178, teleconsults: 745 },
  { month: "Feb 2024", screened: 12789, spectacles: 3412, referrals: 1123, teleconsults: 712 },
  { month: "Mar 2024", screened: 14234, spectacles: 3812, referrals: 1267, teleconsults: 801 },
  { month: "Apr 2024", screened: 13678, spectacles: 3645, referrals: 1212, teleconsults: 767 },
  { month: "May 2024", screened: 15234, spectacles: 4056, referrals: 1345, teleconsults: 856 },
  { month: "Jun 2024", screened: 10433, spectacles: 2979, referrals: 987, teleconsults: 629 },
];

export const users: User[] = [
  { id: "u001", name: "Admin Suresh", role: "Super Admin", district: "All", status: "Active", lastLogin: "2024-06-10T08:00:00", email: "suresh.admin@apvision.gov.in", mobile: "9000000001" },
  { id: "u002", name: "Ramakrishna Murthy", role: "Nodal Officer", district: "Guntur", status: "Active", lastLogin: "2024-06-10T08:30:00", email: "ramakrishna.no@apvision.gov.in", mobile: "9000000002" },
  { id: "u003", name: "Venkateswara Rao", role: "Nodal Officer", district: "Visakhapatnam", status: "Active", lastLogin: "2024-06-09T09:00:00", email: "venkat.no@apvision.gov.in", mobile: "9000000003" },
  { id: "u004", name: "Dr. Prasad Kumar", role: "Optometrist", district: "Guntur", status: "Active", lastLogin: "2024-06-10T09:00:00", email: "prasad.opt@apvision.gov.in", mobile: "9000000004" },
  { id: "u005", name: "Dr. Sunitha Rao", role: "Optometrist", district: "Krishna", status: "Active", lastLogin: "2024-06-09T09:30:00", email: "sunitha.opt@apvision.gov.in", mobile: "9000000005" },
  { id: "u006", name: "Dr. Hari Prasad", role: "Optometrist", district: "Chittoor", status: "Active", lastLogin: "2024-06-07T08:45:00", email: "hari.opt@apvision.gov.in", mobile: "9000000006" },
  { id: "u007", name: "Dr. Kavitha Reddy", role: "Optometrist", district: "East Godavari", status: "Active", lastLogin: "2024-06-06T09:00:00", email: "kavitha.opt@apvision.gov.in", mobile: "9000000007" },
  { id: "u008", name: "Dr. Mohan Rao", role: "Optometrist", district: "Kurnool", status: "Active", lastLogin: "2024-06-05T08:30:00", email: "mohan.opt@apvision.gov.in", mobile: "9000000008" },
  { id: "u009", name: "Dr. Geetha Krishnan", role: "Optometrist", district: "Krishna", status: "Active", lastLogin: "2024-06-08T09:00:00", email: "geetha.opt@apvision.gov.in", mobile: "9000000009" },
  { id: "u010", name: "Srinivasa Reddy", role: "Nodal Officer", district: "Chittoor", status: "Active", lastLogin: "2024-06-07T08:00:00", email: "srinivasa.no@apvision.gov.in", mobile: "9000000010" },
  { id: "u011", name: "Ranga Rao", role: "Nodal Officer", district: "East Godavari", status: "Active", lastLogin: "2024-06-06T08:30:00", email: "ranga.no@apvision.gov.in", mobile: "9000000011" },
  { id: "u012", name: "Krishna Murthy", role: "Nodal Officer", district: "Kurnool", status: "Active", lastLogin: "2024-06-05T09:00:00", email: "krishna.no@apvision.gov.in", mobile: "9000000012" },
  { id: "u013", name: "Padmanabha Rao", role: "Nodal Officer", district: "Nellore", status: "Active", lastLogin: "2024-06-04T09:00:00", email: "padma.no@apvision.gov.in", mobile: "9000000013" },
  { id: "u014", name: "Anand Kumar", role: "Nodal Officer", district: "West Godavari", status: "Inactive", lastLogin: "2024-05-30T09:00:00", email: "anand.no@apvision.gov.in", mobile: "9000000014" },
  { id: "u015", name: "Babu Rao", role: "Nodal Officer", district: "Srikakulam", status: "Active", lastLogin: "2024-06-03T08:30:00", email: "babu.no@apvision.gov.in", mobile: "9000000015" },
  { id: "u016", name: "Venkat Rao", role: "Nodal Officer", district: "Vizianagaram", status: "Active", lastLogin: "2024-06-09T09:30:00", email: "venkat2.no@apvision.gov.in", mobile: "9000000016" },
  { id: "u017", name: "Dr. Venkata Rao", role: "Optometrist", district: "Visakhapatnam", status: "Active", lastLogin: "2024-06-09T08:00:00", email: "venkata.opt@apvision.gov.in", mobile: "9000000017" },
  { id: "u018", name: "Dr. Babu Rao", role: "Optometrist", district: "Srikakulam", status: "Active", lastLogin: "2024-06-03T08:45:00", email: "babu.opt@apvision.gov.in", mobile: "9000000018" },
  { id: "u019", name: "Ravi Kumar", role: "Patient", district: "Guntur", status: "Active", lastLogin: "2024-06-10T10:00:00", email: "ravi.kumar@gmail.com", mobile: "9876543210" },
  { id: "u020", name: "Lakshmi Devi", role: "Patient", district: "Guntur", status: "Active", lastLogin: "2024-06-10T11:00:00", email: "lakshmi.devi@gmail.com", mobile: "9876543211" },
];

export const recentActivities = [
  { id: 1, time: "10 mins ago", action: "New EMR submitted", detail: "Patient Suresh Babu - Camp Narasaraopet", type: "emr" },
  { id: 2, time: "25 mins ago", action: "Camp completed", detail: "Machilipatnam Village Camp - 78/80 screened", type: "camp" },
  { id: 3, time: "1 hr ago", action: "Spectacle order dispatched", detail: "Order SO003 to Rajamma, East Godavari", type: "order" },
  { id: 4, time: "2 hrs ago", action: "EMR approved", detail: "Padma Rao - Spectacles prescribed", type: "approval" },
  { id: 5, time: "3 hrs ago", action: "Referral created", detail: "Venkat Reddy - Critical DR, KIMS Vizag", type: "referral" },
  { id: 6, time: "4 hrs ago", action: "New camp scheduled", detail: "Anantapur School Camp - Jun 12", type: "camp" },
  { id: 7, time: "5 hrs ago", action: "Teleconsult completed", detail: "Vijayalakshmi - Dr. Sridhar Murthy, Dry Eye", type: "teleconsult" },
  { id: 8, time: "6 hrs ago", action: "SLA breach alert", detail: "Order SO006 delivered 1 day late - VisionCare Nellore", type: "alert" },
  { id: 9, time: "Yesterday", action: "Vendor rating updated", detail: "Vision Optics Hyderabad - 4.5 stars", type: "vendor" },
  { id: 10, time: "Yesterday", action: "Monthly report generated", detail: "May 2024 District Reports - All 13 districts", type: "report" },
];

export const demandForecast = [
  { month: "Jul 2024", predicted: 4200, lower: 3800, upper: 4600 },
  { month: "Aug 2024", predicted: 4500, lower: 4100, upper: 4900 },
  { month: "Sep 2024", predicted: 4800, lower: 4400, upper: 5200 },
];

export const outcomeDistribution = [
  { name: "Normal", value: 45234, color: "#16a34a" },
  { name: "Spectacles", value: 38291, color: "#2563eb" },
  { name: "Teleconsult", value: 8234, color: "#f59e0b" },
  { name: "Referral", value: 12847, color: "#dc2626" },
];

export const ophthalmologists = [
  { id: "doc001", name: "Dr. Sridhar Murthy", specialization: "Vitreo-Retina", hospital: "SVIMS Tirupati", available: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
  { id: "doc002", name: "Dr. Lalitha Nair", specialization: "Glaucoma", hospital: "KIMS Hyderabad", available: true, slots: ["10:00", "11:00", "14:00", "16:00"] },
  { id: "doc003", name: "Dr. Venkata Raman", specialization: "Cornea & Refractive", hospital: "NTR Trust Vijayawada", available: true, slots: ["09:00", "10:00", "15:00", "16:00"] },
  { id: "doc004", name: "Dr. Priya Sharma", specialization: "Pediatric Ophthalmology", hospital: "SVIMS Tirupati", available: false, slots: [] },
];
