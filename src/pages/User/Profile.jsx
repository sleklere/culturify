import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { json, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import Feed from "../../Components/Feed";

function Profile() {
  const user = useLoaderData();
  const { userId } = useParams();

  return (
    <div className="profile">
      <div className="profile__background"></div>
      <div className="user">
        <div
          className="user__img"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL +
              `/${user?.photo ? user.photo : "user_default.png"}`
            })`,
          }}
        ></div>
        <div className="user__details">
          <h1 className="user__name">
            {user.firstName} {user.lastName}
          </h1>
          <p className="user__description">{user.description}</p>
          <div className="user__social-links">
            {user.socialMediaLinks?.twitter && (
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="media-link"
              >
                <FontAwesomeIcon icon={faTwitter} />
                {user.tw_user}
              </a>
            )}
            {user.ig_user && (
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="media-link"
              >
                <FontAwesomeIcon icon={faInstagram} />
                {user.ig_user}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="profile__sub-container">
        <div className="profile__options"></div>
        <Feed endpoint={`/users/${userId}/posts`} />
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  const token = localStorage.getItem("jwt");

  const res = await axios(
    `${process.env.REACT_APP_API_URL}/users/${params.userId}`,
    {
      method: "get",
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (res.status !== 200) {
    throw json({
      message: "Could not fetch requested user information",
      status: 500,
    });
  } else {
    const user = res.data.data.user;
    return user;
  }
}

export default Profile;
