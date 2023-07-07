import { Fragment } from "react";
import LoginForm from "../../Components/User/LoginForm";
import RegisterForm from "../../Components/User/RegisterForm";

function UserAuthLayout(props) {
  return (
    <Fragment>
      <main className="auth-container">
        <div
          className="image-side"
          style={{
            backgroundImage: `${
              props.register
                ? "url('register-background.jpg')"
                : "url('login-background.jpg')"
            }`,
          }}
        ></div>
        <div className="form-side">
          {props.register && <RegisterForm />}
          {props.login && <LoginForm />}
        </div>
      </main>
    </Fragment>
  );
}

export default UserAuthLayout;
