import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AACBackground from "./aac/AACBackground";
import "./styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Load patients from localStorage on component mount
    const savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(savedPatients);
  }, []);

  const professionalName = localStorage.getItem("professionalName") || "Therapist";

  const handleLogout = () => {
    localStorage.removeItem("professionalEmail");
    localStorage.removeItem("professionalName");
    navigate("/");
  };

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const handleAddPatient = () => {
    navigate("/add-patient");
  };

  return (
    <AACBackground>
      <div className="dashboard-container">
        {/* TOP BAR */}
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <h2>👤 {professionalName}</h2>
            <p className="patient-count">
              📊 {patients.length} {patients.length === 1 ? "Patient" : "Patients"}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          <h1>Your Patients</h1>

          {/* PATIENTS GRID */}
          <div className="patients-grid">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="patient-card"
                onClick={() => handlePatientClick(patient.id)}
              >
                <div className="patient-avatar">👤</div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p className="register-no">ID: {patient.registerNo}</p>
                  <p className="language">🌐 {patient.language}</p>
                </div>
              </div>
            ))}

            {/* ADD PATIENT BUTTON */}
            <div className="add-patient-card" onClick={handleAddPatient}>
              <div className="add-patient-icon">➕</div>
              <p>Add New Patient</p>
            </div>
          </div>
        </div>
      </div>
    </AACBackground>
  );
}
