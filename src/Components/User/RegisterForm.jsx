import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import validate from "../../Hooks/useInputValidation";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formServerError, setFormServerError] = useState("");
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const {
    value: firstName,
    classes: firstNameClasses,
    isValid: firstNameValid,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    hasError: firstNameError,
    reset: resetFirstName,
  } = validate((value) => value.trim() !== "");
  const {
    value: lastName,
    classes: lastNameClasses,
    isValid: lastNameValid,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    hasError: lastNameError,
    reset: resetLastName,
  } = validate((value) => value.trim() !== "");
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
  } = validate((value) => value.trim().length >= 10);
  const {
    value: passwordConfirm,
    classes: passwordConfirmClasses,
    isValid: passwordConfirmValid,
    changeHandler: passwordConfirmChangeHandler,
    blurHandler: passwordConfirmBlurHandler,
    hasError: passwordConfirmError,
    reset: resetPasswordConfirm,
  } = validate((value) => value === password);

  let formIsValid = false;

  if (
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    passwordValid &&
    passwordConfirmValid
  ) {
    formIsValid = true;
  }

  async function RegisterHandler(e) {
    e.preventDefault();
    setFormIsSubmitting(true);
    if (!formIsValid) {
      setFormIsSubmitting(false);
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users/signup`,
        data: { firstName, lastName, email, password, passwordConfirm },
      });

      console.log(res);
      const user = res.data.data.user;

      dispatch(userActions.login({ user, token: res.data.token }));

      setFormIsSubmitting(false);
      resetFirstName();
      resetLastName();
      resetEmail();
      resetPassword();
      resetPasswordConfirm();

      navigate("/");
    } catch (err) {
      console.log(err.response);
      // console.log(err.response.data.message);

      setFormIsSubmitting(false);
      setFormServerError(err.response.data.message);
    }
  }

  return (
    <div className="form-container">
      <h1>Create your account</h1>
      {formServerError.length >= 1 && (
        <p className="error-text">{formServerError}</p>
      )}
      <form onSubmit={RegisterHandler}>
        <label className={firstNameClasses}>
          First Name
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
          />
          {firstNameError && (
            <p className="error-text">Please enter a first name</p>
          )}
        </label>
        <label className={lastNameClasses}>
          Last Name
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastName}
          />
          {lastNameError && (
            <p className="error-text">Please enter a last name</p>
          )}
        </label>
        <label className={emailClasses}>
          Email
          <input
            type="text"
            placeholder="email@example.com"
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
            <p className="error-text">
              Please enter a password equal or longer than 10 characters
            </p>
          )}
        </label>
        <label className={passwordConfirmClasses}>
          Repeat password
          <input
            type="password"
            placeholder="Password"
            name="passwordConfirm"
            onChange={passwordConfirmChangeHandler}
            onBlur={passwordConfirmBlurHandler}
            value={passwordConfirm}
          />
          {passwordConfirmError && (
            <p className="error-text">Passwords must match</p>
          )}
        </label>
        <button className={`btn auth-submit`} type="submit">
          {formIsSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="btn-spinner" />
          ) : (
            "Register"
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
          // type=''
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
        Already have an account? <Link to={"/login"}> Login</Link>
      </p>
    </div>
  );
}

export default RegisterForm;
