import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirect, useNavigate, useSubmit } from "react-router-dom";
import { userActions } from "../store/user-slice";

export function getTokenDuration() {
  const expirationDate = new Date(localStorage.getItem("expiration"));
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  // there is a token, and it hasn't expired yet.
  return token;
}

export function checkAuth() {
  console.log("check auth");
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
}

function AuthVerify({ children }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      axios({
        method: "GET",
        url: "http://localhost:5000/api/v1/users/logout",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      axios({
        method: "GET",
        url: "http://localhost:5000/api/v1/users/logout",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      dispatch(userActions.logout());
      navigate("/");
    }, tokenDuration);
  }, [token, submit, dispatch, navigate]);

  return children;
}

export default AuthVerify;
