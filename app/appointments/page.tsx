'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
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
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [filter, setFilter] = useState('upcoming')

  const filteredAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.scheduled_time)
    const now = new Date()
    
    switch (filter) {
      case 'upcoming':
        return appointmentDate > now && appointment.status === 'scheduled'
      case 'past':
        return appointmentDate < now || appointment.status === 'completed'
      case 'today':
        return appointmentDate.toDateString() === now.toDateString()
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-medical">
                  Appointments
                </h1>
                <p className="text-gray-600">
                  Manage virtual consultations and meetings
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="primary"
                  icon={<Plus className="h-4 w-4" />}
                  onClick={() => setShowScheduleModal(true)}
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              {[
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'today', label: 'Today' },
                { key: 'past', label: 'Past' },
                { key: 'all', label: 'All' }
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.key)}
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.title}
                          </h3>
                          <p className="text-gray-600">
                            with <span className="font-medium">{appointment.patient_name}</span>
                          </p>
                        </div>
                        <Badge className={getStatusColor(appointment.status, appointment.scheduled_time)}>
                          {getStatusLabel(appointment.status, appointment.scheduled_time)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(appointment.scheduled_time).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(appointment.scheduled_time).toLocaleTimeString()} ({appointment.duration_minutes}m)
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">{getPlatformIcon(appointment.meeting_platform)}</span>
                          {appointment.meeting_platform.replace('_', ' ')}
                        </div>
                      </div>

                      {appointment.description && (
                        <p className="text-gray-700 mb-4">{appointment.description}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {appointment.include_family && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              Family included
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {appointment.status === 'scheduled' && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                icon={<Video className="h-3 w-3" />}
                                onClick={() => window.open(appointment.meeting_url, '_blank')}
                              >
                                Join Meeting
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                icon={<ExternalLink className="h-3 w-3" />}
                                onClick={() => navigator.clipboard.writeText(appointment.meeting_url)}
                              >
                                Copy Link
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm" icon={<Edit className="h-3 w-3" />}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" icon={<Trash2 className="h-3 w-3" />}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {filter === 'all' ? '' : filter} appointments
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'upcoming' 
                  ? 'Schedule virtual meetings with your patients'
                  : `No ${filter} appointments found`
                }
              </p>
              <Button
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => setShowScheduleModal(true)}
              >
                Schedule New Meeting
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Schedule Meeting Modal */}
      <ScheduleMeeting
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  )
} 