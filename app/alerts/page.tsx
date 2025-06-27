'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  AlertTriangle,
  Clock,
  Pill,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Bell,
  Filter,
  Search
} from 'lucide-react'

// Mock alerts data
const mockAlerts = [
  {
    id: '1',
    type: 'critical',
    title: 'Medication Not Taken - Critical',
    message: 'Margaret Johnson missed her heart medication (Lisinopril) scheduled for 8:00 AM',
    patient_name: 'Margaret Johnson',
    patient_id: '1',
    medication: 'Lisinopril 10mg',
    time: '2024-01-15T08:00:00Z',
    status: 'unread',
    priority: 'high'
  },
  {
    id: '2',
    type: 'adherence',
    title: 'Low Adherence Alert',
    message: 'Robert Chen has missed 3 doses in the last 7 days (adherence: 57%)',
    patient_name: 'Robert Chen',
    patient_id: '2',
    medication: 'Multiple medications',
    time: '2024-01-15T07:30:00Z',
    status: 'unread',
    priority: 'high'
  },
  {
    id: '3',
    type: 'appointment',
    title: 'Missed Virtual Appointment',
    message: 'Sarah Williams did not join her scheduled appointment at 2:00 PM',
    patient_name: 'Sarah Williams',
    patient_id: '3',
    medication: 'N/A',
    time: '2024-01-15T14:15:00Z',
    status: 'read',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'medication',
    title: 'Pill Verification Failed',
    message: 'David Miller\'s pill verification failed - possible wrong medication',
    patient_name: 'David Miller',
    patient_id: '4',
    medication: 'Metformin 500mg',
    time: '2024-01-15T12:45:00Z',
    status: 'unread',
    priority: 'high'
  },
  {
    id: '5',
    type: 'symptom',
    title: 'New Symptom Report',
    message: 'Linda Davis reported severe headache and dizziness',
    patient_name: 'Linda Davis',
    patient_id: '5',
    medication: 'Amlodipine 5mg',
    time: '2024-01-15T11:20:00Z',
    status: 'read',
    priority: 'medium'
  }
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState('all')

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'read' } : alert
    ))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, status: 'read' })))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5" />
      case 'adherence': return <Clock className="h-5 w-5" />
      case 'medication': return <Pill className="h-5 w-5" />
      case 'appointment': return <Calendar className="h-5 w-5" />
      case 'symptom': return <Users className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getAlertColors = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'bg-danger-50 border-danger-200 text-danger-800'
    }
    if (priority === 'medium') {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    }
    return 'bg-gray-50 border-gray-200 text-gray-800'
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    if (filter === 'unread') return alert.status === 'unread'
    return alert.type === filter
  })

  const unreadCount = alerts.filter(alert => alert.status === 'unread').length

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
                  Alerts & Notifications
                </h1>
                <p className="text-gray-600">
                  Monitor critical patient events and medication adherence issues
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="danger" className="px-3 py-1">
                  {unreadCount} Unread
                </Badge>
                <Button variant="outline" onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Alerts', count: alerts.length },
                { value: 'unread', label: 'Unread', count: unreadCount },
                { value: 'critical', label: 'Critical', count: alerts.filter(a => a.type === 'critical').length },
                { value: 'adherence', label: 'Adherence', count: alerts.filter(a => a.type === 'adherence').length },
                { value: 'medication', label: 'Medication', count: alerts.filter(a => a.type === 'medication').length },
                { value: 'appointment', label: 'Appointments', count: alerts.filter(a => a.type === 'appointment').length }
              ].map((filterOption) => (
                <Button
                  key={filterOption.value}
                  variant={filter === filterOption.value ? 'primary' : 'outline'}
                  onClick={() => setFilter(filterOption.value)}
                  className="text-sm"
                >
                  {filterOption.label} ({filterOption.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <main className="p-6">
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-healthcare-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                  <p className="text-gray-600">
                    {filter === 'all' ? 'All your patients are doing well!' : `No ${filter} alerts at the moment.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAlerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`transition-all duration-200 hover:shadow-md ${
                    alert.status === 'unread' ? 'border-l-4 border-l-medical-500 bg-medical-25' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${getAlertColors(alert.type, alert.priority)}`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            {alert.status === 'unread' && (
                              <div className="w-2 h-2 bg-medical-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {alert.patient_name}
                            </span>
                            {alert.medication !== 'N/A' && (
                              <span className="flex items-center">
                                <Pill className="h-4 w-4 mr-1" />
                                {alert.medication}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(alert.time).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge 
                          variant={alert.priority === 'high' ? 'danger' : alert.priority === 'medium' ? 'warning' : 'default'}
                        >
                          {alert.priority}
                        </Badge>
                        <div className="flex space-x-1">
                          {alert.status === 'unread' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(alert.id)}
                              icon={<CheckCircle className="h-3 w-3" />}
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => window.location.href = `/patients/${alert.patient_id}`}
                          >
                            View Patient
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 