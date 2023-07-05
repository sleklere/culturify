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
          backgroundImage: `url(${props.img})`,
        }}
      ></div>
      {props.name}
    </NavLink>
  );
}

export default ProfileLink;
