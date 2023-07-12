import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";
import ProfileLink from "./ProfileLink";

function MobileNav(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.loggedIn);

  function logoutHandler() {
    dispatch(userActions.logout());
    navigate("/");
  }

  return (
    <div className="mobile-nav">
      <FontAwesomeIcon
        icon={faClose}
        className="mobile-nav__close"
        onClick={props.onNavClose}
      />
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
          <ProfileLink
            linkTo={""}
            name={""}
            img={"user_default.png"}
            onClick={props.onNavClose}
          />
        )}
        {userLogged && (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
}

export default MobileNav;
