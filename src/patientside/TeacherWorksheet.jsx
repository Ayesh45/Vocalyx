import React, { useState } from "react";
import "../styles/worksheets.css";

export default function TeacherWorksheet() {
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([{ label: "", file: null, preview: null }]);

  const handleLabelChange = (i, value) => {
    const copy = [...rows];
    copy[i].label = value;
    setRows(copy);
  };

  const handleFileChange = (i, file) => {
    const copy = [...rows];
    copy[i].file = file;
    copy[i].preview = file ? URL.createObjectURL(file) : null;
    setRows(copy);
  };

  const addRow = () => setRows([...rows, { label: "", file: null, preview: null }]);

  const saveWorksheet = async () => {
    if (!title.trim()) {
      alert("Please enter a worksheet title");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    let hasValidRow = false;
    rows.forEach(r => {
      if (r.label.trim() && r.file) {
        fd.append("labels[]", r.label.trim());
        fd.append("images[]", r.file);
        hasValidRow = true;
      }
    });
    if (!hasValidRow) {
      alert("Add at least one label and image");
      return;
    }

    try {
      const res = await fetch("/api/worksheets", {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      alert("Worksheet saved successfully: " + data.title);
      setRows([{ label: "", file: null, preview: null }]);
      setTitle("");
    } catch (err) {
      alert("Error saving worksheet. Is the backend server running?");
      console.error(err);
    }
  };

  return (
    <div className="worksheets-root" style={{ background: "#f9f9f9" }}>
      <h2>Create Matching Worksheet</h2>
      <input
        className="form-input"
        placeholder="Worksheet title (e.g., Indian Festivals)"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div style={{ marginTop: 20 }}>
        {rows.map((row, i) => (
          <div key={i} className="form-row">
            <input
              className="form-input"
              placeholder="Label (e.g., Diwali)"
              value={row.label}
              onChange={e => handleLabelChange(i, e.target.value)}
            />
            <input type="file" accept="image/*" onChange={e => handleFileChange(i, e.target.files[0])} />
            {row.preview && <img src={row.preview} className="preview-img" alt="preview" />}
          </div>
        ))}
      </div>
      <button className="btn" onClick={addRow}>Add another item</button>
      <button className="btn" onClick={saveWorksheet} style={{ marginLeft: 10 }}>
        Save Worksheet
      </button>
      <p style={{ marginTop: 20 }}>
        <a href="student.html">Go to Student page to play the latest worksheet</a>
        <br />
        <a href="index.html">Back to AAC Demo</a>
      </p>
    </div>
  );
}
