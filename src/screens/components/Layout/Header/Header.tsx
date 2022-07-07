import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { logout, selectUser } from "../../../../app/store/authSlice";
import { clearWatchlist } from "../../../../app/store/watchlistSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onLogout = () => {
    dispatch(logout());
    dispatch(clearWatchlist());
    navigate("/");
  };

  return (
    <>
      <header>
        <Link state={{ fromHeader: true }} to="/" className="header-app-title">
          movieApp
          <i className="fa-solid fa-film"></i>
        </Link>
        <nav className="nav-options">
          <NavLink state={{ fromHeader: true }} to="/">
            MOVIES
            <i className="fa-solid fa-clapperboard"></i>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/watchlist">
                WATCHLIST <i className="fa-solid fa-list"></i>
              </NavLink>
              <button onClick={onLogout} className="sign-in">
                LOGOUT
              </button>
            </>
          ) : (
            <NavLink className="sign-in" to="/signIn">
              SIGN IN
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </NavLink>
          )}
        </nav>
      </header>
      {user && (
        <div className="user-info">
          <span>Signed in as {user.profileData?.email}</span>
          {user.profileData?.picture && (
            <div
              className="avatar"
              style={{ backgroundImage: `url(${user.profileData?.picture})` }}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
