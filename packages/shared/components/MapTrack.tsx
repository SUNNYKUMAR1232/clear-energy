import React from 'react';

export function MapTrack() {
  return (
    <svg viewBox="0 0 390 256" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <path d="M40 200 Q 130 180 180 140 T 280 90 T 350 50" stroke="#0F766E" strokeWidth="3" fill="none" strokeDasharray="6 4"/>
      <circle cx="40" cy="200" r="8" fill="#10b981" stroke="white" strokeWidth="3"/>
      <circle cx="180" cy="140" r="6" fill="#0F766E"/>
      <circle cx="280" cy="90" r="6" fill="#0F766E"/>
      <circle cx="350" cy="50" r="8" fill="#0F766E" stroke="white" strokeWidth="3"/>
    </svg>
  );
}
