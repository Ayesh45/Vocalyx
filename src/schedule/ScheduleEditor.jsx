import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import AACBackground from "../aac/AACBackground";
import SidePanel from "../aac/SidePanel";
import ScheduleStep from "./ScheduleStep";

export default function ScheduleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: Date.now().toString(),
        label: "New Step"
      }
    ]);
  };

  const updateStep = updated => {
    setSteps(steps.map(s => (s.id === updated.id ? updated : s)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AACBackground>
      <div className="aac-layout">
        <SidePanel />

        <div className="aac-container">
          <div className="aac-header">
            <button className="back-btn-small" onClick={() => navigate(-1)}>
              ⬅
            </button>
            <h2>{id.replace("-", " ").toUpperCase()}</h2>
            <button className="print-btn" onClick={handlePrint} title="Print Schedule">
              🖨️ Print
            </button>
          </div>

          <div className="schedule-canvas">
            {steps.map((step, index) => (
              <div key={step.id} className="schedule-row">
                <ScheduleStep step={step} onUpdate={updateStep} />

                {index < steps.length - 1 && (
                  <div className="arrow">↓</div>
                )}
              </div>
            ))}

            <button className="add-step-btn" onClick={addStep}>
              ➕ Add Step
            </button>
          </div>
        </div>
      </div>
    </AACBackground>
  );
}
