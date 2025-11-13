import { useMemo, useState } from 'react'
import CryptoJS from 'crypto-js'
import './App.css'

const encryptedLinksData =
  'U2FsdGVkX18wLdqT4nNnhp/OqI/5tbS/fElJuT9/HWo6W9v6XkXHaCfqTuHMgXeBzkAXpWX0jCibJ+WFs6l+kJgRmvlBp8MwqfhyAcJSKUFrw1ht0JwL3fQkNu9VTaL9An2Xz9GOfRm10RF1bd58B695MGE8OECDyj0sbRz4R5UI3qATGbgVIPz1Dm3OQaaGD/iYtxnrWkx97XMvttQ92Qw/7NRU5z8YCqJJpsUbjdVO3kOuczRIm0EvL8Qn1/zlzwnaBATC9q93n1Qex5Atv65GvzHmESAmpVS62CtYMc0d0xtWYc2bqP33ZRgl1WNxXtOx2vt75piFMTF0f3fwxm3Nx91LQ+trmSrVcLcX7QwjXF8ry8/k0kuFLKHlw70FyMSONAFCtCui3Ku5G+Zj2nwuxkYLWyvJHMo9DDNjZTDbsiw4Vlo79sjnrmnapFD3PzHirKvB1t5gVLUrSr1jkiFCZ9OWC8VTjlEvOAXgsDYodKf6F19QXRxpO4HLrNtlSTYuwKAuOqot9Vn7V31F6X5jH9R42vO0v4J8Jzqb8aXG+gMjNRZydz356qppFSGlpz8cmCiyT4V3FEKN4Lnue1do2JFHH+lBeuWiXTxb9/xEz8N2cj2XIduWHG+Pn5oMdLNOCTzwf3xHCBMm0wmgWxClwDGRn/UrKkG1Quk5opVaUS0rj8dTF79WqXOnF6brFnan32tBaHBc5zDS0FUCyQ=='

function retrieveLinks(accessKey) {
  if (!accessKey) {
    return null
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedLinksData, accessKey)
    const decoded = bytes.toString(CryptoJS.enc.Utf8)

    if (!decoded) {
      return null
    }

    const parsed = JSON.parse(decoded)
    return Array.isArray(parsed) ? parsed : null
  } catch (error) {
    return null
  }
}

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
  const accessKey =
    typeof window !== 'undefined' ? window.localStorage.getItem('auth_key') : null
  const linksData = useMemo(() => retrieveLinks(accessKey), [accessKey])

  if (!linksData) {
    return null
  }

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

