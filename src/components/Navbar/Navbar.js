import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
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
          <Link to="/">Home</Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <Link to="/categories">Categories</Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <Link to="">Playlists</Link>
        </div>
      </div>
    </div>
  );
}
