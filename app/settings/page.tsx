'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import {
  User,
  Bell,
  Shield,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@medicenter.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    licenseNumber: 'MD-12345-CA',
    hospital: 'MediCenter Hospital',
    experience: '15'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email_alerts: true,
    sms_alerts: true,
    push_notifications: true,
    critical_alerts: true,
    daily_summary: true,
    weekly_reports: false
  })

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    sessionTimeout: '30'
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings(prev => ({ ...prev, [name]: checked }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement profile update
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const specializations = [
    'Cardiology', 'Endocrinology', 'Geriatrics', 'Internal Medicine',
    'Neurology', 'Oncology', 'Orthopedics', 'Psychiatry'
  ]

  return (
    <div className="flex-1 lg:ml-64">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-medical">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage your profile, notifications, and security preferences
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'preferences', label: 'Preferences', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-medical-500 text-medical-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="First Name"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      required
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    icon={<Mail className="h-4 w-4" />}
                    required
                  />
                  
                  <Input
                    name="phone"
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    icon={<Phone className="h-4 w-4" />}
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      name="specialization"
                      label="Specialization"
                      value={profileData.specialization}
                      onChange={handleProfileChange}
                      options={specializations.map(spec => ({ value: spec, label: spec }))}
                      required
                    />
                    <Input
                      name="licenseNumber"
                      label="Medical License"
                      value={profileData.licenseNumber}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="hospital"
                      label="Hospital/Clinic"
                      value={profileData.hospital}
                      onChange={handleProfileChange}
                      required
                    />
                    <Input
                      name="experience"
                      label="Years of Experience"
                      type="number"
                      value={profileData.experience}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    loading={loading}
                    icon={<Save className="h-4 w-4" />}
                  >
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Alert Notifications</h4>
                    {[
                      { key: 'critical_alerts', label: 'Critical Patient Alerts', description: 'Immediate notifications for critical situations' },
                      { key: 'email_alerts', label: 'Email Notifications', description: 'Receive alerts via email' },
                      { key: 'sms_alerts', label: 'SMS Notifications', description: 'Receive alerts via text message' },
                      { key: 'push_notifications', label: 'Push Notifications', description: 'Browser and mobile push notifications' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{setting.label}</div>
                          <div className="text-sm text-gray-500">{setting.description}</div>
                        </div>
                        <input
                          type="checkbox"
                          name={setting.key}
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Summary Reports</h4>
                    {[
                      { key: 'daily_summary', label: 'Daily Summary', description: 'Daily patient adherence summary' },
                      { key: 'weekly_reports', label: 'Weekly Reports', description: 'Comprehensive weekly analytics' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{setting.label}</div>
                          <div className="text-sm text-gray-500">{setting.description}</div>
                        </div>
                        <input
                          type="checkbox"
                          name={setting.key}
                          checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="primary" icon={<Save className="h-4 w-4" />}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    name="currentPassword"
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    value={securitySettings.currentPassword}
                    onChange={handleSecurityChange}
                    icon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                  <Input
                    name="newPassword"
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={securitySettings.newPassword}
                    onChange={handleSecurityChange}
                  />
                  <Input
                    name="confirmPassword"
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={securitySettings.confirmPassword}
                    onChange={handleSecurityChange}
                  />
                  <Button variant="primary" icon={<Save className="h-4 w-4" />}>
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                    </div>
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <Select
                      name="sessionTimeout"
                      value={securitySettings.sessionTimeout}
                      onChange={handleSecurityChange}
                      options={[
                        { value: '15', label: '15 minutes' },
                        { value: '30', label: '30 minutes' },
                        { value: '60', label: '1 hour' },
                        { value: '120', label: '2 hours' }
                      ]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Default Time Zone
                    </label>
                    <Select
                      options={[
                        { value: 'EST', label: 'Eastern Time (EST)' },
                        { value: 'CST', label: 'Central Time (CST)' },
                        { value: 'MST', label: 'Mountain Time (MST)' },
                        { value: 'PST', label: 'Pacific Time (PST)' }
                      ]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Date Format
                    </label>
                    <Select
                      options={[
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                      ]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Language
                    </label>
                    <Select
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' }
                      ]}
                    />
                  </div>
                  
                  <Button variant="primary" icon={<Save className="h-4 w-4" />}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
} 