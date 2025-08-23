'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  DollarSign, 
  Plus, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  LogOut,
  AlertCircle
} from 'lucide-react'
import { dashboardAPI, subscriptionsAPI } from '@/lib/api'
import { DashboardSummary, Subscription } from '@/types'
import AddSubscriptionModal from '@/components/AddSubscriptionModal'

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const data = await dashboardAPI.getSummary()
      setSummary(data)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionAdded = () => {
    loadDashboard() // Recargar datos cuando se agrega una suscripción
  }

  const handleDeleteSubscription = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta suscripción?')) {
      try {
        await subscriptionsAPI.delete(id)
        loadDashboard() // Recargar datos
      } catch (error) {
        console.error('Error deleting subscription:', error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const formatDate = (date: string) => {
    const renewalDate = new Date(date)
    const today = new Date()
    const diffTime = renewalDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const formattedDate = renewalDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    
    if (diffDays < 0) {
      return { text: formattedDate, status: 'expired', days: Math.abs(diffDays) }
    } else if (diffDays <= 7) {
      return { text: formattedDate, status: 'warning', days: diffDays }
    } else if (diffDays <= 30) {
      return { text: formattedDate, status: 'upcoming', days: diffDays }
    }
    
    return { text: formattedDate, status: 'normal', days: diffDays }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Entretenimiento': '🎬',
      'Productividad': '⚡',
      'Desarrollo': '💻',
      'Comunicación': '💬',
      'Almacenamiento': '☁️',
      'Fitness': '💪',
      'Música': '🎵',
      'Video': '📺',
      'Noticias': '📰',
      'Educación': '🎓',
      'Otros': '📦'
    }
    return icons[category] || '📦'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <DollarSign className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Suscrify</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Suscripción
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suscripciones</p>
                <p className="text-2xl font-bold text-gray-900">{summary?.totalSubscriptions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gasto Mensual</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalMonthlyCost || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gasto Anual</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalYearlyCost || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Próximas Renovaciones</p>
                <p className="text-2xl font-bold text-gray-900">{summary?.upcomingRenewals || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Mis Suscripciones</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {summary?.subscriptions?.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No tienes suscripciones aún</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agregar Primera Suscripción
                </button>
              </div>
            ) : (
              summary?.subscriptions?.map((subscription) => {
                const dateInfo = formatDate(subscription.renewalDate)
                return (
                  <div key={subscription.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg">
                        {getCategoryIcon(subscription.category)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{subscription.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          {subscription.category}
                          {dateInfo.status === 'warning' && (
                            <AlertCircle className="w-4 h-4 text-orange-500 ml-2" />
                          )}
                          {dateInfo.status === 'expired' && (
                            <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(subscription.price, subscription.currency)}
                          <span className="text-xs text-gray-500">/mes</span>
                        </p>
                        <p className={`text-sm ${
                          dateInfo.status === 'expired' ? 'text-red-600' :
                          dateInfo.status === 'warning' ? 'text-orange-600' :
                          dateInfo.status === 'upcoming' ? 'text-blue-600' :
                          'text-gray-500'
                        }`}>
                          {dateInfo.status === 'expired' 
                            ? `Expiró hace ${dateInfo.days} días`
                            : dateInfo.status === 'warning'
                            ? `Renueva en ${dateInfo.days} días`
                            : `Renueva: ${dateInfo.text}`
                          }
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubscription(subscription.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubscriptionAdded={handleSubscriptionAdded}
      />
    </div>
  )
}
