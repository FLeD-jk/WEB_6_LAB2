import { useEffect, useState } from 'react'
import api from '../api/axios'

function AboutPage() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get('about/')
        setAbout(response.data)
      } catch (error) {
        console.error('Failed to load about info', error)
      }
    }

    fetchAbout()
  }, [])

  if (!about) {
    return <div className="text-center text-gray-500 py-10">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
        <img
          src={about.logo}
          alt={about.name}
          className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-sm"
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{about.name}</h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {about.description}
        </p>
      </div>
    </div>
  )
}

export default AboutPage