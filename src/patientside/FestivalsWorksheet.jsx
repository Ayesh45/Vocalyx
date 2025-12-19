<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect } from "react";
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
import "../styles/worksheets.css";
import "../styles/aacTheme.css";

const IMAGES = [
  ["diwali.webp", "diwali"],
  ["holi.webp", "holi"],
  ["pongal_f.webp", "pongal"],
  ["eid.webp", "eid"],
  ["christmas.webp", "christmas"],
  ["navratri.webp", "navratri"],
  ["durga-puja.webp", "durga-puja"],
  ["ganesh-chaturthi.webp", "ganesh-chaturthi"],
  ["onam.webp", "onam"],
  ["raksha-bandan.webp", "raksha-bandhan"],
];

const LABELS = [
  "Diwali",
  "Holi",
  "Pongal",
  "Eid",
  "Christmas",
  "Navratri",
  "Durga Puja",
  "Ganesh Chaturthi",
  "Onam",
  "Raksha Bandhan",
];

<<<<<<< HEAD
const CORRECT_MAP = IMAGES.reduce((acc, [, id]) => {
=======
const CORRECT_MAP = IMAGES.reduce((acc, [file, id], idx) => {
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
  acc[`label-${id}`] = `img-${id}`;
  return acc;
}, {});

export default function FestivalsWorksheet() {
<<<<<<< HEAD
  /* === Drag & Drop logic (same as HTML, React-safe) === */

  const allowDrop = (ev) => {
=======
  useEffect(() => {
    // no-op: component handlers are attached via JSX props
    return () => {};
  }, []);

  const allowDrop = ev => {
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
    ev.preventDefault();
    const y = ev.clientY;
    const h = window.innerHeight;
    const SCROLL_ZONE = 80;
    const SCROLL_SPEED = 15;
    if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
    else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
  };

<<<<<<< HEAD
  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  };

  const onDrop = (ev) => {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text/plain");
    const label = ev.currentTarget;

    label.textContent =
      label.getAttribute("data-label") || label.textContent.trim();
    label.setAttribute("data-label", label.textContent.trim());

=======
  const onDragStart = ev => {
    const target = ev.target;
    if (target && target.id) ev.dataTransfer.setData("text/plain", target.id);
    // attach document-level dragover to enable auto-scroll while dragging anywhere
    const handleDocDrag = e => {
      const y = e.clientY;
      const h = window.innerHeight;
      const SCROLL_ZONE = 80;
      const SCROLL_SPEED = 15;
      if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
      else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
    };
    document._festivalDragHandler = handleDocDrag;
    document.addEventListener('dragover', handleDocDrag);
  };

  const onDrop = ev => {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text/plain");
    const label = ev.currentTarget;
    label.textContent = label.getAttribute("data-label") || label.textContent.trim();
    label.setAttribute("data-label", label.textContent.trim());
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
    const img = document.getElementById(imgId);
    if (img) {
      label.appendChild(document.createTextNode(" "));
      label.appendChild(img);
    }

    if (CORRECT_MAP[label.id] === imgId) {
      label.classList.add("correct");
      label.classList.remove("wrong");
    } else {
      label.classList.add("wrong");
      label.classList.remove("correct");
    }
  };

  const checkScore = () => {
    let score = 0;
    const total = Object.keys(CORRECT_MAP).length;
<<<<<<< HEAD

    for (const [labelId, imgId] of Object.entries(CORRECT_MAP)) {
      const label = document.getElementById(labelId);
      const placedImg = label?.querySelector("img");
      if (placedImg && placedImg.id === imgId) score++;
    }

    document.getElementById("score").textContent =
      `Score: ${score} / ${total}`;
  };

  /* === JSX === */

  return (
    <div className="aac-bg">
      <div className="aac-content">
        <div className="worksheets-root">

          <h1>Match the Indian festivals to their names</h1>
          <p>Drag each picture to the correct festival name.</p>

          <button className="btn" onClick={checkScore}>Check score</button>
          <p id="score"></p>

          <div className="container">
            <div className="images labels">
              {IMAGES.map(([file, id], idx) => (
                <div
                  key={id}
                  style={{ display: "flex", gap: 12, margin: "8px 0" }}
                >
                  {/* IMAGE */}
                  <img
                    src={`/uploads/${file}`}
                    id={`img-${id}`}
                    draggable
                    onDragStart={onDragStart}
                    alt={id}
                    className="worksheet-image"
                  />

                  {/* DROP ZONE */}
                  <div
                    id={`label-${id}`}
                    className="drop-zone"
                    data-label={LABELS[idx]}
                    onDragOver={allowDrop}
                    onDrop={onDrop}
                  >
                    {LABELS[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>

=======
    for (const [labelId, imgId] of Object.entries(CORRECT_MAP)) {
      const label = document.getElementById(labelId);
      const placedImg = label && label.querySelector("img");
      if (placedImg && placedImg.id === imgId) score++;
    }
    const scoreEl = document.getElementById("score");
    if (scoreEl) scoreEl.textContent = `Score: ${score} / ${total}`;
  };

  const onDragEndCleanup = () => {
    // remove document-level handler when drag ends
    if (document._festivalDragHandler) {
      document.removeEventListener('dragover', document._festivalDragHandler);
      delete document._festivalDragHandler;
    }
  };

  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left" />
        <div className="flower flower-left-2" />
        <div className="flower flower-left-3" />
        <div className="flower flower-right" />
        <div className="flower flower-right-2" />
        <div className="flower flower-right-3" />
      </div>

      <div className="aac-content">
        <div className="page-grid">
          <div className="worksheets-root">
            <div className="worksheet-header">
              <h1>Match the Indian festivals to their names</h1>
              <p>Drag each picture to the correct festival name. Scroll will move automatically when you reach the top or bottom.</p>
            </div>

            <div className="actions">
              <button id="check-btn" className="btn" onClick={checkScore}>Check score</button>
              <p id="score"></p>
            </div>

            <div className="container">
              <div className="images labels">
                {IMAGES.map(([file, id], idx) => (
                  <div key={id} style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '8px 0' }}>
                    <div className="img-item" style={{ margin: 0 }}>
                      <img
                        src={`/uploads/${file}`}
                        id={`img-${id}`}
                        draggable
                        onDragStart={onDragStart}
                        onDragEnd={onDragEndCleanup}
                        alt={id}
                      />
                    </div>
                    <div
                      id={`label-${id}`}
                      className="drop-zone"
                      data-label={LABELS[idx]}
                      onDragOver={allowDrop}
                      onDrop={onDrop}
                      style={{ flex: 1 }}
                    >
                      {LABELS[idx]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="side-panel">
            <div className="hero-card">
              <h3>How to play</h3>
              <ol className="tips">
                <li>Drag the picture from the left and drop it on the matching name.</li>
                <li>If you reach the top or bottom while dragging, the page will auto-scroll.</li>
                <li>Click <strong>Check score</strong> to see how many matches are correct.</li>
              </ol>
            </div>

            <div className="hero-card">
              <h3>Quick actions</h3>
              <button className="btn secondary" onClick={() => window.location.reload()}>Reset worksheet</button>
            </div>
          </aside>
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
        </div>
      </div>
    </div>
  );
}
