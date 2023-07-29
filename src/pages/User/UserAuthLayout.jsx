import { Fragment } from "react";
import LoginForm from "../../Components/User/LoginForm";
import RegisterForm from "../../Components/User/RegisterForm";
import { redirect } from "react-router-dom";
import { getAuthToken } from "../../Components/Utils/AuthVerify";

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
          {props.register && <RegisterForm title={"Register"} />}
          {props.login && <LoginForm title={"Login"} />}
        </div>
      </main>
    </Fragment>
  );
}

// protects the route so that a user can't try to login or register when he is logged in
export async function loader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }
  return null;
}

export default UserAuthLayout;
