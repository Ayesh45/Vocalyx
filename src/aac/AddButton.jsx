export default function AddButton({ onAdd }) {
  return (
    <div className="aac-tile add-tile" onClick={onAdd}>
      <span className="plus">+</span>
      <p>Add</p>
    </div>
  );
}
