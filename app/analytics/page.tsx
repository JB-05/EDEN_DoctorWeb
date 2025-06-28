'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Calendar, 
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react'

// Dummy data
const analyticsData = {
  overview: {
    totalPatients: 1248,
    activePatients: 892,
    adherenceRate: 87,
    criticalAlerts: 5,
    trends: {
      patients: '+12%',
      adherence: '+5%',
      alerts: '-8%'
    }
  },
  adherenceTrends: [
    { date: '2024-01', rate: 82 },
    { date: '2024-02', rate: 85 },
    { date: '2024-03', rate: 83 },
    { date: '2024-04', rate: 87 },
    { date: '2024-05', rate: 86 },
    { date: '2024-06', rate: 89 }
  ],
  medicationStats: [
    { name: 'Cardiovascular', adherence: 92, patients: 245, trend: '+3%' },
    { name: 'Diabetes', adherence: 88, patients: 178, trend: '+2%' },
    { name: 'Respiratory', adherence: 85, patients: 156, trend: '-1%' },
    { name: 'Pain Management', adherence: 79, patients: 134, trend: '+4%' }
  ],
  patientSegments: [
    { segment: 'High Adherence', percentage: 45, count: 562 },
    { segment: 'Medium Adherence', percentage: 35, count: 437 },
    { segment: 'Low Adherence', percentage: 20, count: 249 }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'alert',
      message: 'Multiple missed doses detected',
      patient: 'John Doe',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'adherence',
      message: 'Adherence rate improved to 95%',
      patient: 'Sarah Smith',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'schedule',
      message: 'New medication schedule created',
      patient: 'Mike Johnson',
      time: '2 hours ago'
    }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filterValues, setFilterValues] = useState({
    category: 'all',
    adherence: 'all',
    trend: 'all'
  })

  // Handle time range change
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value)
    refreshData(e.target.value)
  }

  // Refresh data based on time range
  const refreshData = async (range: string) => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Update data based on new time range
      // For now using the same data, but in real app this would fetch new data
      setLoading(false)
    } catch (error) {
      console.error('Error refreshing data:', error)
      setLoading(false)
    }
  }

  // Handle export data
  const handleExportData = async () => {
    try {
      // Convert data to CSV format
      const headers = ['Date', 'Rate', 'Patients', 'Category']
      const rows = analyticsData.adherenceTrends.map(trend => [
        trend.date,
        trend.rate,
        analyticsData.overview.totalPatients,
        'Adherence'
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `analytics_export_${timeRange}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Filter data based on selected filters
  const getFilteredData = useCallback(() => {
    let filtered = [...analyticsData.medicationStats]

    if (filterValues.category !== 'all') {
      filtered = filtered.filter(stat => 
        stat.name.toLowerCase() === filterValues.category.toLowerCase()
      )
    }

    if (filterValues.adherence !== 'all') {
      filtered = filtered.filter(stat => {
        if (filterValues.adherence === 'high') return stat.adherence >= 90
        if (filterValues.adherence === 'medium') return stat.adherence >= 70 && stat.adherence < 90
        return stat.adherence < 70
      })
    }

    if (filterValues.trend !== 'all') {
      filtered = filtered.filter(stat => {
        const trendValue = parseFloat(stat.trend)
        if (filterValues.trend === 'improving') return trendValue > 0
        if (filterValues.trend === 'declining') return trendValue < 0
        return trendValue === 0
      })
    }

    return filtered
  }, [filterValues])

  // Get filtered medication stats
  const filteredMedicationStats = getFilteredData()

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  Analytics Dashboard
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">
                Monitor patient adherence and medication trends
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <select
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={timeRange}
                onChange={handleTimeRangeChange}
                disabled={loading}
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
              <Button 
                variant="outline" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
                disabled={loading}
              >
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
              <Button 
                variant="primary"
                className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm"
                onClick={handleExportData}
                disabled={loading}
              >
                <Download className="h-4 w-4 mr-2" />
                <span>Export Data</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Show loading state */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Filter panel */}
        {showFilters && (
          <Card className="mb-6 bg-white">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filterValues.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="cardiovascular">Cardiovascular</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="respiratory">Respiratory</option>
                    <option value="pain">Pain Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adherence Level
                  </label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filterValues.adherence}
                    onChange={(e) => handleFilterChange('adherence', e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="high">High (≥90%)</option>
                    <option value="medium">Medium (70-89%)</option>
                    <option value="low">Low (&lt;70%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trend
                  </label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filterValues.trend}
                    onChange={(e) => handleFilterChange('trend', e.target.value)}
                  >
                    <option value="all">All Trends</option>
                    <option value="improving">Improving</option>
                    <option value="declining">Declining</option>
                    <option value="stable">Stable</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{analyticsData.overview.totalPatients}</p>
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {analyticsData.overview.trends.patients} this month
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{analyticsData.overview.activePatients}</p>
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {analyticsData.overview.trends.patients} increase
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Adherence</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{analyticsData.overview.adherenceRate}%</p>
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {analyticsData.overview.trends.adherence} improvement
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{analyticsData.overview.criticalAlerts}</p>
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {analyticsData.overview.trends.alerts} decrease
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adherence Trends & Patient Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Adherence Trends</CardTitle>
                <Badge className="bg-green-100 text-green-800">+5% vs last period</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {analyticsData.adherenceTrends.map((trend, index) => (
                  <div key={trend.date} className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">{trend.date}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-600 rounded-full"
                          style={{ width: `${trend.rate}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{trend.rate}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Patient Segments</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {analyticsData.patientSegments.map((segment) => (
                  <div key={segment.segment}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.count} patients</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          segment.segment === 'High Adherence' ? 'bg-green-500' :
                          segment.segment === 'Medium Adherence' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500 text-right">{segment.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medication Stats */}
        <Card className="bg-white mb-8">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900">Medication Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filteredMedicationStats.map((stat) => (
                <div key={stat.name} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{stat.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{stat.patients} patients</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{stat.adherence}% adherence</div>
                      <p className={`text-sm mt-1 ${
                        stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend} vs last month
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredMedicationStats.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No data matches the selected filters
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">View all</Button>
            </div>
          </CardHeader>
          <CardContent className="divide-y divide-gray-100">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'alert' ? 'bg-red-100' :
                    activity.type === 'adherence' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    {activity.type === 'adherence' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {activity.type === 'schedule' && <Calendar className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-medium text-gray-900">{activity.patient}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 