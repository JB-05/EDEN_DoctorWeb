'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  specialization: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => void
  signIn: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log('AuthProvider: Component mounting...')
  
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log('AuthProvider: Initializing...')
    // Check localStorage for existing user
    const savedUser = localStorage.getItem('smartmed_user')
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        console.log('AuthProvider: Restored user from storage:', userData.email)
      } catch (error) {
        console.error('AuthProvider: Error parsing stored user data')
        localStorage.removeItem('smartmed_user')
      }
    } else {
      console.log('AuthProvider: No stored user found')
    }
    
    setLoading(false)
  }, [])

  const signIn = (email: string, password: string) => {
    // For demo purposes, create a mock user
    const userData = {
      id: '1',
      email: email,
      name: 'Dr. ' + email.split('@')[0],
      specialization: 'General Medicine'
    }
    
    setUser(userData)
    localStorage.setItem('smartmed_user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('smartmed_user')
    router.push('/login')
  }

  // Log state changes
  useEffect(() => {
    console.log('AuthProvider: State updated -', { user: user?.email, loading })
  }, [user, loading])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log('ProtectedRoute: No user found, redirecting to login')
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
} 