import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail } from 'lucide-react';
import './Modals.css';

export default function ShareModal({ title, image, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content share-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Share this place</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close share dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body share-modal-body">
          <div className="share-preview-card">
            <img src={image} alt={title} className="share-preview-img" />
            <p className="share-preview-title">{title}</p>
          </div>

          <div className="share-options-grid">
            <button className="share-option-btn" onClick={handleCopy}>
              {copied ? <Check size={20} color="#16A34A" /> : <Copy size={20} />}
              <span>{copied ? 'Link copied!' : 'Copy Link'}</span>
            </button>
            <button className="share-option-btn" onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`)}>
              <Mail size={20} />
              <span>Email</span>
            </button>
            <button className="share-option-btn" onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`)}>
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </button>
            <button className="share-option-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
