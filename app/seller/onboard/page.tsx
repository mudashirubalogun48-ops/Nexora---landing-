'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SellerOnboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    userId: '', // Will get from localStorage
    professionalTitle: '',
    bio: '',
    skills: '',
    country: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Get userId from localStorage
    const userId = localStorage.getItem('user_id')
    if (!userId) {
      setError('Please log in first')
      router.push('/login')
      return
    }

    if (!formData.professionalTitle || !formData.bio || !formData.country) {
      setError('All fields are required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/seller/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          professionalTitle: formData.professionalTitle,
          bio: formData.bio,
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
          country: formData.country,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Onboarding failed')
        return
      }

      // Save seller ID to localStorage
      localStorage.setItem('seller_id', data.seller.id)
      router.push('/seller/profile')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Seller</h1>
        <p className="text-gray-600 mb-8">Create your seller profile on NEXORA</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Title *
            </label>
            <input
              type="text"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
              placeholder="e.g., UI/UX Designer, Full-Stack Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell buyers about your experience and expertise"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Comma-separated: e.g., React, TypeScript, Figma"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            >
              <option value="">Select your country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="Ghana">Ghana</option>
              <option value="South Africa">South Africa</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 transition"
          >
            {loading ? 'Setting up...' : 'Complete Seller Onboarding'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          * Required fields
        </p>
      </div>
    </div>
  )
}
