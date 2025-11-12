import { useState } from 'react'
import './App.css'

const linksData = [
  {
    id: 1,
    name: 'AyurCentral Admin',
    url: 'https://admin.ayurcentral.in',
    loginUrl: 'https://admin.ayurcentral.in/login',
    username: 'admin@ayurcentral.in',
    password: 'P@ssw0rd123',
  },
  {
    id: 2,
    name: 'Grafana Dashboard',
    url: 'https://grafana.example.com',
    loginUrl: 'https://grafana.example.com/login',
    username: 'viewer',
    password: 'viewer-pass',
  },
  ,
  {
    id: 2,
    name: 'Grafana Dashboard',
    url: 'https://grafana.example.com',
    loginUrl: 'https://grafana.example.com/login',
    username: 'viewer',
    password: 'viewer-pass',
  },
]

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        alert('Failed to copy. Please copy manually: ' + text)
      }

      document.body.removeChild(textArea)
    }
  }

  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={copyToClipboard}
      title={`Copy ${label}`}
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  )
}

function App() {
  return (
    <div className="wrap">
      <h1>Project & Dashboard Links</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Login URL</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {linksData.map((link) => (
            <tr key={link.id}>
              <td data-label="Name">{link.name}</td>
              <td data-label="URL">
                <a
                  className="link"
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                >
                  {link.url}
                </a>
              </td>
              <td data-label="Login URL">
                <a
                  className="link"
                  href={link.loginUrl}
                  target="_blank"
                  rel="noopener"
                >
                  {new URL(link.loginUrl).pathname || '/login'}
                </a>
              </td>
              <td data-label="Username">
                <div className="copy-wrapper">
                  <span className="mono">{link.username}</span>
                  <CopyButton text={link.username} label="username" />
                </div>
              </td>
              <td data-label="Password">
                <div className="copy-wrapper">
                  <span className="mono">{link.password}</span>
                  <CopyButton text={link.password} label="password" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App

