import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";
import { Squash as Hamburger } from "hamburger-react";
import ProfileLink from "./ProfileLink";
import axios from "axios";

function Header(props) {
  // Use Redux for app-wide state 'userLoggedIn'
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.data);

  async function logoutHandler() {
    try {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/users/logout`,
      });
    } catch (err) {
      console.log(err);
    }

    dispatch(userActions.logout());
    navigate("/login");
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
          <ProfileLink
            linkTo={user._id}
            name={user.firstName}
            img={user.photo}
          />
        )}
        {userLogged && (
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </nav>
      <div className="burger-menu" onClick={props.onMenuClick}>
        {/* <FontAwesomeIcon icon={faBars} /> */}
        <Hamburger
          toggled={props.isNavOpen}
          size={32}
          color="#444"
          hideOutline={true}
          rounded
        />
      </div>
    </header>
  );
}

export default Header;
