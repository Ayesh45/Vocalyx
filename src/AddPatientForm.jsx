import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AACBackground from "./aac/AACBackground";
import "./styles/patientForm.css";

export default function AddPatientForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    loginId: "",
    password: "",
    state: "",
    language: "Hindi",
    diagnosis: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.registerNo ||
      !formData.loginId ||
      !formData.password ||
      !formData.state ||
      !formData.diagnosis
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Get existing patients from localStorage
    const existingPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    const newPatient = {
      id: existingPatients.length + 1,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    existingPatients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(existingPatients));

    // Navigate back to dashboard
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const languages = [
    "Hindi",
    "English",
    "Bengali",
    "Gujarati",
    "Kannada",
    "Marathi",
    "Odia",
    "Punjabi",
    "Tamil",
    "Telugu",
    "Malayalam",
    "Urdu",
    "Assamese",
    "Maithili",
    "Sanskrit",
    "Other",
  ];

  const diagnoses = [
    "Autism Spectrum Disorder",
    "Cerebral Palsy",
    "Down Syndrome",
    "Apraxia of Speech",
    "Dyspraxia",
    "Speech Sound Disorder",
    "Language Disorder",
    "Hearing Impairment",
    "Intellectual Disability",
    "Selective Mutism",
    "Dysarthria",
    "Cleft Palate",
    "Voice Disorder",
    "Stuttering/Stammering",
    "Developmental Delay",
    "Global Developmental Delay",
    "Specific Learning Disability",
    "Childhood Apraxia of Speech",
    "Other",
  ];

  return (
    <AACBackground>
      <div className="patient-form-container">
        <div className="form-card">
          <h1>➕ Add New Patient</h1>
          <p className="form-subtitle">
            Fill in the patient details to create a new record
          </p>

          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Patient Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g., Emma Johnson"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registerNo">Register No / ID *</label>
                <input
                  id="registerNo"
                  type="text"
                  name="registerNo"
                  placeholder="e.g., PT001"
                  value={formData.registerNo}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="loginId">Login ID *</label>
                <input
                  id="loginId"
                  type="text"
                  name="loginId"
                  placeholder="e.g., emma.patient"
                  value={formData.loginId}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Login Password *</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter secure password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="language">Language *</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="form-input"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="diagnosis">Diagnosis *</label>
              <select
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select a diagnosis</option>
                {diagnoses.map((diag) => (
                  <option key={diag} value={diag}>
                    {diag}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Create Patient Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </AACBackground>
  );
}
