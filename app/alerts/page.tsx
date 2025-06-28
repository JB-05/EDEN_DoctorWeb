'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Settings,
  XCircle,
  AlertOctagon,
  BellRing,
  Calendar,
  User
} from 'lucide-react'

// Dummy data
const alertsData = {
  overview: {
    total: 8,
    critical: 2,
    warning: 3,
    info: 3,
    unread: 3
  },
  alerts: [
    {
      id: 1,
      type: 'critical',
      title: 'Missed Dose Alert',
      description: 'Patient John Doe missed their morning medication',
      patient: 'John Doe',
      time: '5 min ago',
      status: 'unread'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Supply',
      description: 'Medication supply running low for Sarah Smith',
      patient: 'Sarah Smith',
      time: '15 min ago',
      status: 'read'
    },
    {
      id: 3,
      type: 'info',
      title: 'Appointment Today',
      description: 'Follow-up appointment with Dr. Johnson at 2 PM',
      patient: 'Mike Wilson',
      time: '30 min ago',
      status: 'read'
    }
  ],
  recentActions: [
    {
      id: 1,
      action: 'Alert Resolved',
      description: 'Updated medication schedule',
      time: '10 min ago',
      user: 'Dr. Johnson'
    },
    {
      id: 2,
      action: 'Alert Created',
      description: 'New medication reminder set',
      time: '20 min ago',
      user: 'Nurse Amy'
    }
  ]
}

export default function AlertsPage() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [alerts, setAlerts] = useState(alertsData.alerts)
  const [loading, setLoading] = useState(false)

  // Handle search and filtering
  const filteredAlerts = useCallback(() => {
    return alerts.filter(alert => {
      const matchesSearch = searchQuery === '' || 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.patient.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = filterStatus === 'all' || alert.status === filterStatus
      const matchesType = filterType === 'all' || alert.type === filterType

      return matchesSearch && matchesStatus && matchesType
    })
  }, [alerts, searchQuery, filterStatus, filterType])

  // Handle mark all as read
  const handleMarkAllRead = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setAlerts(prev => prev.map(alert => ({ ...alert, status: 'read' })))
    } catch (error) {
      console.error('Error marking alerts as read:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle mark single alert as read
  const handleMarkRead = async (alertId: number) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, status: 'read' } : alert
        )
      )
    } catch (error) {
      console.error('Error marking alert as read:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle dismiss alert
  const handleDismissAlert = async (alertId: number) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    } catch (error) {
      console.error('Error dismissing alert:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle search input with debounce
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Get filtered alerts
  const displayedAlerts = filteredAlerts()
  const unreadCount = alerts.filter(alert => alert.status === 'unread').length

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'info':
        return <BellRing className="h-5 w-5 text-blue-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return null
    }
  }

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Alerts & Notifications
              </h1>
              <Badge className="ml-3 bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              Monitor and manage patient alerts and notifications
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              disabled={loading}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </Button>
            <Button 
              variant="primary"
              className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm"
              onClick={handleMarkAllRead}
              disabled={loading || unreadCount === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Mark All Read</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const renderFilters = () => (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderAlertList = () => (
    <div className="divide-y divide-gray-200">
      {displayedAlerts.map((alert) => (
        <div key={alert.id} className={`p-4 ${alert.status === 'unread' ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 pt-1">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                  {getAlertBadge(alert.type)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => handleMarkRead(alert.id)}
                    disabled={loading || alert.status === 'read'}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => handleDismissAlert(alert.id)}
                    disabled={loading}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {alert.patient}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {alert.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex-1 min-w-0">
      {renderHeader()}
      <main className="flex-1">
        {renderFilters()}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {renderAlertList()}
        </div>
      </main>
    </div>
  )
} 