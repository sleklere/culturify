import ReactDOM from "react-dom";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import MobileNav from "../Components/MobileNav";
import AuthVerify from "../Components/AuthVerify";

const overlays = document.getElementById("overlays");

function RootLayout() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  function showMobileNav() {
    setMobileNavVisible(true);
  }
  function closeMobileNav() {
    setMobileNavVisible(false);
  }

  return (
    <Fragment>
      <AuthVerify>
        {mobileNavVisible &&
          ReactDOM.createPortal(
            <MobileNav onNavClose={closeMobileNav} />,
            overlays
          )}
        <Header onMenuClick={showMobileNav} />
        <Outlet />
      </AuthVerify>
    </Fragment>
  );
}

export default RootLayout;
