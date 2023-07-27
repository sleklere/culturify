import ReactDOM from "react-dom";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import MobileNav from "../Components/MobileNav";
import AuthVerify from "../Components/Utils/AuthVerify";

const overlays = document.getElementById("overlays");

function RootLayout() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  function closeMobileNav() {
    setMobileNavVisible(false);
  }
  function toggleMobileNav() {
    setMobileNavVisible((prevState) => !prevState);
  }

  return (
    <Fragment>
      <AuthVerify>
        {mobileNavVisible &&
          ReactDOM.createPortal(
            <MobileNav onNavClose={closeMobileNav} />,
            overlays
          )}
        <Header onMenuClick={toggleMobileNav} isNavOpen={mobileNavVisible} />
        <Outlet />
      </AuthVerify>
    </Fragment>
  );
}

export default RootLayout;
