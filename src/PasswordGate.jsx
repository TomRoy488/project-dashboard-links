import { useEffect, useState } from 'react';
import SHA256 from 'crypto-js/sha256';

const STORED_DIGEST = 'c1605f6b206dde29403205d78898c5be9dbab859c99ac2c451ec705cc17dcc2b';

export default function PasswordGate({ children }) {
  const [isCleared, setIsCleared] = useState(false);
  const [entryField, setEntryField] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('auth_perm') === '1') {
      setIsCleared(true);
    }
  }, []);

  const processGate = (event) => {
    event.preventDefault();
    const computed = SHA256(entryField).toString();

    if (computed === STORED_DIGEST) {
      window.localStorage.setItem('auth_perm', '1');
      setIsCleared(true);
    } else {
      window.alert('Incorrect entry. Please try again.');
      setEntryField('');
    }
  };

  if (isCleared) {
    return children;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <form
        onSubmit={processGate}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '24px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          minWidth: '280px',
        }}
      >
        <label style={{ fontSize: '14px', color: '#333333', textAlign: 'center' }}>
          Enter Access Key
        </label>
        <input
          type="password"
          value={entryField}
          onChange={(event) => setEntryField(event.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #cccccc',
            fontSize: '14px',
          }}
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}

