import { useState } from "react";
import styles from "./Account.module.css";
import { useAuth } from "../../context";
import axios from "axios";

export default function Account() {
  const { user, updateAccountDetails } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");

  const editBtnClickHandler = () => {
    if (isEditMode) {
      updateAccountDetails(user.id, name, email, newPassword);
    }
    setIsEditMode((val) => !val);
    setName(user.name);
    setEmail(user.email);
    setNewPassword("");
  };

  return (
    <div className={`${styles.pageContainer} container`}>
      <div className="flex justify-between">
        <h1>My Account</h1>
        <button
          onClick={editBtnClickHandler}
          className={`btn btn-icon btn-small ${
            isEditMode ? "btn-solid" : "btn-ghost"
          }`}
        >
          <span className="material-icons-outlined">
            {isEditMode ? "done" : "edit"}
          </span>
        </button>
      </div>
      <div className="space-y-1"></div>
      <span>Name</span>
      <input
        readOnly={!isEditMode}
        type="text"
        className={`input-field ${styles.inputField}`}
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      />
      <div className="space-y-1"></div>
      <span>Email</span>
      <input
        readOnly={!isEditMode}
        type="email"
        className={`input-field ${styles.inputField}`}
        value={email}
        onChange={(e) => setEmail(() => e.target.value)}
      />
      <div className="space-y-1"></div>
      <span>Password</span>
      <input
        readOnly
        type={isEditMode ? "text" : "password"}
        className={`input-field ${styles.inputField}`}
        value={user.password}
      />
      <div className="space-y-1"></div>
      <span>New Password</span>
      <input
        readOnly={!isEditMode}
        type={isEditMode ? "text" : "password"}
        className={`input-field ${styles.inputField}`}
        value={newPassword}
        onChange={(e) => setNewPassword(() => e.target.value)}
      />
    </div>
  );
}
