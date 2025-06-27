'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
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
  Printer
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

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement report generation
      console.log('Generating report:', newReportData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form and switch to existing reports
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
                  Reports & Analytics
                </h1>
                <p className="text-gray-600">
                  Generate comprehensive reports and track patient medication adherence
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="secondary" icon={<Printer className="h-4 w-4" />}>
                  Print Options
                </Button>
                <Button variant="primary" icon={<FileText className="h-4 w-4" />} onClick={() => setActiveTab('generate')}>
                  Generate New Report
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <nav className="bg-white border-b border-gray-200">
          <div className="px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('existing')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'existing'
                    ? 'border-medical-500 text-medical-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Existing Reports
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'generate'
                    ? 'border-medical-500 text-medical-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === 'existing' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search reports..."
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    options={[
                      { value: 'all', label: 'All Types' },
                      ...reportTypeOptions
                    ]}
                  />
                  <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {report.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {report.date_range}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {report.patient_name}
                            </span>
                            <Badge variant="default">
                              {getReportTypeLabel(report.report_type)}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {report.report_type === 'adherence_summary' && (
                          <>
                            <div className="text-center p-3 bg-medical-50 rounded-lg">
                              <div className="text-2xl font-bold text-medical-600">
                                {report.key_metrics.overall_adherence}%
                              </div>
                              <div className="text-xs text-gray-600">Overall Adherence</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-gray-900">
                                {report.key_metrics.patients_count}
                              </div>
                              <div className="text-xs text-gray-600">Patients</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-gray-900">
                                {report.key_metrics.total_medications}
                              </div>
                              <div className="text-xs text-gray-600">Medications</div>
                            </div>
                            <div className="text-center p-3 bg-danger-50 rounded-lg">
                              <div className="text-2xl font-bold text-danger-600">
                                {report.key_metrics.missed_doses}
                              </div>
                              <div className="text-xs text-gray-600">Missed Doses</div>
                            </div>
                          </>
                        )}

                        {report.report_type === 'patient_individual' && (
                          <>
                            <div className="text-center p-3 bg-medical-50 rounded-lg">
                              <div className="text-2xl font-bold text-medical-600">
                                {report.key_metrics.adherence_rate}%
                              </div>
                              <div className="text-xs text-gray-600">Adherence Rate</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-gray-900">
                                {report.key_metrics.medications_count}
                              </div>
                              <div className="text-xs text-gray-600">Medications</div>
                            </div>
                            <div className="text-center p-3 bg-danger-50 rounded-lg">
                              <div className="text-2xl font-bold text-danger-600">
                                {report.key_metrics.missed_doses}
                              </div>
                              <div className="text-xs text-gray-600">Missed Doses</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-600">
                                {report.key_metrics.symptom_reports}
                              </div>
                              <div className="text-xs text-gray-600">Symptom Reports</div>
                            </div>
                          </>
                        )}

                        {report.report_type === 'adherence_alert' && (
                          <>
                            <div className="text-center p-3 bg-danger-50 rounded-lg">
                              <div className="text-2xl font-bold text-danger-600">
                                {report.key_metrics.critical_patients}
                              </div>
                              <div className="text-xs text-gray-600">Critical</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-600">
                                {report.key_metrics.at_risk_patients}
                              </div>
                              <div className="text-xs text-gray-600">At Risk</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-gray-900">
                                {report.key_metrics.total_missed_doses}
                              </div>
                              <div className="text-xs text-gray-600">Missed Doses</div>
                            </div>
                            <div className="text-center p-3 bg-medical-50 rounded-lg">
                              <div className="text-2xl font-bold text-medical-600">
                                {report.key_metrics.improvement_needed}
                              </div>
                              <div className="text-xs text-gray-600">Need Improvement</div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Generated on {new Date(report.generated_at).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" icon={<Eye className="h-3 w-3" />}>
                            View
                          </Button>
                          <Button variant="outline" size="sm" icon={<Download className="h-3 w-3" />}>
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm" icon={<Mail className="h-3 w-3" />}>
                            Email
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Report</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Create comprehensive reports on patient medication adherence and health outcomes
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerateReport} className="space-y-6">
                    <Input
                      name="title"
                      label="Report Title"
                      placeholder="Weekly Adherence Summary - January 2024"
                      value={newReportData.title}
                      onChange={handleChange}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        name="report_type"
                        label="Report Type"
                        options={[{ value: '', label: 'Select report type...' }, ...reportTypeOptions]}
                        value={newReportData.report_type}
                        onChange={handleChange}
                        required
                      />
                      <Select
                        name="time_range"
                        label="Time Range"
                        options={[{ value: '', label: 'Select time range...' }, ...timeRangeOptions]}
                        value={newReportData.time_range}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Input
                      name="patient_filter"
                      label="Patient Filter (Optional)"
                      placeholder="All patients, specific patient, or condition-based filter"
                      value={newReportData.patient_filter}
                      onChange={handleChange}
                    />

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Report Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="include_charts"
                            name="include_charts"
                            type="checkbox"
                            checked={newReportData.include_charts}
                            onChange={handleChange}
                            className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                          />
                          <label htmlFor="include_charts" className="ml-3 block text-sm text-gray-900">
                            Include charts and visualizations
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="include_recommendations"
                            name="include_recommendations"
                            type="checkbox"
                            checked={newReportData.include_recommendations}
                            onChange={handleChange}
                            className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                          />
                          <label htmlFor="include_recommendations" className="ml-3 block text-sm text-gray-900">
                            Include AI-generated recommendations
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-medical-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-medical-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">Report Preview</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Reports will include patient adherence metrics, trend analysis, medication effectiveness, 
                            and personalized recommendations for improving patient outcomes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={() => setActiveTab('existing')}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                        icon={!loading ? <FileText className="h-4 w-4" /> : undefined}
                      >
                        {loading ? 'Generating Report...' : 'Generate Report'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 