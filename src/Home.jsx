import { useNavigate } from "react-router-dom";
import AACBackground from "./aac/AACBackground";

export default function Home() {
  const navigate = useNavigate();

  return (
    <AACBackground>
      <div className="aac-container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>Therapy Authoring Studio</h1>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            Create AAC Boards, Visual Schedules & Digital Activities
          </p>
        </div>

        <div
          className="aac-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div 
            className="aac-tile" 
            onClick={() => navigate("/aac")}
            style={{
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))",
              borderLeft: "4px solid #ec4899"
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗣️</div>
            <h3>AAC Board</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
              Create hierarchical communication boards
            </p>
          </div>

          <div 
            className="aac-tile" 
            onClick={() => navigate("/schedule")}
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05))",
              borderLeft: "4px solid #06b6d4"
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📅</div>
            <h3>Visual Scheduler</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
              Build linear visual schedules
            </p>
          </div>

          <div 
            className="aac-tile"
<<<<<<< HEAD
            onClick={() => navigate("/digital")}
            style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
              borderLeft: "4px solid #22c55e"
=======
            onClick={() => navigate('/digital')}
            style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
              borderLeft: "4px solid #22c55e",
              cursor: "pointer",
              opacity: 1
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎨</div>
            <h3>Digital Activities</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
<<<<<<< HEAD
              Interactive worksheets and games
=======
              Interactive worksheets & activities
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
            </p>
          </div>
        </div>
      </div>
    </AACBackground>
  );
}
