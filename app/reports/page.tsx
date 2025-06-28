'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Badge, AdherenceBadge } from '@/components/ui/Badge'
import {
  FileText,
  Download,
  Calendar,
  Users,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Mail,
  Printer,
  BarChart2
} from 'lucide-react'

// Mock reports data
const mockReports = [
  {
    id: '1',
    title: 'Weekly Adherence Summary',
    patient_name: 'All Patients',
    report_type: 'adherence_summary',
    date_range: '2024-01-08 to 2024-01-14',
    generated_at: '2024-01-15T10:00:00Z',
    status: 'completed',
    key_metrics: {
      overall_adherence: 87,
      patients_count: 24,
      total_medications: 78,
      missed_doses: 12
    }
  },
  {
    id: '2',
    title: 'Margaret Johnson - Monthly Report',
    patient_name: 'Margaret Johnson',
    report_type: 'patient_individual',
    date_range: '2024-01-01 to 2024-01-31',
    generated_at: '2024-01-14T15:30:00Z',
    status: 'completed',
    key_metrics: {
      adherence_rate: 94,
      medications_count: 4,
      missed_doses: 2,
      symptom_reports: 1
    }
  },
  {
    id: '3',
    title: 'Low Adherence Alert Report',
    patient_name: 'Multiple Patients',
    report_type: 'adherence_alert',
    date_range: '2024-01-01 to 2024-01-15',
    generated_at: '2024-01-13T09:15:00Z',
    status: 'completed',
    key_metrics: {
      at_risk_patients: 4,
      critical_patients: 2,
      total_missed_doses: 28,
      improvement_needed: 6
    }
  }
]

const reportTypeOptions = [
  { value: 'adherence_summary', label: 'Adherence Summary' },
  { value: 'patient_individual', label: 'Individual Patient Report' },
  { value: 'adherence_alert', label: 'Low Adherence Alerts' },
  { value: 'medication_analysis', label: 'Medication Analysis' },
  { value: 'symptom_tracking', label: 'Symptom Tracking' },
  { value: 'appointment_summary', label: 'Appointment Summary' }
]

const timeRangeOptions = [
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'custom', label: 'Custom Range' }
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('existing')
  const [newReportData, setNewReportData] = useState({
    title: '',
    report_type: '',
    time_range: '',
    patient_filter: '',
    include_charts: true,
    include_recommendations: true
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Generating report:', newReportData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setNewReportData({
        title: '',
        report_type: '',
        time_range: '',
        patient_filter: '',
        include_charts: true,
        include_recommendations: true
      })
      setActiveTab('existing')
    } catch (error) {
      console.error('Report generation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setNewReportData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const getReportTypeLabel = (type: string) => {
    const option = reportTypeOptions.find(opt => opt.value === type)
    return option ? option.label : type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-healthcare-100 text-healthcare-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      reports: mockReports
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reports-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleDownloadReport = (reportId: string, reportName: string) => {
    console.log(`Downloading report: ${reportId} - ${reportName}`)
    setTimeout(() => {
      const blob = new Blob(['Sample report content'], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }, 1000)
  }

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Reports
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              Generate and analyze patient reports
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
            <Button 
              variant="primary"
              onClick={() => setShowGenerateModal(true)}
            >
              <FileText className="h-4 w-4 mr-2" />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </header>
  )

  const renderReportCategories = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Adherence Reports</h3>
              <p className="mt-1 text-sm text-gray-500">Track medication adherence</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Patient Reports</h3>
              <p className="mt-1 text-sm text-gray-500">Individual patient analysis</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              <p className="mt-1 text-sm text-gray-500">Trends and insights</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReportList = () => (
    <div className="grid grid-cols-1 gap-4">
      {mockReports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{report.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{report.patient_name}</p>
              </div>
              <Badge className={getStatusColor(report.status)}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{report.date_range}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{getReportTypeLabel(report.report_type)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                {Object.entries(report.key_metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id, report.title)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="flex-1 min-w-0">
      {renderHeader()}
      <main className="p-4 sm:p-6 lg:p-8">
        {renderReportCategories()}
        {renderReportList()}
      </main>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate New Report</h2>
            {/* Add form fields for report generation */}
            <div className="flex justify-end mt-6 space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowGenerateModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={handleGenerateReport}
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 