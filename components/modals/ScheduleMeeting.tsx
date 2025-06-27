'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { X, Video, Calendar, Clock, Users } from 'lucide-react'

interface ScheduleMeetingProps {
  isOpen: boolean
  onClose: () => void
  patientId?: string
  patientName?: string
}

const platformOptions = [
  { value: 'google_meet', label: 'Google Meet' },
  { value: 'jitsi', label: 'Jitsi Meet' },
  { value: 'zoom', label: 'Zoom' }
]

const durationOptions = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' }
]

export const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({
  isOpen,
  onClose,
  patientId,
  patientName
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '',
    duration_minutes: '30',
    meeting_platform: 'google_meet',
    include_family: false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement Supabase meeting creation
      console.log('Creating meeting:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        scheduled_date: '',
        scheduled_time: '',
        duration_minutes: '30',
        meeting_platform: 'google_meet',
        include_family: false
      })
      onClose()
    } catch (error) {
      console.error('Error creating meeting:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <Card className="relative w-full max-w-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 text-medical-600 mr-2" />
                Schedule Virtual Meeting
              </CardTitle>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {patientName && (
              <p className="text-sm text-gray-600">
                Meeting with {patientName}
              </p>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                name="title"
                label="Meeting Title"
                placeholder="Follow-up consultation"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Textarea
                name="description"
                label="Description (Optional)"
                placeholder="Discuss medication adherence and any concerns..."
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="scheduled_date"
                  type="date"
                  label="Date"
                  value={formData.scheduled_date}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="scheduled_time"
                  type="time"
                  label="Time"
                  value={formData.scheduled_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  name="duration_minutes"
                  label="Duration"
                  options={durationOptions}
                  value={formData.duration_minutes}
                  onChange={handleChange}
                />
                <Select
                  name="meeting_platform"
                  label="Platform"
                  options={platformOptions}
                  value={formData.meeting_platform}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="include_family"
                  name="include_family"
                  type="checkbox"
                  checked={formData.include_family}
                  onChange={handleChange}
                  className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                />
                <label htmlFor="include_family" className="ml-2 block text-sm text-gray-900">
                  Include family members in this meeting
                </label>
              </div>

              <div className="bg-medical-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-medical-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Meeting Details</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      A {formData.meeting_platform.replace('_', ' ')} link will be generated and sent to the patient
                      {formData.include_family ? ' and their family members' : ''} via email and SMS.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  icon={!loading ? <Video className="h-4 w-4" /> : undefined}
                >
                  {loading ? 'Scheduling...' : 'Schedule Meeting'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 