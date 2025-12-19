import React, { useEffect, useState } from "react";
import "../styles/worksheets.css";
import "../styles/aacTheme.css";

const SCROLL_ZONE = 80;
const SCROLL_SPEED = 15;

export default function StudentWorksheet() {
  const [worksheet, setWorksheet] = useState(null);
  const [correctMap, setCorrectMap] = useState({});

  useEffect(() => {
    fetch("/api/worksheets/latest")
      .then(r => r.json())
      .then(ws => {
        if (!ws) return;
        const map = {};
        ws.items.forEach(it => {
          map["label-" + it.id] = "img-" + it.id;
        });
        setWorksheet(ws);
        setCorrectMap(map);
      })
      .catch(() => {
        // ignore fetch errors for now
      });
  }, []);

  const allowDrop = ev => {
    ev.preventDefault();
    const y = ev.clientY;
    const h = window.innerHeight;
    if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
    else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
  };

  const drag = ev => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    const docHandler = e => {
      const y = e.clientY;
      if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
      else if (y > window.innerHeight - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
    };
    document._studentDragHandler = docHandler;
    document.addEventListener('dragover', docHandler);
  };

  const drop = ev => {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text/plain");
    const label = ev.currentTarget;

    const labelText = label.getAttribute("data-label");
    label.innerHTML = labelText + " ";
    const img = document.getElementById(imgId);
    if (img) label.appendChild(img);

    if (correctMap[label.id] === imgId) {
      label.classList.add("correct");
      label.classList.remove("wrong");
    } else {
      label.classList.add("wrong");
      label.classList.remove("correct");
    }
  };

  const checkScore = () => {
    let score = 0;
    const total = Object.keys(correctMap).length;
    Object.entries(correctMap).forEach(([labelId, imgId]) => {
      const label = document.getElementById(labelId);
      if (!label) return;
      const img = label.querySelector("img");
      if (img && img.id === imgId) score++;
    });
    alert(`Score: ${score} / ${total}`);
  };

  const onDragEndCleanup = () => {
    if (document._studentDragHandler) {
      document.removeEventListener('dragover', document._studentDragHandler);
      delete document._studentDragHandler;
    }
  };

  if (!worksheet) return <div>Loading worksheet... (or no worksheet created yet)</div>;

  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left" />
        <div className="flower flower-right" />
      </div>

      <div className="aac-content">
        <div className="page-grid">
          <div className="worksheets-root">
      <div className="worksheet-header">
        <h2>{worksheet.title}</h2>
      </div>

      <div className="actions">
        <button className="btn" onClick={checkScore}>Check score</button>
      </div>

      <div className="container">
        <div className="images labels">
          {worksheet.items.map(it => (
            <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '8px 0' }}>
              <div className="img-item" style={{ margin: 0 }}>
                <img
                  src={it.imageUrl}
                  id={`img-${it.id}`}
                  alt={it.label}
                  width={80}
                  height={80}
                  draggable
                  onDragStart={drag}
                  onDragEnd={onDragEndCleanup}
                />
              </div>
              <div
                id={`label-${it.id}`}
                data-label={it.label}
                onDragOver={allowDrop}
                onDrop={drop}
                className="drop-zone"
                style={{ flex: 1 }}
              >
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop: 40 }}>
        <a href="teacher.html">Back to Teacher page</a>
        <br />
        <a href="index.html">Back to AAC Demo</a>
      </p>
    </div>

          <aside className="side-panel">
            <div className="hero-card">
              <h3>Play tips</h3>
              <ul className="tips">
                <li>Drag each image carefully to its matching name.</li>
                <li>Auto-scrolling helps when items overflow the viewport.</li>
                <li>Use Reset to try again.</li>
              </ul>
            </div>

            <div className="hero-card">
              <h3>Actions</h3>
              <button className="btn secondary" onClick={() => window.location.reload()}>Reset worksheet</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
