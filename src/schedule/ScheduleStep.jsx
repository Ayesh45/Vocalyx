import React from 'react';
import { getFirebaseImageUrl } from '../services/imageService';

export default function ScheduleStep({ step, onUpdate }) {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (step.icon && step.icon.startsWith('gs://')) {
      setLoading(true);
      getFirebaseImageUrl(step.icon)
        .then(url => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load image:', err);
          setLoading(false);
        });
    } else if (step.icon) {
      setImageUrl(step.icon);
    }
  }, [step.icon]);

  const playAudio = () => {
    if (!step.audioData) return;
    
    const utterance = new SpeechSynthesisUtterance();
    
    // Extract text from audioData - handle object structure
    let text = '';
    if (typeof step.audioData === 'object') {
      // audioData is {id, en, hi, ta, type} structure
      text = step.audioData.en || step.audioData.label || '';
    } else {
      text = String(step.audioData);
    }
    
    if (!text) {
      console.warn('No text found in audioData:', step.audioData);
      return;
    }
    
    utterance.text = text;
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const onDrop = e => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("aac-token");
    if (!raw) {
      console.warn('No drag data');
      return;
    }

    const resource = JSON.parse(raw);
    console.log('Dropped in ScheduleStep:', resource);
    
    if (resource.type === "image") {
      const imageRef = resource.url || resource.imageRef;
      onUpdate({ ...step, icon: imageRef });
    }

    if (resource.type === "audio") {
      onUpdate({ ...step, audioData: resource });
    }
  };

  const handleClick = () => {
    if (step.audioData) {
      playAudio();
    }
  };

  return (
    <div
      className="schedule-step"
      onClick={handleClick}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
      style={{ 
        position: 'relative',
        border: step.audioData ? '2px solid #ffb74d' : '2px solid #ddd',
        cursor: step.audioData ? 'pointer' : 'default'
      }}
    >
      {step.audioData && (
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          fontSize: '14px',
          backgroundColor: '#ffb74d',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🔊
        </span>
      )}
      <div className="schedule-icon">
        {imageUrl ? (
          <img src={imageUrl} alt="" />
        ) : loading ? (
          <span style={{ color: '#999' }}>Loading...</span>
        ) : (
          "ICON"
        )}
      </div>

      <input
        className="aac-label-input"
        value={step.label}
        onChange={e => onUpdate({ ...step, label: e.target.value })}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
