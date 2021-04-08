import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Login.module.css";
import logo from "../../assets/images/logo_white.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();
  console.log({ state });

  const loginHandler = async () => {
    const authResult = await loginWithCredentials(username, password);
    if (authResult) {
      navigate(state?.from ? state.from : "/");
    }
  };

  return (
    <div className={`flex ${styles.container}`}>
      <div className={`${styles.leftContainer}`}>
        <div className={`${styles.leftContainerTint}`}>
          <img alt="" src={logo} className={`${styles.logo}`} />
          <h1 className={`${styles.leftContainerText}`}>FINSIGHT</h1>
        </div>
      </div>
      <div className={`${styles.rightContainer}`}>
        <div className={`${styles.loginCard}`}>
          <h1 className={`${styles.title}`}>Login</h1>
          <span className={`${styles.subtitle}`}>
            Get started with your Personal Finance Journey!
          </span>
          <div className="space-y-1"></div>
          <div className="space-y-1"></div>
          <input
            placeholder="Enter Username"
            className={`input-field ${styles.input}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
          />

          <input
            placeholder="Enter Password"
            className={`input-field ${styles.input}`}
            type="text"
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
          <div className="space-y-1"></div>
          <button
            onClick={loginHandler}
            className={`btn btn-solid btn-large w-full ${styles.input}`}
          >
            Login
          </button>
          <div className="space-y-1"></div>
          <button className={`btn btn-ghost w-full ${styles.input}`}>
            Not A Member Yet? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
