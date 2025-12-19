import React from 'react';
<<<<<<< HEAD
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../styles/worksheets.css";
import "../styles/aacTheme.css";

export default function DigitalActivities({ patientId }) {
  const { patientId: urlPatientId } = useParams();
  const navigate = useNavigate();
  const actualPatientId = patientId || urlPatientId;

  const items = [
    { to: '/patientside/festivals', title: 'Festivals Matching Worksheet', desc: 'Drag & drop festival pictures to their names.' },
    { to: '/patientside/food', title: 'Food Matching Worksheet', desc: 'Match popular Indian foods to their names.' },
    { to: '/patientside/aac', title: 'AAC Demo (Speech Buttons)', desc: 'Try the assistive communication buttons.' },
    { to: '/patientside/teacher', title: 'Teacher: Create Worksheet', desc: 'Create new custom matching worksheets.' },
    { to: '/patientside/student', title: 'Student: Play Latest Worksheet', desc: 'Play the most recently created worksheet.' },
  ];

  const handleBack = () => {
    if (actualPatientId) {
      navigate(`/patient/${actualPatientId}`);
    } else {
      navigate('/dashboard');
    }
  };

=======
import { Link } from 'react-router-dom';
import "../styles/worksheets.css";
import "../styles/aacTheme.css";

export default function DigitalActivities() {
  const items = [
    { to: '/patientside/festivals', title: 'Festivals matching worksheet', desc: 'Drag & drop festival pictures to their names.' },
    { to: '/patientside/food', title: 'Food matching worksheet', desc: 'Match popular Indian foods to their names.' },
    { to: '/patientside/aac', title: 'AAC Demo (speech buttons)', desc: 'Try the assistive communication buttons.' },
    { to: '/patientside/teacher', title: 'Teacher: Create worksheet', desc: 'Create new matching worksheets.' },
    { to: '/patientside/student', title: 'Student: Play latest worksheet', desc: 'Play the most recently created worksheet.' },
  ];

>>>>>>> 95f49840ce41efa044abbde449f2143982384982
  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left" />
        <div className="flower flower-right" />
      </div>

      <div className="aac-content">
        <div className="page-grid">
          <div className="worksheets-root">
<<<<<<< HEAD
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <button 
                className="back-btn-small" 
                onClick={handleBack}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ⬅
              </button>
              <div>
                <h1>Digital Activities & Worksheets</h1>
                <p>Open interactive worksheets and activities for learning and practice.</p>
              </div>
=======
            <div className="worksheet-header">
              <h1>Digital Activities</h1>
              <p>Open interactive worksheets and activities.</p>
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
            </div>

            <div className="activities-grid">
              {items.map(i => (
                <div key={i.to} className="activity-card">
                  <div style={{ flex: 1 }}>
                    <Link to={i.to}>{i.title}</Link>
                    <p>{i.desc}</p>
                  </div>
                  <div>
                    <Link className="btn secondary" to={i.to}>Open</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-panel">
            <div className="hero-card">
<<<<<<< HEAD
              <h3>Welcome to Digital Activities</h3>
              <p style={{ margin: 0 }}>Choose an interactive activity to practice matching, communication, and learning skills.</p>
            </div>

            <div className="hero-card">
              <h3>Getting Started</h3>
              <ul className="tips">
                <li><strong>Festivals Worksheet:</strong> Learn Indian festival names by matching images.</li>
                <li><strong>Food Worksheet:</strong> Identify popular Indian dishes.</li>
                <li><strong>AAC Demo:</strong> Practice communication with speech buttons.</li>
                <li><strong>Teacher Page:</strong> Create custom worksheets with your own images and labels.</li>
              </ul>
            </div>

            <div className="hero-card">
              <h3>Features</h3>
              <ul className="tips">
                <li>Drag and drop interactions</li>
                <li>Auto-scrolling while dragging</li>
                <li>Score checking</li>
                <li>Reset functionality</li>
=======
              <h3>Welcome</h3>
              <p style={{ margin: 0 }}>Choose an activity to practice matching, communication, and learning.</p>
            </div>

            <div className="hero-card">
              <h3>Getting started</h3>
              <ul className="tips">
                <li>Try Festivals or Food worksheets to begin.</li>
                <li>Use the Teacher page to create custom worksheets.</li>
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
