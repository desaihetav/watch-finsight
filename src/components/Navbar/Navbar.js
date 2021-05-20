import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth, useData } from "../../context";
import logoWhite from "../../assets/images/logo_white.svg";

export default function Navbar({ theme, setTheme }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const authBtnHandler = () => {
    user
      ? setShowLogoutModal(true)
      : navigate("/login", { state: { from: pathname } });
  };

  const switchTheme = () => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <div className={`${styles.navOuter}`}>
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
      <div className="container row items-center">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          <span className={styles.logoText}>FINSIGHT</span>
        </Link>

        <div className={`row ml-auto ${styles.desktopMenu}`}>
          <Link to="/">Home</Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <Link to="/playlists">Playlists</Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <Link to="/account">Account</Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <button
            onClick={authBtnHandler}
            className={`btn btn-solid-reverse btn-small`}
          >
            {user ? "Log Out" : "Log In"}
          </button>
          <button
            onClick={switchTheme}
            className={`btn btn-icon btn-ghost btn-small`}
          >
            <span className="material-icons-outlined">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
          </button>
        </div>
        <div className={`${styles.mobileMenu} ml-auto`}>
          <button
            onClick={() => setShowMenuDrawer((val) => !val)}
            className={`btn btn-icon btn-ghost btn-small ${styles.hamburgerIcon}`}
          >
            <span className="material-icons-outlined">menu</span>
          </button>
          <div
            className={`${styles.menuDrawer} ${
              showMenuDrawer && styles.menuDrawerActive
            }`}
            onClick={() => setShowMenuDrawer(false)}
          >
            <ul className={`flex flex-col items-center`}>
              <li>
                <Link className={`${styles.menuLink}`} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={`${styles.menuLink}`} to="/playlists">
                  Playlists
                </Link>
              </li>
              <li>
                <Link className={`${styles.menuLink}`} to="/account">
                  Account
                </Link>
              </li>
              <li>
                <button
                  onClick={switchTheme}
                  className={`btn btn-icon btn-ghost btn-small ${styles.menuLink}`}
                >
                  <span className="material-icons-outlined">
                    {theme === "light" ? "dark_mode" : "light_mode"}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={authBtnHandler}
                  className={`btn btn-solid-reverse btn-small ${styles.menuLink}`}
                >
                  {user ? "Log Out" : "Log In"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const LogoutModal = ({ setShowLogoutModal }) => {
  const { logout } = useAuth();
  const { dispatch } = useData();
  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>Are you sure you want to Logout?</h2>
        <p>Come back soon, we'll miss you!</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="btn btn-outlined btn-small"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              logout();
              dispatch({ type: "CLEAR_PLAYLISTS" });
              setShowLogoutModal(false);
            }}
            className="btn btn-solid btn-small"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};
