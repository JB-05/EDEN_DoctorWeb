'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, Stethoscope, Eye, EyeOff } from 'lucide-react'

// Mock doctor credentials for demo
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
        return
      }

      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address')
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }

      // Check mock credentials
      const doctor = MOCK_DOCTORS.find(
        doc => doc.email.toLowerCase() === formData.email.toLowerCase() && 
               doc.password === formData.password
      )

      if (doctor) {
        // Store user data in localStorage for demo
        localStorage.setItem('smartmed_user', JSON.stringify({
          id: '1',
          email: doctor.email,
          name: doctor.name,
          specialization: doctor.specialization
        }))
        router.push('/dashboard')
      } else {
        setError('Invalid email or password. Try demo credentials:\n• dr.sarah@hospital.com / doctor123\n• dr.michael@clinic.com / medical456\n• dr.emily@medcenter.com / healthcare789')
      }
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

  const handleDemoLogin = (doctor: typeof MOCK_DOCTORS[0]) => {
    // Store user data in localStorage for demo
    localStorage.setItem('smartmed_user', JSON.stringify({
      id: '1',
      email: doctor.email,
      name: doctor.name,
      specialization: doctor.specialization
    }))
    router.push('/dashboard')
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

              <div className="relative">
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                Sign In
              </Button>

              {/* Demo Login Section */}
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Quick Demo Login:</div>
                <div className="space-y-2">
                  {MOCK_DOCTORS.map((doctor, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      className="w-full text-left"
                      onClick={() => handleDemoLogin(doctor)}
                    >
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-xs text-gray-500">{doctor.specialization}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 