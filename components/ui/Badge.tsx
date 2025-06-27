import React from 'react'
import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'taken' | 'missed' | 'pending' | 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variantClasses = {
    taken: 'bg-healthcare-100 text-healthcare-800',
    missed: 'bg-danger-100 text-danger-800',
    pending: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-healthcare-100 text-healthcare-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-danger-100 text-danger-800'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// Specific status badges for medication tracking
export const StatusBadge: React.FC<{ status: 'taken' | 'missed' | 'pending' | 'skipped' }> = ({ status }) => {
  const statusConfig = {
    taken: { variant: 'taken' as const, label: 'Taken', icon: '✓' },
    missed: { variant: 'missed' as const, label: 'Missed', icon: '✗' },
    pending: { variant: 'pending' as const, label: 'Pending', icon: '⏰' },
    skipped: { variant: 'warning' as const, label: 'Skipped', icon: '⊘' }
  }
  
  const config = statusConfig[status]
  
  return (
    <Badge variant={config.variant}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  )
}

// Adherence rate badge
export const AdherenceBadge: React.FC<{ rate: number }> = ({ rate }) => {
  let variant: 'success' | 'warning' | 'danger' = 'success'
  let label = 'Excellent'
  
  if (rate < 70) {
    variant = 'danger'
    label = 'Poor'
  } else if (rate < 85) {
    variant = 'warning'
    label = 'Fair'
  }
  
  return (
    <Badge variant={variant}>
      {rate.toFixed(0)}% {label}
    </Badge>
  )
} 