import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Login.module.css";
import logo from "../../assets/images/logo_white.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("Login");
  const { loginUserWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoginStatus("Loading");
    const authResult = await loginUserWithCredentials(username, password);
    if (authResult) {
      setLoginStatus("Success");
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setLoginStatus("Failed");
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
          {loginStatus === "Failed" && (
            <div class="alert alert-error">
              <span class="material-icons-round alert-icon">
                {" "}
                error_outline{" "}
              </span>
              Invalid Credentials. Please try again.
            </div>
          )}
          <div className="space-y-1"></div>
          <form onSubmit={(e) => loginHandler(e)}>
            <input
              placeholder="Enter Username"
              className={`input-field ${styles.input} ${
                loginStatus === "Failed" && "input-error"
              }`}
              type="text"
              value={username}
              onChange={(e) => setUsername(() => e.target.value)}
            />

            <input
              placeholder="Enter Password"
              className={`input-field ${styles.input} ${
                loginStatus === "Failed" && "input-error"
              }`}
              type="password"
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
            <div className="space-y-1"></div>
            <button
              type="submit"
              className={`btn btn-solid w-full ${styles.input}`}
            >
              {loginStatus === "Loading" ? "Loggin In..." : "Login"}
            </button>
          </form>
          <div className="space-y-1"></div>
          <button
            onClick={() => navigate("/signup", { replace: "true" })}
            className={`btn btn-ghost w-full ${styles.input}`}
          >
            Not A Member Yet? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
