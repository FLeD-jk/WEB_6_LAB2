import { useEffect, useState } from 'react'
import api from '../api/axios'

function ProfilePage() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('profiles/')
        setProfile(response.data)
      } catch (error) {
        console.error('Failed to load profile', error)
      }
    }

    fetchProfile()
  }, [])

  if (!profile) {
    return <div className="text-center text-gray-500 py-10">Loading profile...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
            {profile.user?.[0]?.toUpperCase()}
          </div>

          <div>
           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{profile.user}</h1>
            <p className="text-gray-500">User profile information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Username</span>
            <span className="font-medium">{profile.user}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Gender</span>
            <span className="font-medium">{profile.gender}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Birth Date</span>
            <span className="font-medium">{profile.birth_date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage