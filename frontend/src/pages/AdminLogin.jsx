import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import Navbar from '../components/Navbar'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!form.email || !form.password) return alert('Fill all fields')
    try {
      const res = await API.post('/admin/login', form)
      localStorage.setItem('adminToken', res.data.token)
      navigate('/admin-dashboard')
    } catch (e) {
      console.error(e)
      alert('Admin login failed')
    }
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">Admin Login</h2>
        <div className="space-y-3 bg-white p-6 rounded shadow">
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="w-full bg-orange-500 text-white p-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </main>
    </div>
  )
}
