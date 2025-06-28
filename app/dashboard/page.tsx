'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Bell, Calendar, ChevronRight, Users, Activity, Video } from 'lucide-react'
import { ScheduleMeeting } from '@/components/modals/ScheduleMeeting'

export default function DashboardPage() {
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Missed Medication Alert',
      message: 'Patient John Doe missed their morning medication',
      time: '10 minutes ago',
      type: 'alert'
    },
    {
      id: 2,
      title: 'Upcoming Appointment',
      message: 'Meeting with Sarah Johnson in 30 minutes',
      time: '30 minutes ago',
      type: 'appointment'
    },
    {
      id: 3,
      title: 'New Report Available',
      message: 'Monthly adherence report is ready for review',
      time: '1 hour ago',
      type: 'report'
    }
  ])

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const handleNewMeeting = () => {
    setShowMeetingModal(true)
  }

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Welcome Back, Dr. Smith
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              Here's what's happening with your patients today
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <Button 
                variant="outline" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={handleNotificationClick}
              >
                <Bell className="h-4 w-4 mr-2" />
                <span>Notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-3 ${
                            notification.type === 'alert' ? 'bg-red-100' :
                            notification.type === 'appointment' ? 'bg-blue-100' :
                            'bg-green-100'
                          }`}>
                            {notification.type === 'alert' && <Bell className="h-4 w-4 text-red-600" />}
                            {notification.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-600" />}
                            {notification.type === 'report' && <ChevronRight className="h-4 w-4 text-green-600" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setNotifications([])}
                    >
                      Clear all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button 
              variant="primary"
              onClick={handleNewMeeting}
            >
              <Video className="h-4 w-4 mr-2" />
              <span>New Meeting</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const renderStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">1,284</p>
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <span className="text-green-500">↑</span> 12% increase
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Treatments</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">842</p>
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <span className="text-green-500">↑</span> 8% increase
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
              <p className="mt-2 text-sm text-yellow-600 flex items-center">
                <span className="text-yellow-500">→</span> On track
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">3</p>
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="text-red-500">!</span> Needs attention
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderActivity = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">No upcoming appointments</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex-1 min-w-0">
      {renderHeader()}
      <main className="p-4 sm:p-6 lg:p-8">
        {renderStats()}
        {renderActivity()}
      </main>
      <ScheduleMeeting
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />
    </div>
  )
} 