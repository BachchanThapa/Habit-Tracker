import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <img src="/images/heart.png" alt="HabitTrack logo" className="logoIcon" />
          <h1 className="brandText">Habit Track</h1>
        </div>

        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Progress</a>
          <a href="#">Stats</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;