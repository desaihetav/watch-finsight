import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Login.module.css";
import logo from "../../assets/images/logo_white.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, loginUserWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoginStatus("Loading");
    const { message, success } = await loginUserWithCredentials(
      email,
      password
    );
    if (success) {
      setLoginStatus("Success");
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setErrorMessage(message);
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
            <div className="alert alert-error">
              <span className="material-icons-round alert-icon">
                {" "}
                error_outline{" "}
              </span>
              {errorMessage}
            </div>
          )}
          <div className="space-y-1"></div>
          <form onSubmit={(e) => loginHandler(e)}>
            <input
              placeholder="Enter Email"
              className={`input-field ${styles.input} ${
                loginStatus === "Failed" && "input-error"
              }`}
              type="email"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
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
