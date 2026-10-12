import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Task 01: Read backend URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fetchMenu = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/menu`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setMenuItems(data)
    } catch (err) {
      console.error('Failed to fetch menu:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2563eb' }}>🍽️ CampusEats Portal</h1>
        <p style={{ color: '#64748b' }}>SE3090 - Lab 11 DevOps & Cloud Hosting Platforms</p>
        <div style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', display: 'inline-block', marginTop: '1rem' }}>
          <strong>Connected Backend API URL:</strong>{' '}
          <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{API_URL}</code>
        </div>
      </header>

      <section style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Campus Menu Items</h2>
          <button
            onClick={fetchMenu}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Menu'}
          </button>
        </div>

        {loading && <p style={{ color: '#64748b' }}>Fetching menu items from API...</p>}
        {error && (
          <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>⚠️ API Connection Note:</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{error}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#7f1d1d' }}>
              (If backend is still sleeping or not yet connected, this displays handled error state)
            </p>
          </div>
        )}

        {!loading && menuItems.length === 0 && !error && (
          <p style={{ color: '#94a3b8' }}>No menu items returned yet.</p>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item, index) => (
            <li
              key={item.id || index}
              style={{
                padding: '12px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontWeight: 600 }}>{item.name || item.title || `Item ${index + 1}`}</span>
              <span style={{ color: '#16a34a', fontWeight: 'bold' }}>
                {item.price ? `Rs. ${item.price}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
        Deployed with Vite + Vercel / Netlify | CI/CD Pipeline Lab
      </footer>
    </div>
  )
}

export default App
