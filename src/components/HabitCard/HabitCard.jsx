function HabitCard({ icon, title, done, onClick }) {
  return (
    <div
      className={done ? "habitCard done" : "habitCard pending"}
      onClick={onClick}
    >
      <div className="habitIconBox">
        <img src={icon} alt={title} />
      </div>

      <div className="habitText">
        <p>{title}</p>
      </div>

      <div className="habitCheck">{done ? "✓" : "✓"}</div>
    </div>
  );
}

export default HabitCard;