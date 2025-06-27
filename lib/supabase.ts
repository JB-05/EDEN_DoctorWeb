import { createClient } from '@supabase/supabase-js'

// Fallback values for demo mode when Supabase is not configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})

// Auth helper functions with error handling
export const auth = {
    signIn: async (email: string, password: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                // Demo mode - always return error to fall back to mock auth
                throw new Error('Demo mode - using mock authentication')
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            return { data, error }
        } catch (error: any) {
            return { data: null, error: { message: error.message || 'Supabase not configured' } }
        }
    },

    signOut: async () => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { error: null }
            }

            const { error } = await supabase.auth.signOut()
            return { error }
        } catch (error: any) {
            return { error: { message: error.message || 'Supabase not configured' } }
        }
    },

    getUser: async () => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { user: null, error: null }
            }

            const { data: { user }, error } = await supabase.auth.getUser()
            return { user, error }
        } catch (error: any) {
            return { user: null, error: { message: error.message || 'Supabase not configured' } }
        }
    },

    getSession: async () => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { session: null, error: null }
            }

            const { data: { session }, error } = await supabase.auth.getSession()
            return { session, error }
        } catch (error: any) {
            return { session: null, error: { message: error.message || 'Supabase not configured' } }
        }
    }
}

// Database helper functions with error handling
export const db = {
    // Patients
    getPatients: async (doctorId: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('patients')
                .select('*')
                .eq('assigned_doctor_id', doctorId)
                .order('name')
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    getPatient: async (patientId: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: null, error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('patients')
                .select('*')
                .eq('id', patientId)
                .single()
            return { data, error }
        } catch (error: any) {
            return { data: null, error: { message: error.message || 'Database not available' } }
        }
    },

    // Medications
    getPatientMedications: async (patientId: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('medications')
                .select('*')
                .eq('patient_id', patientId)
                .eq('is_active', true)
                .order('name')
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    // Medication Logs
    getMedicationLogs: async (patientId: string, limit = 50) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('medication_logs')
                .select(`
        *,
        medications (name, dosage)
      `)
                .eq('patient_id', patientId)
                .order('scheduled_time', { ascending: false })
                .limit(limit)
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    // Symptom Reports
    getSymptomReports: async (patientId: string, limit = 20) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('symptom_reports')
                .select('*')
                .eq('patient_id', patientId)
                .order('reported_at', { ascending: false })
                .limit(limit)
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    // Doctor Notes
    getDoctorNotes: async (patientId: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('doctor_notes')
                .select('*')
                .eq('patient_id', patientId)
                .order('created_at', { ascending: false })
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    addDoctorNote: async (note: Omit<any, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: null, error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('doctor_notes')
                .insert(note)
                .select()
                .single()
            return { data, error }
        } catch (error: any) {
            return { data: null, error: { message: error.message || 'Database not available' } }
        }
    },

    // Virtual Meetings
    getUpcomingMeetings: async (doctorId: string) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: [], error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('virtual_meetings')
                .select(`
        *,
        patients (name)
      `)
                .eq('doctor_id', doctorId)
                .eq('status', 'scheduled')
                .gte('scheduled_time', new Date().toISOString())
                .order('scheduled_time')
            return { data, error }
        } catch (error: any) {
            return { data: [], error: { message: error.message || 'Database not available' } }
        }
    },

    createMeeting: async (meeting: Omit<any, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            if (supabaseUrl === 'https://demo.supabase.co') {
                return { data: null, error: { message: 'Demo mode - no database available' } }
            }

            const { data, error } = await supabase
                .from('virtual_meetings')
                .insert(meeting)
                .select()
                .single()
            return { data, error }
        } catch (error: any) {
            return { data: null, error: { message: error.message || 'Database not available' } }
        }
    }
} 