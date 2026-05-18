import { useEffect, useState } from 'react'
import api from '../api/axios'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  // ---------------- REST ----------------
  const fetchTasks = async () => {
    try {
      const response = await api.get('tasks/')
      setTasks(response.data)
    } catch (error) {
      console.error('Failed to load tasks', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    try {
      await api.post('tasks/', {
        title,
        description: '',
        is_completed: false,
      })

      setTitle('')
      fetchTasks()
    } catch (error) {
      console.error('Failed to create task', error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`tasks/${id}/`)
      fetchTasks()
    } catch (error) {
      console.error('Failed to delete task', error)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      await api.put(`tasks/${task.id}/`, {
        ...task,
        is_completed: !task.is_completed,
      })

      fetchTasks()
    } catch (error) {
      console.error('Failed to update task', error)
    }
  }

  // ---------------- LOAD TASKS ----------------
  useEffect(() => {
    fetchTasks()
  }, [])

  // ---------------- WEBSOCKET ----------------
  useEffect(() => {
    const email = localStorage.getItem("email")

    console.log("WS EMAIL:", email)

    if (!email) {
      console.log("NO EMAIL -> WS NOT STARTED")
      return
    }

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/tasks/?email=${email}`
    )

    ws.onopen = () => {
      console.log("WS CONNECTED")
    }

    ws.onmessage = (e) => {
      console.log("WS:", JSON.parse(e.data))
    }

    ws.onclose = () => {
      console.log("WS CLOSED")
    }

    return () => ws.close()
  }, [])

  // ---------------- UI ----------------
  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleCreateTask}
        className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex gap-3"
      >
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <button className="bg-blue-600 text-white px-6 rounded-xl">
          Add
        </button>
      </form>

      {/* TASKS */}
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl flex justify-between"
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => handleToggleComplete(task)}
                />

                <span
                  className={
                    task.is_completed ? 'line-through text-gray-400' : ''
                  }
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TasksPage