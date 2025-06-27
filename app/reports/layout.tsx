import { ProtectedRoute } from '@/components/auth/AuthProvider'

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
} 