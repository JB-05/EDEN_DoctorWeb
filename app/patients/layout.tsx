import { ProtectedRoute } from '@/components/auth/AuthProvider'

export default function PatientsLayout({
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