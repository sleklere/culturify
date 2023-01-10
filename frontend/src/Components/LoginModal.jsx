import { useRef } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Modals.module.css";

export const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const navigate = useNavigate();

  const userRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    console.log("Login Handler");
    e.preventDefault();
    const formData = {
      userName: userRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(formData);

    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login error thrown");
      }

      console.log(response);
      console.log("Login succesful, redirecting");
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${styles["login-modal"]} ${styles.modal}`}>
      {/* <form action="/login" method="POST"> */}
      <form onSubmit={loginHandler}>
        <label>
          User
          <input
            type="text"
            placeholder="Your username"
            name="userName"
            ref={userRef}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Your password"
            name="password"
            ref={passwordRef}
          />
        </label>
        <button className={styles.btn}>Login</button>
      </form>
      <p className={styles["no-account"]}>
        No account? <button onClick={props.onClickRegister}> Register</button>
      </p>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const LoginModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClickRegister={props.showRegister} />,
        portalElement
      )}
    </Fragment>
  );
};

export default LoginModal;
