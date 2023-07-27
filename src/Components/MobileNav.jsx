import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";
import ProfileLink from "./ProfileLink";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function MobileNav(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.data);

  function logoutHandler() {
    dispatch(userActions.logout());
    navigate("/");
  }

  return (
    <>
      <div className="mobile-nav__bg" onClick={props.onNavClose} />
      <div className="mobile-nav">
        <ul className="mobile-nav__list">
          {!userLogged && (
            <NavLink
              to={"/register"}
              onClick={props.onNavClose}
              className="mobile-nav__link"
            >
              Register
            </NavLink>
          )}
          {!userLogged && (
            <NavLink
              to={"/login"}
              onClick={props.onNavClose}
              className="mobile-nav__link"
            >
              Login
            </NavLink>
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
                  <NavLink>
                    <AccountCircleIcon fontSize="large" />
                    Profile
                  </NavLink>
                </li>
                <li className="mobile-nav__link">
                  <NavLink>
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
          {/* {userLogged && (
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
          )} */}
        </ul>
      </div>
    </>
  );
}

export default MobileNav;
