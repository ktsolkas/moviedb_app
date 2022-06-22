import "./Header.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import jwt_decode from "jwt-decode";

const Header: React.FC = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")!)
  );
  console.log("user", user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // if (token) {
    //   console.log(token);
    //   const decodedToken: any = jwt_decode(token);
    //   console.log("asdasdasd", decodedToken);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) {
    //     onLogout();
    //   }
    // }
    // //JWT

    setUser(JSON.parse(localStorage.getItem("profile")!));
  }, [location]);

  return (
    <>
      <div className="header">
        <div className="header-app-title">
          <Link state={{ fromHeader: true }} to="/">
            movieDB
            <i className="fa-solid fa-film"></i>
          </Link>
        </div>
        <div className="nav-options">
          <NavLink state={{ fromHeader: true }} to="/">
            MOVIES
            <i className="fa-solid fa-clapperboard"></i>
          </NavLink>
          {user ? (
            <button onClick={onLogout} className="sign-in">
              LOGOUT
            </button>
          ) : (
            <NavLink className="sign-in" to="/signIn">
              SIGN IN
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </NavLink>
          )}
        </div>
      </div>
      {user && (
        <div className="user-info">
          <span>Signed in as {user.profileData.given_name}</span>
          <div
            className="avatar"
            style={{ backgroundImage: `url(${user.profileData.picture})` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
