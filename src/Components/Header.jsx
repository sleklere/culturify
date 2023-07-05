import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";
import ProfileLink from "./ProfileLink";

function Header(props) {
  // Use Redux for app-wide state 'userLoggedIn'
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.loggedIn);

  // console.log('user logged state: ', userLogged)

  function logoutHandler() {
    dispatch(userActions.logout());
    navigate("/");
  }

  return (
    <header className="header">
      <NavLink to={"/"} className={`header__brand-link nav-link`} end>
        Culturify
      </NavLink>
      <nav className="header__nav">
        {!userLogged && (
          <NavLink to={"/register"} className="btn">
            Register
          </NavLink>
        )}
        {!userLogged && (
          <NavLink to={"/login"} className="btn">
            Login
          </NavLink>
        )}
        {userLogged && (
          // <NavLink
          //   to={"/profile"}
          //   className={({ isActive }) =>
          //     `profile__link header__link ${
          //       isActive ? "profile-link--active" : undefined
          //     }`
          //   }
          // >
          //   <div className="header__profile-link-img"></div>
          //   Profile
          // </NavLink>
          <ProfileLink linkTo={""} name={""} img={"user_default.png"} />
        )}
        {userLogged && (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </nav>
      <button className="burger-menu" onClick={props.onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

export default Header;
