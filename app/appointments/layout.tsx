import { ProtectedRoute } from '@/components/auth/AuthProvider'

export default function AppointmentsLayout({
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