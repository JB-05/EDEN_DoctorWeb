// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: 'doctor' | 'family' | 'senior'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Doctor extends User {
  role: 'doctor'
  specialization?: string
  license_number?: string
  hospital_affiliation?: string
}

// Patient and Senior Types
export interface Patient {
  id: string
  name: string
  email?: string
  age: number
  phone?: string
  emergency_contact: string
  medical_conditions: string[]
  assigned_doctor_id: string
  linked_family_members: string[]
  created_at: string
  updated_at: string
}

// Medication Types
export interface Medication {
  id: string
  patient_id: string
  name: string
  dosage: string
  frequency: string
  schedule_times: string[]
  instructions: string
  start_date: string
  end_date?: string
  quantity_remaining: number
  refill_reminder_days: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Medication Log Types
export interface MedicationLog {
  id: string
  medication_id: string
  patient_id: string
  status: 'taken' | 'missed' | 'pending' | 'skipped'
  scheduled_time: string
  actual_time?: string
  method: 'voice' | 'camera' | 'manual' | 'family_confirmed'
  notes?: string
  pill_image_url?: string
  verification_confidence?: number
  created_at: string
}

// Symptom and Health Reports
export interface SymptomReport {
  id: string
  patient_id: string
  symptoms: string[]
  severity: 'mild' | 'moderate' | 'severe'
  description: string
  triggered_by: 'voice' | 'button' | 'family' | 'scheduled'
  reported_at: string
  doctor_notes?: string
  follow_up_required: boolean
  created_at: string
}

// Doctor Notes and Updates
export interface DoctorNote {
  id: string
  patient_id: string
  doctor_id: string
  title: string
  content: string
  note_type: 'general' | 'medication_change' | 'follow_up' | 'emergency'
  is_urgent: boolean
  created_at: string
  updated_at: string
}

// Virtual Meeting Types
export interface VirtualMeeting {
  id: string
  patient_id: string
  doctor_id: string
  family_member_ids: string[]
  title: string
  description?: string
  scheduled_time: string
  duration_minutes: number
  meeting_url: string
  meeting_platform: 'google_meet' | 'jitsi' | 'zoom'
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

// Dashboard Statistics
export interface PatientStats {
  patient_id: string
  adherence_rate: number
  total_medications: number
  missed_doses_today: number
  missed_doses_week: number
  last_taken_time?: string
  upcoming_doses: number
  symptom_reports_count: number
  last_symptom_report?: string
}

export interface DashboardStats {
  total_patients: number
  active_medications: number
  pending_meetings: number
  urgent_alerts: number
  overall_adherence_rate: number
  patients_with_low_adherence: number
}

// Chart and Analytics Types
export interface AdherenceData {
  date: string
  adherence_rate: number
  total_doses: number
  taken_doses: number
  missed_doses: number
}

export interface MedicationTrend {
  medication_name: string
  adherence_trend: AdherenceData[]
}

// UI and Component Types
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

export interface AlertMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  is_read: boolean
} 