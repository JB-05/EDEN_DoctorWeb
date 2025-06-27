'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, StatusBadge, AdherenceBadge } from '@/components/ui/Badge'
import {
  Users,
  Activity,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Clock,
  Heart,
  Pill,
  Video,
  FileText,
  ChevronRight,
  Bell
} from 'lucide-react'

// Mock data - will be replaced with Supabase data
const mockStats = {
  total_patients: 24,
  active_medications: 78,
  pending_meetings: 3,
  urgent_alerts: 2,
  overall_adherence_rate: 87,
  patients_with_low_adherence: 4
}

const mockPatients = [
  {
    id: '1',
    name: 'Margaret Johnson',
    age: 72,
    adherence_rate: 94,
    total_medications: 4,
    missed_doses_today: 0,
    last_taken_time: '2024-01-15T09:30:00Z',
    upcoming_doses: 2,
    symptom_reports_count: 0
  },
  {
    id: '2',
    name: 'Robert Chen',
    age: 68,
    adherence_rate: 76,
    total_medications: 6,
    missed_doses_today: 1,
    last_taken_time: '2024-01-15T08:15:00Z',
    upcoming_doses: 3,
    symptom_reports_count: 1
  },
  {
    id: '3',
    name: 'Dorothy Williams',
    age: 84,
    adherence_rate: 91,
    total_medications: 3,
    missed_doses_today: 0,
    last_taken_time: '2024-01-15T10:00:00Z',
    upcoming_doses: 1,
    symptom_reports_count: 0
  }
]

const mockRecentAlerts = [
  {
    id: '1',
    patient_name: 'Robert Chen',
    type: 'missed_dose',
    message: 'Missed morning Metformin dose',
    timestamp: '2024-01-15T09:00:00Z',
    severity: 'medium'
  },
  {
    id: '2',
    patient_name: 'Sarah Davis',
    type: 'symptom_report',
    message: 'Reported dizziness and nausea',
    timestamp: '2024-01-15T08:45:00Z',
    severity: 'high'
  }
]

export default function DashboardPage() {
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
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back, Dr. Smith. Here's your patient overview.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="secondary" icon={<Bell className="h-4 w-4" />}>
                  Alerts ({mockStats.urgent_alerts})
                </Button>
                <Button variant="primary" icon={<Video className="h-4 w-4" />}>
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Patients"
              value={mockStats.total_patients.toString()}
              icon={<Users className="h-6 w-6" />}
              change="+2 this week"
              changeType="positive"
            />
            <StatsCard
              title="Active Medications"
              value={mockStats.active_medications.toString()}
              icon={<Pill className="h-6 w-6" />}
              change="+5 this month"
              changeType="neutral"
            />
            <StatsCard
              title="Adherence Rate"
              value={`${mockStats.overall_adherence_rate}%`}
              icon={<Activity className="h-6 w-6" />}
              change="+3% this month"
              changeType="positive"
            />
            <StatsCard
              title="Pending Meetings"
              value={mockStats.pending_meetings.toString()}
              icon={<Calendar className="h-6 w-6" />}
              change="2 today"
              changeType="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Recent Alerts
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`h-2 w-2 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-danger-500' : 
                        alert.severity === 'medium' ? 'bg-yellow-500' : 
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.patient_name}
                        </p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Overview</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Patients
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-medical-200 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-medical-100 rounded-full flex items-center justify-center">
                          <span className="text-medical-600 font-medium text-sm">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">Age {patient.age}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <AdherenceBadge rate={patient.adherence_rate} />
                          <p className="text-xs text-gray-500 mt-1">
                            {patient.total_medications} medications
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" className="h-16 justify-start" icon={<Calendar className="h-5 w-5" />}>
                <div className="ml-3 text-left">
                  <div className="font-medium">Schedule Meeting</div>
                  <div className="text-xs text-gray-600">Set up virtual consultation</div>
                </div>
              </Button>
              <Button variant="secondary" className="h-16 justify-start" icon={<FileText className="h-5 w-5" />}>
                <div className="ml-3 text-left">
                  <div className="font-medium">Generate Report</div>
                  <div className="text-xs text-gray-600">Export patient data</div>
                </div>
              </Button>
              <Button variant="secondary" className="h-16 justify-start" icon={<Heart className="h-5 w-5" />}>
                <div className="ml-3 text-left">
                  <div className="font-medium">Add Patient Note</div>
                  <div className="text-xs text-gray-600">Update medical records</div>
                </div>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, changeType }) => (
  <Card className="hover:shadow-lg transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${
              changeType === 'positive' ? 'text-healthcare-600' :
              changeType === 'negative' ? 'text-danger-600' :
              'text-gray-600'
            }`}>
              {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-medical-50 rounded-lg">
          <div className="text-medical-600">
            {icon}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
) 