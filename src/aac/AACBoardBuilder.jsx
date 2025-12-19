import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AACGrid from "./AACGrid";
import AACBackground from "./AACBackground";
import SidePanel from "./SidePanel";
import { initialBoards } from "./boardData";

export default function AACBoardBuilder() {
  const navigate = useNavigate();

  const [boards, setBoards] = useState(initialBoards);
  const [stack, setStack] = useState(["root"]);

  const currentBoardId = stack[stack.length - 1];
  const board = boards[currentBoardId];

  const openItem = (item) => {
    if (item.nextBoard) {
      setStack([...stack, item.nextBoard]);
    }
  };

  const addItem = () => {
    const id = Date.now().toString();
    const nextBoardId = `board_${id}`;

    setBoards({
      ...boards,
      [currentBoardId]: {
        ...board,
        items: [
          ...board.items,
          { id, label: "New Button", nextBoard: nextBoardId }
        ]
      },
      [nextBoardId]: {
        title: "New Board",
        items: []
      }
    });
  };

  const updateItem = (updatedItem) => {
    setBoards({
      ...boards,
      [currentBoardId]: {
        ...board,
        items: board.items.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        )
      }
    });
  };

  const handlePrint = () => {
    // Hide UI elements before printing
    const header = document.querySelector('.aac-header');
    const sidePanel = document.querySelector('.side-panel');
    if (header) header.style.display = 'none';
    if (sidePanel) sidePanel.style.display = 'none';
    
    // Print with slight delay to ensure DOM is updated
    setTimeout(() => {
      window.print();
      // Restore UI after print dialog closes
      setTimeout(() => {
        if (header) header.style.display = 'flex';
        if (sidePanel) sidePanel.style.display = 'flex';
      }, 500);
    }, 100);
  };

  return (
    <AACBackground>
      <div className="aac-layout">
        {/* SIDE PANEL */}
        <SidePanel />

        {/* MAIN AAC AREA */}
        <div className="aac-container">

          {/* 🔹 HEADER */}
          <div className="aac-header">
            <button
              className="back-btn-small"
              onClick={() => stack.length > 1 ? setStack(stack.slice(0, -1)) : navigate("/patient")}
            >
              ⬅
            </button>
            <h2>{board.title}</h2>
            <button className="print-btn" onClick={handlePrint} title="Print AAC Board">
              🖨️ Print
            </button>
          </div>

          {/* 🔹 AAC GRID */}
          <AACGrid
            items={board.items}
            onItemClick={openItem}
            onAdd={addItem}
            onItemUpdate={updateItem}
          />

        </div>
      </div>
    </AACBackground>
  );
}
