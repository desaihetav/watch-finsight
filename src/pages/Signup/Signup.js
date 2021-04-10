import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Signup.module.css";
import logo from "../../assets/images/logo_white.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, createUserWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();
    setSignupStatus("Loading");
    const { message, success } = await createUserWithCredentials(
      name,
      email,
      password
    );
    if (success) {
      setSignupStatus("Success");
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setSignupStatus("Failed");
      setErrorMessage(message);
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
              {errorMessage}
            </div>
          )}
          <div className="space-y-1"></div>
          <form onSubmit={(e) => signupHandler(e)}>
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
              type="email"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
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
              type="submit"
              className={`btn btn-solid w-full ${styles.input}`}
            >
              {signupStatus === "Loading" ? "Signing Up..." : "Signup"}
            </button>
          </form>
          <div className="space-y-1"></div>
          <button
            onClick={() => navigate("/login", { replace: "true" })}
            className={`btn btn-ghost w-full ${styles.input}`}
          >
            Already a member? Login instead
          </button>
        </div>
      </div>
    </div>
  );
}
