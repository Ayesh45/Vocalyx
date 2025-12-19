import React from 'react';
import { getFirebaseImageUrl } from '../services/imageService';

export default function AACButton({ item, onClick, onUpdate }) {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (item.icon && item.icon.startsWith('gs://')) {
      setLoading(true);
      getFirebaseImageUrl(item.icon)
        .then(url => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load image:', err);
          setLoading(false);
        });
    } else if (item.icon) {
      setImageUrl(item.icon);
    }
  }, [item.icon]);

  const playAudio = () => {
    if (!item.audioData) return;
    
    const utterance = new SpeechSynthesisUtterance();
    
    // Extract text from audioData - handle object structure
    let text = '';
    if (typeof item.audioData === 'object') {
      // audioData is {id, en, hi, ta, type} structure
      text = item.audioData.en || item.audioData.label || '';
    } else {
      text = String(item.audioData);
    }
    
    if (!text) {
      console.warn('No text found in audioData:', item.audioData);
      return;
    }
    
    utterance.text = text;
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleDrop = e => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("aac-token");
    if (!raw) {
      console.warn('No data in drop event');
      return;
    }

    const resource = JSON.parse(raw);
    console.log('Dropped resource:', resource);

    if (resource.type === "image") {
      const imageRef = resource.url || resource.imageRef;
      console.log('Image reference:', imageRef);
      
      onUpdate({
        ...item,
        icon: imageRef
      });
    }

    if (resource.type === "audio") {
      onUpdate({
        ...item,
        audioData: resource
      });
    }
  };

  const handleClick = (e) => {
    if (item.audioData) {
      e.stopPropagation();
      playAudio();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="aac-tile"
      onClick={handleClick}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      style={{ 
        position: 'relative',
        border: item.audioData ? '2px solid #ffb74d' : '2px solid #ddd'
      }}
    >
      {item.audioData && (
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          fontSize: '16px',
          backgroundColor: '#ffb74d',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🔊
        </span>
      )}
      <div className="aac-icon">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="" 
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
              e.target.style.display = 'none';
            }}
          />
        ) : loading ? (
          <span style={{ color: '#999' }}>Loading...</span>
        ) : (
          "ICON"
        )}
      </div>

      <input
        className="aac-label-input"
        value={item.label}
        onChange={e =>
          onUpdate({ ...item, label: e.target.value })
        }
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
