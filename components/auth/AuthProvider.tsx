'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  name: string
  specialization: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('AuthProvider: Initializing authentication...')
      
      try {
        // Try to get session from Supabase
        const { session } = await auth.getSession()
        
        if (session?.user) {
          console.log('AuthProvider: Found Supabase session')
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: 'Dr. ' + (session.user.user_metadata?.name || 'Doctor'),
            specialization: session.user.user_metadata?.specialization || 'General Medicine'
          })
        } else {
          // Fall back to localStorage for demo
          const savedUser = localStorage.getItem('smartmed_user')
          if (savedUser) {
            console.log('AuthProvider: Found localStorage user:', savedUser)
            const userData = JSON.parse(savedUser)
            setUser(userData)
          } else {
            console.log('AuthProvider: No user found in Supabase or localStorage')
          }
        }
      } catch (error) {
        console.log('AuthProvider: Supabase not configured, using localStorage only')
        // Fall back to localStorage for demo
        const savedUser = localStorage.getItem('smartmed_user')
        if (savedUser) {
          console.log('AuthProvider: Found localStorage user (fallback):', savedUser)
          const userData = JSON.parse(savedUser)
          setUser(userData)
        } else {
          console.log('AuthProvider: No user found anywhere')
        }
      } finally {
        console.log('AuthProvider: Initialization complete, setting loading to false')
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes (Supabase)
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('AuthProvider: Auth state changed:', event, session?.user?.email)
          if (event === 'SIGNED_IN' && session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: 'Dr. ' + (session.user.user_metadata?.name || 'Doctor'),
              specialization: session.user.user_metadata?.specialization || 'General Medicine'
            })
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            localStorage.removeItem('smartmed_user')
            router.push('/login')
          }
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.log('AuthProvider: Supabase auth listener not available')
    }
  }, [router])

  const signOut = async () => {
    console.log('AuthProvider: Signing out...')
    try {
      await auth.signOut()
    } catch (error) {
      console.log('AuthProvider: Supabase signOut not available, using localStorage')
    }
    
    // Always clear localStorage and redirect
    localStorage.removeItem('smartmed_user')
    setUser(null)
    router.push('/login')
  }

  console.log('AuthProvider: Current state - user:', user?.email, 'loading:', loading)

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
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

  console.log('ProtectedRoute: user:', user?.email, 'loading:', loading)

  useEffect(() => {
    if (!loading && !user) {
      console.log('ProtectedRoute: No user found, redirecting to login')
      router.push('/login')
    } else if (!loading && user) {
      console.log('ProtectedRoute: User authenticated:', user.email)
    }
  }, [user, loading, router])

  if (loading) {
    console.log('ProtectedRoute: Still loading...')
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
    console.log('ProtectedRoute: No user, returning null (should redirect)')
    return null
  }

  console.log('ProtectedRoute: Rendering protected content for:', user.email)
  return <>{children}</>
} 