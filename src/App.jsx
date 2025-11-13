import { useMemo, useState } from 'react'
import CryptoJS from 'crypto-js'
import './App.css'

const encryptedLinksData =
  'U2FsdGVkX1+ulhgGu595qG20FsXSwxKUys3UZjecoXMqZ2DzX+kynm5OVbouX/DDftAzoqbwe/ZCn2luNqw5FBZGwhqVHlH+HO6rzPxBbg2RysvfzycbFCVRnklR7D2l4iG/1Z7DNAsUD33WWdGcfL6uwoScqVCVI/qNPWAqgGAjJ/wcGaLZlClVSvD5QJH4VkKmv9Ic3d3hnzX3lNPRZaXtLUr+PBRvpTJBwBlv00PEYVkTtpr1hG77+DtRGznMGFI15LRdO1WjW8NsKOSMs6XgY9p4PyJx2S86xPOawQ2QM63h7HKs1mUi9JRiN8GDN9qbd1KMzAYBSnlIMrgp36tpvrPK1plqs48EufTF32AAuzpYdPTNU1ckoGHb94k5ROsWud9ca7KSQy2pyEY8KmnkUBt3zOp6VGqFCyJleCZDwdTnJO3ViQdMuv6Q6sRlhMuA1IbTKWPX/zw3sJYJyPCQxDWyrZl+AGGFPB/2td1CpIcYTQ3JGFPrgsQsnx1rxA6EiUxP1VeUvv173v5THhk/x85GqKObphhouKXHgF6Bd54ewZDY6OycJwjTBQL1L1mPUm3MNWVfeOIYXMWK8xWYMKAnL3egE3FT5ltsSR7zZNjjh8nHt20Ta42LA+Sl07YgFVOqkShP5Qtd0ZVJp1Tw9JuC5J4OQiclsevemunH7WFtT+Jaa90goAEIf1+Gdzn0ODBn68O1yIi+mxwEqHeo2hWpH7f6GrZo/qTaEutcmT4ThkM+HVftL2PUrMOykk2uOhWOT5VKzC7YA6GeLQ6xZ6QJRFu4Qyil/Q6rM1ed6AUo6yguKW16oMjzufXm97FDeteLmShfGjlso75f+oApSStF9/JIFWlCxVodAdiXdVIvEzh2rr+5HS0953DdiNXgmeVMalCj5JN5HumH4/R1oeni44JmTQyh1teHXA8='

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

