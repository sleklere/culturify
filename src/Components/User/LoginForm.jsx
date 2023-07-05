import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/user-slice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();
    dispatch(userActions.login());
    navigate("/");
  }

  return (
    <div className="form-container">
      <h1>Login to your account</h1>
      {/* <form action="/login" method="POST"> */}
      <form onSubmit={loginHandler}>
        <label>
          User
          <input type="text" placeholder="Username" name="userName" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" name="password" />
        </label>
        <button className={`btn auth-submit`} type="submit">
          Login
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
        No account? <Link to={"/register"}> Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;
