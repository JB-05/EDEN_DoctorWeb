'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge, AdherenceBadge } from '@/components/ui/Badge'
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Calendar,
  Pill,
  AlertTriangle,
  Eye,
  Edit,
  FileText
} from 'lucide-react'

// Mock patients data
const mockPatients = [
  {
    id: '1',
    name: 'Margaret Johnson',
    age: 72,
    email: 'margaret.j@email.com',
    phone: '+1 (555) 123-4567',
    adherence_rate: 94,
    total_medications: 4,
    missed_doses_week: 1,
    last_visit: '2024-01-10',
    next_appointment: '2024-01-20',
    medical_conditions: ['Diabetes', 'Hypertension'],
    status: 'stable'
  },
  {
    id: '2',
    name: 'Robert Chen',
    age: 68,
    email: 'robert.chen@email.com',
    phone: '+1 (555) 234-5678',
    adherence_rate: 76,
    total_medications: 6,
    missed_doses_week: 4,
    last_visit: '2024-01-12',
    next_appointment: '2024-01-18',
    medical_conditions: ['Heart Disease', 'High Cholesterol'],
    status: 'needs_attention'
  },
  {
    id: '3',
    name: 'Dorothy Williams',
    age: 84,
    email: 'dorothy.w@email.com',
    phone: '+1 (555) 345-6789',
    adherence_rate: 91,
    total_medications: 3,
    missed_doses_week: 0,
    last_visit: '2024-01-08',
    next_appointment: '2024-01-25',
    medical_conditions: ['Arthritis', 'Osteoporosis'],
    status: 'stable'
  },
  {
    id: '4',
    name: 'James Wilson',
    age: 75,
    email: 'james.wilson@email.com',
    phone: '+1 (555) 456-7890',
    adherence_rate: 58,
    total_medications: 7,
    missed_doses_week: 6,
    last_visit: '2024-01-05',
    next_appointment: '2024-01-16',
    medical_conditions: ['COPD', 'Diabetes', 'Hypertension'],
    status: 'critical'
  }
]

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-healthcare-100 text-healthcare-800'
      case 'needs_attention': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'stable': return 'Stable'
      case 'needs_attention': return 'Needs Attention'
      case 'critical': return 'Critical'
      default: return 'Unknown'
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
                  Patients
                </h1>
                <p className="text-gray-600">
                  Manage and monitor your patients' medication adherence
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="secondary" icon={<FileText className="h-4 w-4" />}>
                  Export Report
                </Button>
                <Button variant="primary" icon={<UserPlus className="h-4 w-4" />}>
                  Add Patient
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients by name or email..."
                icon={<Search className="h-4 w-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="medical-input w-auto"
              >
                <option value="all">All Patients</option>
                <option value="stable">Stable</option>
                <option value="needs_attention">Needs Attention</option>
                <option value="critical">Critical</option>
              </select>
              <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
                More Filters
              </Button>
            </div>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center">
                        <span className="text-medical-600 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{patient.name}</CardTitle>
                        <p className="text-sm text-gray-500">Age {patient.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {getStatusLabel(patient.status)}
                      </Badge>
                      <Button variant="outline" size="sm" className="p-1">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Adherence Rate */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Adherence Rate</span>
                      <AdherenceBadge rate={patient.adherence_rate} />
                    </div>

                    {/* Medications */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Pill className="h-4 w-4 mr-1" />
                        Medications
                      </span>
                      <span className="text-sm font-medium">{patient.total_medications}</span>
                    </div>

                    {/* Missed Doses */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Missed This Week
                      </span>
                      <span className={`text-sm font-medium ${
                        patient.missed_doses_week > 2 ? 'text-danger-600' : 'text-gray-900'
                      }`}>
                        {patient.missed_doses_week}
                      </span>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Conditions</span>
                      <div className="flex flex-wrap gap-1">
                        {patient.medical_conditions.map((condition, index) => (
                          <Badge key={index} variant="default" size="sm">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Next Appointment */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Next Visit
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(patient.next_appointment).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">{patient.email}</p>
                      <p className="text-xs text-gray-500">{patient.phone}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="primary" size="sm" fullWidth icon={<Eye className="h-3 w-3" />}>
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" icon={<Calendar className="h-3 w-3" />}>
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm" icon={<Edit className="h-3 w-3" />}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button variant="primary" icon={<UserPlus className="h-4 w-4" />}>
                Add Your First Patient
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 