import "./header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <img
            src="/images/heart.png"
            alt="HabitTrack logo"
            className="logoIcon"
          />
          <h1 className="brandText">Habit Track</h1>
        </div>

        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
