import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const authBtnHandler = () => {
    user ? logout() : navigate("/login", { state: { from: pathname } });
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
          <div className="space-x-1"></div>
          <button
            onClick={authBtnHandler}
            className={`btn btn-solid-light btn-small`}
          >
            {user ? "Log Out" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
