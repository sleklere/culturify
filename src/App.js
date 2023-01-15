import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import LoginModal from "./Components/LoginModal";
import RegisterModal from "./Components/RegisterModal";
import Login from "./pages/Login";

// import styles from "./App.module.css";

function App() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const showLogin = function () {
    setRegisterVisible(false);
    setLoginVisible(true);
  };

  const hideLogin = function () {
    setLoginVisible(false);
  };

  const showRegister = function () {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const hideRegister = function () {
    setRegisterVisible(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Fragment>
            <Header onClickLoginBtn={showLogin}></Header>
            {loginVisible && (
              <LoginModal onClose={hideLogin} showRegister={showRegister} />
            )}
            {registerVisible && (
              <RegisterModal onClose={hideRegister} showLogin={showLogin} />
            )}
          </Fragment>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
