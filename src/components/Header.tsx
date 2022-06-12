import "./Header.css";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  let activeStyle = {
    textDecoration: "underline",
  };
  return (
    <div className="header">
      <h1>
        movieDB
        <i className="fa-solid fa-film"></i>
      </h1>
      <div className="nav-options">
        <NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/">
          MOVIES
          <i className="fa-solid fa-clapperboard"></i>
        </NavLink>
        <NavLink
          className="sign-in"
          style={({ isActive }) => (isActive ? activeStyle : {})}
          to="/signIn"
        >
          SIGN IN
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
