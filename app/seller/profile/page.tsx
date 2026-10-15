'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SellerProfile {
  id: string
  user_id: string
  professional_title: string
  bio: string
  skills: string[]
  country: string
  verification_status: string
  rating: number
  total_orders: number
}

export default function SellerProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<SellerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    professionalTitle: '',
    bio: '',
    skills: '',
    country: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('user_id')
      if (!userId) {
        router.push('/login')
        return
      }

      const response = await fetch(`/api/seller/profile?userId=${userId}`)
      const data = await response.json()

      if (!response.ok) {
        router.push('/seller/onboard')
        return
      }

      setProfile(data.seller)
      setFormData({
        professionalTitle: data.seller.professional_title,
        bio: data.seller.bio,
        skills: data.seller.skills.join(', '),
        country: data.seller.country,
      })
    } catch (err) {
      console.error(err)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const userId = localStorage.getItem('user_id')
      const response = await fetch('/api/seller/profile', {
        method: 'PUT',
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
        setError(data.error || 'Failed to save profile')
        return
      }

      setProfile(data.seller)
      setEditing(false)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white">Profile not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Seller Profile</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Status Badge */}
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              profile.verification_status === 'verified'
                ? 'bg-green-100 text-green-800'
                : profile.verification_status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {profile.verification_status.charAt(0).toUpperCase() + profile.verification_status.slice(1)}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{profile.rating.toFixed(1)}</p>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{profile.total_orders}</p>
              <p className="text-gray-600 text-sm">Orders Completed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{profile.skills.length}</p>
              <p className="text-gray-600 text-sm">Skills</p>
            </div>
          </div>

          {/* Form */}
          {editing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
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
                  placeholder="Comma-separated"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Professional Title</h3>
                <p className="text-gray-900 mt-1">{profile.professional_title}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600">Bio</h3>
                <p className="text-gray-900 mt-1">{profile.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600">Country</h3>
                <p className="text-gray-900 mt-1">{profile.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
