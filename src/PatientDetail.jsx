import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AACBackground from "./aac/AACBackground";
import AACBoardBuilder from "./aac/AACBoardBuilder";
import ScheduleHome from "./schedule/ScheduleHome";
import DigitalActivities from "./digital/DigitalActivities";
import "./styles/patientDetail.css";

export default function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    // Get patient from localStorage
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    const foundPatient = patients.find((p) => p.id === parseInt(patientId));
    if (foundPatient) {
      setPatient(foundPatient);
    }
  }, [patientId]);

  if (!patient) {
    return (
      <AACBackground>
        <div className="patient-detail-container">
          <div className="loading">Patient not found</div>
          <button onClick={() => navigate("/dashboard")} className="back-link">
            ← Back to Dashboard
          </button>
        </div>
      </AACBackground>
    );
  }

  // If a module is selected, show that module
  if (activeModule === "aac") {
    return <AACBoardBuilder patientId={patientId} />;
  }

  if (activeModule === "schedule") {
    return <ScheduleHome patientId={patientId} />;
  }

  if (activeModule === "digital") {
    return <DigitalActivities patientId={patientId} />;
  }

  // Show patient detail/module selection
  return (
    <AACBackground>
      <div className="patient-detail-container">
        <div className="patient-detail-header">
          <button
            className="back-btn-small"
            onClick={() => navigate("/dashboard")}
          >
            ⬅
          </button>
          <div className="patient-detail-info">
            <h1>👤 {patient.name}</h1>
            <p className="detail-meta">
              ID: {patient.registerNo} | {patient.state} | 🌐 {patient.language}
            </p>
            <p className="detail-diagnosis">Diagnosis: {patient.diagnosis}</p>
          </div>
        </div>

        <div className="patient-detail-content">
          <h2>Select a Module for {patient.name}</h2>
          <div className="module-grid">
            {/* AAC Board */}
            <div
              className="module-card aac-card"
              onClick={() => setActiveModule("aac")}
            >
              <div className="module-icon">🗣️</div>
              <h3>AAC Board Builder</h3>
              <p>Create and customize augmentative and alternative communication boards</p>
              <button className="module-btn">Open AAC Board</button>
            </div>

            {/* Visual Scheduler */}
            <div
              className="module-card schedule-card"
              onClick={() => setActiveModule("schedule")}
            >
              <div className="module-icon">📅</div>
              <h3>Visual Scheduler</h3>
              <p>Design visual schedules and step-by-step activity guides</p>
              <button className="module-btn">Open Scheduler</button>
            </div>

            {/* Digital Activities */}
            <div
              className="module-card activity-card"
<<<<<<< HEAD
              onClick={() => setActiveModule("digital")}
            >
              <div className="module-icon">🎨</div>
              <h3>Digital Activities</h3>
              <p>Interactive learning activities, matching worksheets and games</p>
              <button className="module-btn">Open Activities</button>
=======
              onClick={() => navigate('/digital')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/digital'); }}
            >
              <div className="module-icon">🎨</div>
              <h3>Digital Activities</h3>
              <p>Open interactive learning activities and games</p>
              <button
                className="module-btn"
                onClick={(e) => { e.stopPropagation(); navigate('/digital'); }}
              >
                Open Digital Activities
              </button>
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
            </div>
          </div>
        </div>
      </div>
    </AACBackground>
  );
}
