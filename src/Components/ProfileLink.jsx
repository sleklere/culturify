import { NavLink } from "react-router-dom";

function ProfileLink(props) {
  return (
    <NavLink
      to={`/users/${props.linkTo}`}
      className={({ isActive }) =>
        `profile__link nav-link ${
          isActive ? "profile-link--active" : undefined
        }`
      }
      onClick={props.onNavClose}
    >
      <div
        className="profile__link-img"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + `/${props.img}`})`,
        }}
      ></div>
      {props.name}
    </NavLink>
  );
}

export default ProfileLink;
