export default function AACBackground({ children }) {
  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left"></div>
        <div className="flower flower-left-2"></div>
        <div className="flower flower-left-3"></div>
        <div className="flower flower-left-4"></div>
        <div className="flower flower-right"></div>
        <div className="flower flower-right-2"></div>
        <div className="flower flower-right-3"></div>
        <div className="flower flower-right-4"></div>
      </div>

      <div className="aac-content">
        {children}
      </div>
    </div>
  );
}
