'use client'

import React, { useState } from 'react'
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
  FileText,
  Phone,
  Mail,
  ChevronRight,
  Clock,
  Heart
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
  const [view, setView] = useState<'grid' | 'list'>('list')

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800'
      case 'needs_attention': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
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

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 font-medical truncate">
              Patients
            </h1>
            <p className="text-gray-600 mt-1 truncate">
              Manage and monitor your patients' medication adherence
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <Button 
              variant="secondary"
              className="group hover:bg-gray-100 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2 group-hover:text-primary-600" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>
            <Button 
              variant="primary"
              className="group hover:bg-primary-700 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Patient</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const renderFilters = () => (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Search patients by name or email..."
            icon={<Search className="h-4 w-4 text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 shrink-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[120px]"
          >
            <option value="all">All Patients</option>
            <option value="stable">Stable</option>
            <option value="needs_attention">Needs Attention</option>
            <option value="critical">Critical</option>
          </select>
          <Button 
            variant="outline" 
            className="hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <div className="border-l border-gray-200 pl-2 sm:pl-3 flex items-center space-x-2">
            <Button
              variant={view === 'grid' ? 'primary' : 'outline'}
              size="sm"
              className="px-2 sm:px-3"
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={view === 'list' ? 'primary' : 'outline'}
              size="sm"
              className="px-2 sm:px-3"
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {[
        { label: 'Total Patients', value: filteredPatients.length, icon: UserPlus },
        { label: 'Critical', value: filteredPatients.filter(p => p.status === 'critical').length, icon: AlertTriangle },
        { label: 'Needs Attention', value: filteredPatients.filter(p => p.status === 'needs_attention').length, icon: Eye },
        { label: 'Stable', value: filteredPatients.filter(p => p.status === 'stable').length, icon: Heart }
      ].map((stat, index) => (
        <Card key={index} className="bg-white hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                index === 0 ? 'bg-blue-100 text-blue-600' :
                index === 1 ? 'bg-red-100 text-red-600' :
                index === 2 ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderPatientList = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adherence</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-medium">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{patient.name}</div>
                      <div className="text-sm text-gray-500">Age {patient.age}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 truncate">{patient.email}</div>
                  <div className="text-sm text-gray-500 truncate">{patient.phone}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <Badge className={getStatusColor(patient.status)}>
                    {getStatusLabel(patient.status)}
                  </Badge>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          patient.adherence_rate >= 90 ? 'bg-green-500' :
                          patient.adherence_rate >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${patient.adherence_rate}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{patient.adherence_rate}%</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 truncate">{patient.next_appointment}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="flex-1 min-w-0">
      {renderHeader()}
      <main className="p-4 sm:p-6 max-w-7xl mx-auto overflow-hidden">
        {renderFilters()}
        {renderStats()}
        {view === 'list' ? renderPatientList() : null}
      </main>
    </div>
  )
} 