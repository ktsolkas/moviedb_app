import "./Header.css";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => (
  <div className="header">
    <h1>
      movieDB
      <i className="fa-solid fa-film"></i>
    </h1>
    <div className="nav-options">
      <NavLink state={{ fromHeader: true }} to="/">
        MOVIES
        <i className="fa-solid fa-clapperboard"></i>
      </NavLink>
      <NavLink className="sign-in" to="/signIn">
        SIGN IN
        <i className="fa-solid fa-arrow-right-to-bracket"></i>
      </NavLink>
    </div>
  </div>
);

export default Header;
