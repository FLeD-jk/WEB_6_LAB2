import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between sm:items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          To-Do App
        </Link>

        <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-sm sm:text-base">
          <Link
            to="/"
            className="px-3 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Tasks
          </Link>

          <Link
            to="/about"
            className="px-3 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            About
          </Link>

          {token ? (
            <>
              <Link
                to="/profile"
                className="px-3 py-2 rounded-xl hover:bg-gray-100 transition font-medium"
              >
                {username}
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar