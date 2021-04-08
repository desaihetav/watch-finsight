import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Signup.module.css";
import logo from "../../assets/images/logo_white.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const { createUserWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  const signupHandler = async () => {
    setSignupStatus("Loading");
    const authResult = await createUserWithCredentials(
      name,
      username,
      password
    );
    if (authResult) {
      setSignupStatus("Success");
      navigate(state?.from ? state.from : "/");
    } else {
      setSignupStatus("Failed");
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
          <h1 className={`${styles.title}`}>Signup</h1>
          <span className={`${styles.subtitle}`}>
            Get started with your Personal Finance Journey!
          </span>
          <div className="space-y-1"></div>
          {signupStatus === "Failed" && (
            <div class="alert alert-error">
              <span class="material-icons-round alert-icon">
                {" "}
                error_outline{" "}
              </span>
              User with entered username already exists
            </div>
          )}
          <div className="space-y-1"></div>
          <input
            placeholder="Enter Name"
            className={`input-field ${styles.input} ${
              signupStatus === "Failed" && "input-error"
            }`}
            type="text"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
          />
          <input
            placeholder="Enter Username"
            className={`input-field ${styles.input} ${
              signupStatus === "Failed" && "input-error"
            }`}
            type="text"
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
          />
          <input
            placeholder="Enter Password"
            className={`input-field ${styles.input} ${
              signupStatus === "Failed" && "input-error"
            }`}
            type="password"
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
          <div className="space-y-1"></div>
          <button
            onClick={signupHandler}
            className={`btn btn-solid btn-large w-full ${styles.input}`}
          >
            {signupStatus === "Loading" ? "Loggin In..." : "Login"}
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
