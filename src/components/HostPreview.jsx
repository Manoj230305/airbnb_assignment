import React from 'react';
import './HostPreview.css';

export default function HostPreview({ host, onScrollToHost }) {
  return (
    <div className="host-preview-section" onClick={onScrollToHost} role="button" tabIndex={0}>
      <div className="host-avatar-wrapper">
        <img src={host.avatar} alt={host.name} className="host-avatar-img" />
      </div>
      <div className="host-meta-info">
        <h3 className="hosted-by-title">Hosted by {host.name}</h3>
        <p className="host-tenure-text">{host.yearsHosting} years hosting</p>
      </div>
    </div>
  );
}
