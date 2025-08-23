'use client'

import { useState, useEffect } from 'react'
import { X, Plus, DollarSign, Calendar, Tag, Search } from 'lucide-react'
import { subscriptionsAPI, preloadedSubscriptionsAPI } from '@/lib/api'
import { CreateSubscriptionDto, PreloadedSubscription } from '@/types'

interface AddSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscriptionAdded: () => void
}

export default function AddSubscriptionModal({ isOpen, onClose, onSubscriptionAdded }: AddSubscriptionModalProps) {
  const [formData, setFormData] = useState<CreateSubscriptionDto>({
    name: '',
    price: 0,
    currency: 'USD',
    category: 'Entretenimiento',
    renewalDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreloaded, setShowPreloaded] = useState(true)
  const [preloadedSubscriptions, setPreloadedSubscriptions] = useState<PreloadedSubscription[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'Entretenimiento', 'Productividad', 'Desarrollo', 'Comunicación', 'Almacenamiento',
    'Fitness', 'Música', 'Video', 'Noticias', 'Educación', 'Otros'
  ]
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'ARS', 'MXN']

  // Cargar suscripciones predefinidas
  useEffect(() => {
    if (isOpen) {
      loadPreloadedSubscriptions()
    }
  }, [isOpen])

  const loadPreloadedSubscriptions = async () => {
    try {
      const data = await preloadedSubscriptionsAPI.getAll()
      setPreloadedSubscriptions(data)
    } catch (error) {
      console.error('Error loading preloaded subscriptions:', error)
    }
  }

  // Filtrar suscripciones predefinidas
  const filteredPreloaded = preloadedSubscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePreloadedSelect = (preloaded: PreloadedSubscription) => {
    setFormData(prev => ({
      ...prev,
      name: preloaded.name,
      category: preloaded.category
    }))
    setShowPreloaded(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await subscriptionsAPI.create(formData)
      onSubscriptionAdded()
      onClose()
      setFormData({
        name: '',
        price: 0,
        currency: 'USD',
        category: 'Entretenimiento',
        renewalDate: ''
      })
      setShowPreloaded(true)
      setSearchTerm('')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al crear la suscripción')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateSubscriptionDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Nueva Suscripción</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Toggle between preloaded and custom */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                showPreloaded ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setShowPreloaded(true)}
            >
              Servicios Populares
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !showPreloaded ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setShowPreloaded(false)}
            >
              Personalizado
            </button>
          </div>

          {showPreloaded ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar Netflix, Spotify, etc..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Preloaded subscriptions grid */}
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {filteredPreloaded.map((preloaded) => (
                  <button
                    key={preloaded.id}
                    type="button"
                    onClick={() => handlePreloadedSelect(preloaded)}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm mr-3">
                      {preloaded.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{preloaded.name}</p>
                      <p className="text-xs text-gray-500 truncate">{preloaded.category}</p>
                    </div>
                  </button>
                ))}
              </div>

              {filteredPreloaded.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron servicios. Prueba con otro término o usa "Personalizado".
                </div>
              )}
            </div>
          ) : null}

          {/* Resto del formulario */}
          {(!showPreloaded || formData.name) && (
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la suscripción *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ej. Netflix, Spotify, Adobe Creative Cloud..."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Precio y Moneda */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Precio mensual *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9.99"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Moneda
                  </label>
                  <select
                    id="currency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    id="category"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fecha de renovación */}
              <div>
                <label htmlFor="renewalDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Próxima fecha de renovación *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="renewalDate"
                    type="date"
                    required
                    min={getMinDate()}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.renewalDate}
                    onChange={(e) => handleInputChange('renewalDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Suscripción
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
