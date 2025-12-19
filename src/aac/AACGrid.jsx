import AACButton from "./AACButton";
import AddButton from "./AddButton";

export default function AACGrid({
  items,
  onItemClick,
  onAdd,
  onItemUpdate
}) {
  const gridSize = Math.ceil(Math.sqrt(items.length + 1));

  return (
    <div
      className="aac-grid"
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
    >
      {items.map(item => (
        <AACButton
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
          onUpdate={updated => onItemUpdate(updated)}
        />
      ))}

      <AddButton onAdd={onAdd} />
    </div>
  );
}
