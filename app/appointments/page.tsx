'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScheduleMeeting } from '@/components/modals/ScheduleMeeting'
import {
  Calendar,
  Video,
  Clock,
  Users,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Filter,
  Search
} from 'lucide-react'

// Mock appointments data
const mockAppointments = [
  {
    id: '1',
    title: 'Follow-up Consultation',
    patient_name: 'Margaret Johnson',
    patient_id: '1',
    scheduled_time: '2024-01-20T10:00:00Z',
    duration_minutes: 30,
    meeting_platform: 'google_meet',
    meeting_url: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
    description: 'Review medication adherence and discuss any side effects',
    include_family: true
  },
  {
    id: '2',
    title: 'Medication Review',
    patient_name: 'Robert Chen',
    patient_id: '2',
    scheduled_time: '2024-01-18T14:30:00Z',
    duration_minutes: 45,
    meeting_platform: 'jitsi',
    meeting_url: 'https://meet.jit.si/SmartMed-Review-123',
    status: 'scheduled',
    description: 'Adjust medication dosages based on recent lab results',
    include_family: false
  },
  {
    id: '3',
    title: 'Routine Check-in',
    patient_name: 'Dorothy Williams',
    patient_id: '3',
    scheduled_time: '2024-01-25T11:15:00Z',
    duration_minutes: 15,
    meeting_platform: 'google_meet',
    meeting_url: 'https://meet.google.com/xyz-uvwx-abc',
    status: 'scheduled',
    description: 'Monthly wellness check and medication compliance review',
    include_family: true
  },
  {
    id: '4',
    title: 'Emergency Consultation',
    patient_name: 'James Wilson',
    patient_id: '4',
    scheduled_time: '2024-01-16T09:00:00Z',
    duration_minutes: 60,
    meeting_platform: 'zoom',
    meeting_url: 'https://zoom.us/j/123456789',
    status: 'completed',
    description: 'Address recent symptom reports and medication concerns',
    include_family: true
  }
]

export default function AppointmentsPage() {
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    type: 'all',
    date: 'all'
  })

  const filterOptions = {
    status: ['all', 'confirmed', 'pending', 'cancelled'],
    type: ['all', 'video', 'in-person', 'phone'],
    date: ['all', 'today', 'this-week', 'this-month']
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleNewAppointment = () => {
    setShowMeetingModal(true)
  }

  const handleJoinCall = (appointmentId: string) => {
    console.log('Joining call for appointment:', appointmentId)
  }

  const handleConfirmAppointment = (appointmentId: string) => {
    console.log('Confirming appointment:', appointmentId)
  }

  const filteredAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.scheduled_time)
    const now = new Date()
    
    switch (activeFilters.date) {
      case 'today':
        return appointmentDate.toDateString() === now.toDateString()
      case 'this-week':
        return appointmentDate > now && appointmentDate < new Date(now.setDate(now.getDate() + 7))
      case 'this-month':
        return appointmentDate > now && appointmentDate < new Date(now.getFullYear(), now.getMonth() + 1, 0)
      default:
        return true
    }
  })

  const getStatusColor = (status: string, scheduledTime: string) => {
    const appointmentDate = new Date(scheduledTime)
    const now = new Date()
    const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    if (status === 'completed') return 'bg-gray-100 text-gray-800'
    if (diffHours < 1 && diffHours > 0) return 'bg-yellow-100 text-yellow-800'
    if (diffHours < 0) return 'bg-danger-100 text-danger-800'
    return 'bg-healthcare-100 text-healthcare-800'
  }

  const getStatusLabel = (status: string, scheduledTime: string) => {
    const appointmentDate = new Date(scheduledTime)
    const now = new Date()
    const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    if (status === 'completed') return 'Completed'
    if (diffHours < 1 && diffHours > 0) return 'Starting Soon'
    if (diffHours < 0) return 'Missed'
    return 'Scheduled'
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google_meet': return '🟢'
      case 'jitsi': return '🔵'
      case 'zoom': return '🔵'
      default: return '📹'
    }
  }

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Appointments
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              Schedule and manage patient consultations
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button 
              variant="primary"
              onClick={handleNewAppointment}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>New Appointment</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const renderFilters = () => (
    showFilters && (
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.status.map(status => (
                <Button
                  key={status}
                  variant={activeFilters.status === status ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('status', status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.type.map(type => (
                <Button
                  key={type}
                  variant={activeFilters.type === type ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('type', type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.date.map(date => (
                <Button
                  key={date}
                  variant={activeFilters.date === date ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('date', date)}
                  className="capitalize"
                >
                  {date.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )

  const renderAppointments = () => (
    <div className="grid grid-cols-1 gap-4">
      {filteredAppointments.map((appointment) => (
        <Card key={appointment.id} className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {appointment.patient_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <CardTitle>{appointment.title}</CardTitle>
                  <p className="text-sm text-gray-500">{appointment.patient_name}</p>
                </div>
              </div>
              <Badge className={getStatusColor(appointment.status, appointment.scheduled_time)}>
                {getStatusLabel(appointment.status, appointment.scheduled_time)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>{new Date(appointment.scheduled_time).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{appointment.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-gray-400" />
                  <span>{getPlatformIcon(appointment.meeting_platform)} {appointment.meeting_platform.replace('_', ' ')}</span>
                </div>
                {appointment.include_family && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>Family included</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{appointment.description}</p>
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleJoinCall(appointment.id)}>
                  <Video className="h-4 w-4 mr-2" />
                  Join Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="flex-1 min-w-0">
      {renderHeader()}
      <main className="p-4 sm:p-6 lg:p-8">
        {renderFilters()}
        {renderAppointments()}
      </main>
      <ScheduleMeeting 
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />
    </div>
  )
} 