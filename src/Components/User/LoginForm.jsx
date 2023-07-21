import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import axios from "axios";
import validate from "../../Hooks/useInputValidation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formServerError, setFormServerError] = useState("");
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const {
    value: email,
    classes: emailClasses,
    isValid: emailValid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    hasError: emailError,
    reset: resetEmail,
  } = validate((value) => value.includes("@"));
  const {
    value: password,
    classes: passwordClasses,
    isValid: passwordValid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    hasError: passwordError,
    reset: resetPassword,
  } = validate((value) => value.trim() !== "");

  let formIsValid = false;

  if (emailValid && passwordValid) {
    formIsValid = true;
  }

  async function loginHandler(e) {
    e.preventDefault();
    setFormIsSubmitting(true);
    if (!formIsValid) {
      setFormIsSubmitting(false);
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users/login`,
        data: { email, password },
      });

      console.log(res);
      const user = res.data.data.user;

      dispatch(userActions.login({ user, token: res.data.token }));

      setFormIsSubmitting(false);
      resetEmail();
      resetPassword();

      navigate("/");
    } catch (err) {
      console.log(err);
      setFormServerError(err.response.data.message);
    }
  }

  return (
    <div className="form-container">
      <h1>Login to your account</h1>
      {formServerError.length >= 1 && (
        <p className="error-text">{formServerError}</p>
      )}
      <form onSubmit={loginHandler}>
        <label className={emailClasses}>
          Email
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={email}
          />
          {emailError && (
            <p className="error-text">Please enter a valid email</p>
          )}
        </label>
        <label className={passwordClasses}>
          Password
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={password}
          />
          {passwordError && (
            <p className="error-text">Please enter a password</p>
          )}
        </label>
        <button className={`btn auth-submit`} type="submit">
          {formIsSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="btn-spinner" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="lines-container">
        <div className="lines">
          <p className="text">Or</p>
        </div>
      </div>
      <div className="google-auth">
        <button
          className={`btn google-auth__btn`}
          href="https://www.google.com.ar/?hl=es"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="google sign-in icon"
          />
          Sign in with Google
        </button>
      </div>
      <p className="switch-auth-page">
        No account? <Link to={"/register"}> Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;
