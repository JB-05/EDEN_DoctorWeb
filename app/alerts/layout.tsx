import { ProtectedRoute } from '@/components/auth/AuthProvider'

export default function AlertsLayout({
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