'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { Badge, AdherenceBadge } from '@/components/ui/Badge'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Pill,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

// Mock analytics data
const mockMetrics = {
  overall_adherence: 87,
  adherence_trend: '+3.2%',
  active_patients: 24,
  patients_trend: '+2',
  total_medications: 78,
  medications_trend: '+5',
  missed_doses_today: 4,
  missed_trend: '-2'
}

const mockAdherenceData = [
  { date: '2024-01-08', adherence_rate: 89, total_doses: 156, taken_doses: 139, missed_doses: 17 },
  { date: '2024-01-09', adherence_rate: 92, total_doses: 158, taken_doses: 145, missed_doses: 13 },
  { date: '2024-01-10', adherence_rate: 85, total_doses: 160, taken_doses: 136, missed_doses: 24 },
  { date: '2024-01-11', adherence_rate: 94, total_doses: 155, taken_doses: 146, missed_doses: 9 },
  { date: '2024-01-12', adherence_rate: 88, total_doses: 162, taken_doses: 143, missed_doses: 19 },
  { date: '2024-01-13', adherence_rate: 91, total_doses: 159, taken_doses: 145, missed_doses: 14 },
  { date: '2024-01-14', adherence_rate: 87, total_doses: 161, taken_doses: 140, missed_doses: 21 }
]

const mockPatientDistribution = [
  { category: 'Excellent (90-100%)', count: 12, percentage: 50, color: 'bg-healthcare-500' },
  { category: 'Good (75-89%)', count: 8, percentage: 33, color: 'bg-medical-500' },
  { category: 'Fair (60-74%)', count: 3, percentage: 13, color: 'bg-yellow-500' },
  { category: 'Poor (< 60%)', count: 1, percentage: 4, color: 'bg-danger-500' }
]

const mockMedicationTypes = [
  { name: 'Cardiovascular', patients: 15, adherence: 89, trend: '+2%' },
  { name: 'Diabetes', patients: 12, adherence: 91, trend: '+4%' },
  { name: 'Hypertension', patients: 18, adherence: 85, trend: '-1%' },
  { name: 'Mental Health', patients: 8, adherence: 82, trend: '+1%' },
  { name: 'Pain Management', patients: 6, adherence: 79, trend: '-3%' }
]

const timeRangeOptions = [
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'last_year', label: 'Last Year' }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('last_7_days')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value)
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
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Comprehensive insights into patient medication adherence and trends
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  options={timeRangeOptions}
                />
                <Button 
                  variant="outline" 
                  icon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  Refresh
                </Button>
                <Button variant="primary" icon={<Download className="h-4 w-4" />}>
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Adherence</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{mockMetrics.overall_adherence}%</p>
                    <p className="text-sm text-healthcare-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {mockMetrics.adherence_trend} this week
                    </p>
                  </div>
                  <div className="p-3 bg-medical-50 rounded-lg">
                    <Activity className="h-6 w-6 text-medical-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Patients</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{mockMetrics.active_patients}</p>
                    <p className="text-sm text-healthcare-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {mockMetrics.patients_trend} this month
                    </p>
                  </div>
                  <div className="p-3 bg-healthcare-50 rounded-lg">
                    <Users className="h-6 w-6 text-healthcare-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Medications</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{mockMetrics.total_medications}</p>
                    <p className="text-sm text-healthcare-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {mockMetrics.medications_trend} this month
                    </p>
                  </div>
                  <div className="p-3 bg-medical-50 rounded-lg">
                    <Pill className="h-6 w-6 text-medical-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Missed Doses Today</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{mockMetrics.missed_doses_today}</p>
                    <p className="text-sm text-healthcare-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {mockMetrics.missed_trend} vs yesterday
                    </p>
                  </div>
                  <div className="p-3 bg-danger-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-danger-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Adherence Trend Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 text-medical-600 mr-2" />
                    Adherence Trend
                  </CardTitle>
                  <Badge variant="default">7 Days</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdherenceData.map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="w-48 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-medical-600 h-2 rounded-full" 
                            style={{ width: `${day.adherence_rate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {day.adherence_rate}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-medical-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Average adherence rate: <span className="font-medium text-gray-900">89.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 text-medical-600 mr-2" />
                  Patient Adherence Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatientDistribution.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category.category}</div>
                          <div className="text-xs text-gray-500">{category.count} patients</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex rounded-lg overflow-hidden h-3">
                    {mockPatientDistribution.map((category, index) => (
                      <div
                        key={index}
                        className={category.color}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medication Categories Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 text-medical-600 mr-2" />
                Adherence by Medication Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMedicationTypes.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-medical-200 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium text-gray-900">{medication.name}</div>
                        <div className="text-sm text-gray-500">{medication.patients} patients</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <AdherenceBadge rate={medication.adherence} />
                        <div className={`text-xs mt-1 ${
                          medication.trend.startsWith('+') ? 'text-healthcare-600' : 'text-danger-600'
                        }`}>
                          {medication.trend} vs last period
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-healthcare-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-healthcare-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Positive Trend</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Overall adherence has improved by 3.2% this week. Cardiovascular and diabetes medications show the highest compliance rates.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingDown className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Pain management medications have the lowest adherence rate (79%). Consider scheduling follow-up appointments with these patients.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-medical-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-medical-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Recommendation</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Schedule virtual consultations with the 4 patients showing poor adherence rates. Focus on addressing barriers to medication compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 