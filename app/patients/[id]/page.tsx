'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  ArrowLeft
} from 'lucide-react'

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = params.id

  // This would normally fetch from an API
  const patient = {
    id: patientId,
    name: 'John Doe',
    age: 45,
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    nextAppointment: '2024-01-20',
    lastVisit: '2024-01-10'
  }

  return (
    <div className="flex-1 min-w-0">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Details
            </h1>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{patient.name}</h2>
                  <p className="text-gray-500">Age: {patient.age}</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Next Appointment: {patient.nextAppointment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 