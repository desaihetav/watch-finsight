import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context";
import logoWhite from "../../assets/images/logo_white.svg";

export default function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const authBtnHandler = () => {
    user ? logout() : navigate("/login", { state: { from: pathname } });
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
      <div className="container row items-center">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          {/* <img
            className={`${styles.logoImage}`}
            alt="Finsight Logo"
            src={logoWhite}
          /> */}
          <span className={styles.logoText}>FINSIGHT</span>
        </Link>
        <div className="row ml-auto">
          <Link to="/playlists">Playlists</Link>
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
      </div>
    </div>
  );
}
