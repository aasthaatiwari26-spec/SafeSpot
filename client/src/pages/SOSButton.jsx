import React, { useState } from 'react';
import './SOSButton.css';

function SOSButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const triggerSOS = () => {
    setLoading(true);
    setStatus('📍 Getting location...');

    // Browser se GPS location fetch karna
    if (!navigator.geolocation) {
      setStatus('❌ Geolocation not supported');
      setLoading(false);
      clearStatus();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setStatus('Sending Alert...');

        try {
          const response = await fetch('http://https://safespot-backend-ltud.onrender.com/api/incidents/sos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          });

          if (response.ok) {
            setStatus('SOS SENT! ✅');
          } else {
            setStatus('Failed to send');
          }
        } catch (error) {
          console.error('SOS Error:', error);
          setStatus('Network Error');
        } finally {
          setLoading(false);
          clearStatus();
        }
      },
      (error) => {
        console.error('Location Error:', error);
        setStatus(' Location Access Denied');
        setLoading(false);
        clearStatus();
      }
    );
  };

  const clearStatus = () => {
    // 4 seconds baad status message hata do
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <div className="sos-container">
      <button 
        className="sos-button" 
        onClick={triggerSOS}
        disabled={loading}
      >
        {loading ? '...' : 'SOS'}
      </button>
      {status && <div className="sos-status">{status}</div>}
    </div>
  );
}

export default SOSButton;