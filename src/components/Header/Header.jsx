import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <img src="/images/heart.png" alt="HabitTrack logo" className="logoIcon" />
          <h1 className="brandText">Habit Track</h1>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/stats">Stats</Link>
        </nav>
        
      </div>
    </header>
  );
}

export default Header;