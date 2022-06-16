import "./CategoriesBar.css";
import { NavLink } from "react-router-dom";

const CategoriesBar: React.FC = () => {
  const activeStyle = {
    textDecoration: "underline",
    backgroundColor: "#8b0000",
  };

  return (
    <div className="options">
      <NavLink
        className="option"
        to="/popular"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Popular
      </NavLink>
      <NavLink
        className="option"
        to="/now_playing"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Now Playing
      </NavLink>
      <NavLink
        className="option"
        to="/top_rated"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Top Rated
      </NavLink>
      <NavLink
        className="option"
        to="/upcoming"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Upcoming
      </NavLink>
    </div>
  );
};

export default CategoriesBar;
