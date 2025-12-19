<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../styles/worksheets.css";
import "../styles/aacTheme.css";
import { getFirebaseImageUrl } from "../services/worksheetImageService";
import { getFirebaseImageUrl as getImageDownloadUrl } from "../services/imageService";
=======
import React from "react";
import "../styles/worksheets.css";
import "../styles/aacTheme.css";
>>>>>>> 95f49840ce41efa044abbde449f2143982384982

const IMAGES = [
  ["dosa.webp", "dosa"],
  ["idli.webp", "idli"],
  ["poha.webp", "poha"],
  ["puri.webp", "puri"],
  ["chapati.webp", "chapati"],
  ["sambar.webp", "sambar"],
  ["rasam.webp", "rasam"],
  ["upma.webp", "upma"],
  ["vada.webp", "vada"],
  ["aloo-paratha.webp", "aloo-paratha"],
  ["chole-bhature.webp", "chole-bhature"],
  ["biryani.webp", "biryani"],
  ["idiyappam.webp", "idiyappam"],
  ["pongal.webp", "pongal"],
  ["dhokla.webp", "dhokla"],
];

const LABELS = [
  "Dosa",
  "Idli",
  "Poha",
  "Puri",
  "Chapati (Roti)",
  "Sambar",
  "Rasam",
  "Upma",
  "Vada",
  "Aloo Paratha",
  "Chole Bhature",
  "Biryani",
  "Idiyappam",
  "Pongal",
  "Dhokla",
];

const CORRECT_MAP = IMAGES.reduce((acc, [file, id]) => {
  acc[`label-${id}`] = `img-${id}`;
  return acc;
}, {});

export default function FoodWorksheet() {
<<<<<<< HEAD
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all images
    const loadImages = async () => {
      const urls = {};
      for (const [file, id] of IMAGES) {
        try {
          const gsUrl = getFirebaseImageUrl(file, 'food');
          const downloadUrl = await getImageDownloadUrl(gsUrl);
          urls[id] = downloadUrl;
        } catch (error) {
          console.warn(`Failed to load image ${id}:`, error);
          urls[id] = `https://via.placeholder.com/200x200?text=${encodeURIComponent(id)}`;
        }
      }
      setImageUrls(urls);
      setLoading(false);
    };
    loadImages();
  }, []);
=======
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
  const allowDrop = ev => {
    ev.preventDefault();
    const y = ev.clientY;
    const h = window.innerHeight;
    const SCROLL_ZONE = 80;
    const SCROLL_SPEED = 15;
    if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
    else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
  };

  const onDragStart = ev => {
    const t = ev.target;
    if (t && t.id) ev.dataTransfer.setData("text/plain", t.id);
    const handleDocDrag = e => {
      const y = e.clientY;
      const h = window.innerHeight;
      const SCROLL_ZONE = 80;
      const SCROLL_SPEED = 15;
      if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
      else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
    };
    document._foodDragHandler = handleDocDrag;
    document.addEventListener('dragover', handleDocDrag);
  };

  const onDrop = ev => {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text/plain");
    const label = ev.currentTarget;
    label.textContent = label.getAttribute("data-label") || label.textContent.trim();
    label.setAttribute("data-label", label.textContent.trim());
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
    for (const [labelId, imgId] of Object.entries(CORRECT_MAP)) {
      const label = document.getElementById(labelId);
      const placedImg = label && label.querySelector("img");
      if (placedImg && placedImg.id === imgId) score++;
    }
    const scoreEl = document.getElementById("score");
    if (scoreEl) scoreEl.textContent = `Score: ${score} / ${total}`;
  };

  const onDragEndCleanup = () => {
    if (document._foodDragHandler) {
      document.removeEventListener('dragover', document._foodDragHandler);
      delete document._foodDragHandler;
    }
  };
  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left" />
        <div className="flower flower-left-2" />
        <div className="flower flower-right" />
      </div>

      <div className="aac-content">
        <div className="page-grid">
          <main className="worksheet">
            <h2 className="gradient-title">Food Worksheet</h2>
            <p id="score">Score: 0 / {IMAGES.length}</p>

            <div className="images labels">
              {IMAGES.map(([file, id], idx) => (
                <div key={id} style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '8px 0' }}>
                  <div className="img-item" style={{ margin: 0 }}>
<<<<<<< HEAD
                    <img 
                      src={imageUrls[id] || `https://via.placeholder.com/200x200?text=${encodeURIComponent(id)}`} 
                      id={`img-${id}`} 
                      draggable 
                      onDragStart={onDragStart} 
                      onDragEnd={onDragEndCleanup} 
                      alt={id}
                      style={{ opacity: loading ? 0.5 : 1 }}
                    />
=======
                    <img src={`/uploads/${file}`} id={`img-${id}`} draggable onDragStart={onDragStart} onDragEnd={onDragEndCleanup} alt={id} />
>>>>>>> 95f49840ce41efa044abbde449f2143982384982
                  </div>
                  <div
                    id={`label-${id}`}
                    className="drop-zone"
                    data-label={LABELS[idx]}
                    onDragOver={allowDrop}
                    onDrop={(e) => { onDrop(e); checkScore(); }}
                    style={{ flex: 1 }}
                  >
                    {LABELS[idx]}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <button className="btn" onClick={checkScore}>Check score</button>
              <button className="btn secondary" style={{ marginLeft: 8 }} onClick={() => window.location.reload()}>Reset</button>
            </div>
          </main>

          <aside className="side-panel">
            <div className="hero-card">
              <h3>Tips</h3>
              <ul className="tips">
                <li>Take your time to look at each picture.</li>
                <li>Drag and drop; the page will auto-scroll if you reach edges.</li>
                <li>Click <strong>Check score</strong> when done.</li>
              </ul>
            </div>
            <div className="hero-card">
              <h3>Try another</h3>
              <p>Reload to try a fresh attempt.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
