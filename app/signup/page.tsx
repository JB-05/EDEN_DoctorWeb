'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { 
  Mail, 
  Lock, 
  Stethoscope, 
  User, 
  Phone, 
  Building2, 
  Shield,
  CheckCircle,
  ArrowLeft,
  CreditCard
} from 'lucide-react'

const specializationOptions = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'geriatrics', label: 'Geriatrics' },
  { value: 'internal_medicine', label: 'Internal Medicine' },
  { value: 'family_medicine', label: 'Family Medicine' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'emergency_medicine', label: 'Emergency Medicine' },
  { value: 'other', label: 'Other' }
]

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'other', label: 'Other' }
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    
    // Professional Information
    specialization: '',
    license_number: '',
    medical_school: '',
    graduation_year: '',
    hospital_affiliation: '',
    years_experience: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    agree_terms: false,
    agree_privacy: false
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.country) newErrors.country = 'Country is required'
    }

    if (step === 2) {
      if (!formData.specialization) newErrors.specialization = 'Specialization is required'
      if (!formData.license_number.trim()) newErrors.license_number = 'Medical license number is required'
      if (!formData.medical_school.trim()) newErrors.medical_school = 'Medical school is required'
      if (!formData.graduation_year.trim()) newErrors.graduation_year = 'Graduation year is required'
      if (!formData.years_experience.trim()) newErrors.years_experience = 'Years of experience is required'
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required'
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long'
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      if (!formData.agree_terms) newErrors.agree_terms = 'You must agree to the terms of service'
      if (!formData.agree_privacy) newErrors.agree_privacy = 'You must agree to the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setLoading(true)

    try {
      // TODO: Implement Supabase signup
      console.log('Creating doctor account:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to dashboard or success page
      router.push('/dashboard')
    } catch (error) {
      setErrors({ submit: 'Account creation failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const stepTitles = [
    'Personal Information',
    'Professional Details',
    'Account Security'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-healthcare-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-medical-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-healthcare-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-medical-50 rounded-full opacity-30"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/login"
            className="inline-flex items-center text-medical-600 hover:text-medical-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-medical-600 to-healthcare-600 rounded-2xl flex items-center justify-center mb-4 shadow-medical">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 font-medical">
            Join Smart Med Assistant
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Create your doctor account to start monitoring patient medication adherence
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm
                  ${currentStep >= step 
                    ? 'bg-medical-600 border-medical-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                  }
                `}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-medical-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <p className="text-sm font-medium text-gray-900">
              Step {currentStep} of 3: {stepTitles[currentStep - 1]}
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              {currentStep === 1 && 'Tell us about yourself'}
              {currentStep === 2 && 'Your medical credentials and experience'}
              {currentStep === 3 && 'Secure your account'}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      type="text"
                      label="First Name"
                      icon={<User className="h-4 w-4" />}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      name="lastName"
                      type="text"
                      label="Last Name"
                      icon={<User className="h-4 w-4" />}
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    icon={<Mail className="h-4 w-4" />}
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      icon={<Phone className="h-4 w-4" />}
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      required
                    />
                    <Select
                      name="country"
                      label="Country"
                      options={[{ value: '', label: 'Select country...' }, ...countryOptions]}
                      value={formData.country}
                      onChange={handleChange}
                      error={errors.country}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      name="specialization"
                      label="Medical Specialization"
                      options={[{ value: '', label: 'Select specialization...' }, ...specializationOptions]}
                      value={formData.specialization}
                      onChange={handleChange}
                      error={errors.specialization}
                    />
                    <Input
                      name="license_number"
                      type="text"
                      label="Medical License Number"
                      icon={<CreditCard className="h-4 w-4" />}
                      placeholder="MD123456"
                      value={formData.license_number}
                      onChange={handleChange}
                      error={errors.license_number}
                      required
                    />
                  </div>

                  <Input
                    name="medical_school"
                    type="text"
                    label="Medical School"
                    icon={<Building2 className="h-4 w-4" />}
                    placeholder="Harvard Medical School"
                    value={formData.medical_school}
                    onChange={handleChange}
                    error={errors.medical_school}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="graduation_year"
                      type="number"
                      label="Graduation Year"
                      placeholder="2015"
                      min="1950"
                      max="2024"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      error={errors.graduation_year}
                      required
                    />
                    <Input
                      name="years_experience"
                      type="number"
                      label="Years of Experience"
                      placeholder="8"
                      min="0"
                      max="50"
                      value={formData.years_experience}
                      onChange={handleChange}
                      error={errors.years_experience}
                      required
                    />
                  </div>

                  <Input
                    name="hospital_affiliation"
                    type="text"
                    label="Current Hospital/Clinic (Optional)"
                    icon={<Building2 className="h-4 w-4" />}
                    placeholder="General Hospital"
                    value={formData.hospital_affiliation}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Step 3: Account Security */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    icon={<Lock className="h-4 w-4" />}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                  />

                  <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    icon={<Lock className="h-4 w-4" />}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        id="agree_terms"
                        name="agree_terms"
                        type="checkbox"
                        checked={formData.agree_terms}
                        onChange={handleChange}
                        className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="agree_terms" className="ml-3 block text-sm text-gray-900">
                        I agree to the{' '}
                        <a href="#" className="text-medical-600 hover:text-medical-500 font-medium">
                          Terms of Service
                        </a>{' '}
                        and understand my responsibilities as a healthcare provider
                      </label>
                    </div>
                    {errors.agree_terms && (
                      <p className="text-sm text-danger-600 ml-7">{errors.agree_terms}</p>
                    )}

                    <div className="flex items-start">
                      <input
                        id="agree_privacy"
                        name="agree_privacy"
                        type="checkbox"
                        checked={formData.agree_privacy}
                        onChange={handleChange}
                        className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="agree_privacy" className="ml-3 block text-sm text-gray-900">
                        I agree to the{' '}
                        <a href="#" className="text-medical-600 hover:text-medical-500 font-medium">
                          Privacy Policy
                        </a>{' '}
                        and HIPAA compliance requirements
                      </label>
                    </div>
                    {errors.agree_privacy && (
                      <p className="text-sm text-danger-600 ml-7">{errors.agree_privacy}</p>
                    )}
                  </div>

                  <div className="bg-medical-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-medical-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">HIPAA Compliant & Secure</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Your account and patient data are protected with enterprise-grade security and full HIPAA compliance. All communications are encrypted and audit-logged.
                        </p>
                      </div>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-danger-50 border border-danger-200 text-danger-800 px-4 py-3 rounded-lg text-sm">
                      {errors.submit}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    icon={<ArrowLeft className="h-4 w-4" />}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleNext}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    icon={!loading ? <CheckCircle className="h-4 w-4" /> : undefined}
                  >
                    {loading ? 'Creating Account...' : 'Create Doctor Account'}
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-medical-600 hover:text-medical-500 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 