import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";
import ProfileLink from "./ProfileLink";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function MobileNav(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.data);

  function logoutHandler() {
    dispatch(userActions.logout());
    props.onNavClose();
    navigate("/login");
  }

  return (
    <>
      <div className="mobile-nav__bg" onClick={props.onNavClose} />
      <div className="mobile-nav">
        <ul className="mobile-nav__list">
          {!userLogged && (
            <>
              <NavLink
                to={`/`}
                onClick={props.onNavClose}
                className={"mobile-nav__brand-link"}
              >
                Culturify
              </NavLink>
              <ul className="mobile-nav__links">
                <li className="mobile-nav__link">
                  <NavLink to={"/register"} onClick={props.onNavClose}>
                    <AppRegistrationIcon fontSize="large" />
                    Register
                  </NavLink>
                </li>
                <li className="mobile-nav__link">
                  <NavLink to={"/login"} onClick={props.onNavClose}>
                    <LoginIcon fontSize="large" />
                    Login
                  </NavLink>
                </li>
              </ul>
            </>
          )}
          {userLogged && (
            <>
              <ProfileLink
                linkTo={user._id}
                name={user.firstName}
                img={user.photo}
                fontColor={"#fff"}
              />
              <ul className="mobile-nav__links">
                <li className="mobile-nav__link">
                  <NavLink to={`/`} onClick={props.onNavClose}>
                    <HomeIcon fontSize="large" />
                    Home
                  </NavLink>
                </li>
                <li className="mobile-nav__link">
                  <NavLink to={`/users/${user._id}`} onClick={props.onNavClose}>
                    <AccountCircleIcon fontSize="large" />
                    Profile
                  </NavLink>
                </li>
                <li className="mobile-nav__link">
                  <NavLink onClick={props.onNavClose}>
                    <SettingsIcon fontSize="large" />
                    Settings
                  </NavLink>
                </li>
                <li className="mobile-nav__link" onClick={logoutHandler}>
                  <LogoutIcon fontSize="large" />
                  Logout
                </li>
              </ul>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default MobileNav;
