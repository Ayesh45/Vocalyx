import { useNavigate } from "react-router-dom";
import AACBackground from "../aac/AACBackground";

export default function ScheduleHome() {
  const navigate = useNavigate();

  const schedules = [
    { id: "daily", label: "Daily Routine" },
    { id: "weekly", label: "Weekly Schedule" },
    { id: "therapy", label: "Therapy Session Schedule" }
  ];

  return (
    <AACBackground>
      <div className="aac-container">
        <div className="aac-header">
          <button className="back-btn-small" onClick={() => navigate(-1)}>
            ⬅
          </button>
          <h2>Visual Schedules</h2>
        </div>

        <div className="aac-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {schedules.map(s => (
            <div
              key={s.id}
              className="aac-tile"
              onClick={() => navigate(`/schedule/${s.id}`)}
            >
              {s.label}
            </div>
          ))}

          <div className="aac-tile add-tile">➕ Add Schedule</div>
        </div>
      </div>
    </AACBackground>
  );
}
