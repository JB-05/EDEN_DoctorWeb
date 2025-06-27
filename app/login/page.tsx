'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, Stethoscope, Heart, Eye, EyeOff } from 'lucide-react'
import { auth } from '@/lib/supabase'

// Mock doctor credentials for demo (replace with real authentication)
const MOCK_DOCTORS = [
  {
    email: 'dr.sarah@hospital.com',
    password: 'doctor123',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology'
  },
  {
    email: 'dr.michael@clinic.com', 
    password: 'medical456',
    name: 'Dr. Michael Chen',
    specialization: 'Internal Medicine'
  },
  {
    email: 'dr.emily@medcenter.com',
    password: 'healthcare789',
    name: 'Dr. Emily Davis',
    specialization: 'Geriatrics'
  }
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { session } = await auth.getSession()
        if (session) {
          router.push('/dashboard')
        }
      } catch (error) {
        // If Supabase is not configured, check localStorage for demo
        const savedUser = localStorage.getItem('smartmed_user')
        if (savedUser) {
          router.push('/dashboard')
        }
      }
    }
    
    checkAuth()
  }, [router])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }

      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        setLoading(false)
        return
      }

      console.log('Attempting login with:', formData.email)

      // Try demo authentication first (since Supabase is not configured)
      const doctor = MOCK_DOCTORS.find(
        doc => doc.email.toLowerCase() === formData.email.toLowerCase() && 
               doc.password === formData.password
      )

      if (doctor) {
        console.log('Demo login successful for:', doctor.name)
        
        // Successful demo login
        const userData = {
          id: 'demo_' + Date.now(),
          email: doctor.email,
          name: doctor.name,
          specialization: doctor.specialization
        }
        
        localStorage.setItem('smartmed_user', JSON.stringify(userData))
        console.log('User data stored in localStorage:', userData)
        
        // Force redirect to dashboard
        window.location.href = '/dashboard'
        return
      }

      // If demo auth fails, try Supabase as fallback
      try {
        const { data, error: authError } = await auth.signIn(formData.email, formData.password)
        
        if (data?.user && !authError) {
          // Successful Supabase login
          const userData = {
            id: data.user.id,
            email: data.user.email,
            name: 'Dr. ' + (data.user.user_metadata?.name || 'Doctor'),
            specialization: data.user.user_metadata?.specialization || 'General Medicine'
          }
          
          localStorage.setItem('smartmed_user', JSON.stringify(userData))
          window.location.href = '/dashboard'
          return
        }
      } catch (supabaseError) {
        console.log('Supabase authentication failed:', supabaseError)
      }

      // If both demo and Supabase fail
      setError('Invalid email or password. Try demo credentials:\n• dr.sarah@hospital.com / doctor123\n• dr.michael@clinic.com / medical456\n• dr.emily@medcenter.com / healthcare789')
      
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleDemoLogin = async (doctor: typeof MOCK_DOCTORS[0]) => {
    setFormData({
      email: doctor.email,
      password: doctor.password
    })
    
    // Auto-login after setting credentials
    setLoading(true)
    setError('')
    
    try {
      console.log('Auto-login with demo credentials:', doctor.email)
      
      const userData = {
        id: 'demo_' + Date.now(),
        email: doctor.email,
        name: doctor.name,
        specialization: doctor.specialization
      }
      
      localStorage.setItem('smartmed_user', JSON.stringify(userData))
      console.log('User data stored in localStorage:', userData)
      
      // Force redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Auto-login failed:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-healthcare-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-medical-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-healthcare-100 rounded-full opacity-20"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-medical-600 to-healthcare-600 rounded-2xl flex items-center justify-center mb-4 shadow-medical">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-medical">
            Smart Med Assistant
          </h2>
        </div>

        {/* Auth Form */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Welcome Back, Doctor
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Sign in to access your patient portal
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-danger-50 border border-danger-200 text-danger-800 px-4 py-3 rounded-lg text-sm whitespace-pre-line">
                  {error}
                </div>
              )}

              <Input
                name="email"
                type="email"
                label="Email Address"
                icon={<Mail className="h-4 w-4" />}
                placeholder="doctor@hospital.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />

              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                icon={<Lock className="h-4 w-4" />}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-medical-600 hover:text-medical-500 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                icon={!loading ? <Heart className="h-4 w-4" /> : undefined}
              >
                {loading ? 'Signing In...' : 'Sign In to Portal'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-medical-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Demo Credentials:</h4>
              <div className="space-y-2">
                {MOCK_DOCTORS.map((doctor, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDemoLogin(doctor)}
                    className="w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-medical-300 transition-colors text-xs"
                  >
                    <div className="font-medium text-gray-900">{doctor.name}</div>
                    <div className="text-gray-600">{doctor.email}</div>
                    <div className="text-gray-500">{doctor.specialization}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Link to signup page */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-medical-600 hover:text-medical-500 transition-colors">
                  Create doctor account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 