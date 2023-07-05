import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { json, useLoaderData } from "react-router-dom";

function Profile() {
  const user = useLoaderData();

  return (
    <div className="profile">
      <div className="profile__background"></div>
      <div className="user">
        <div
          className="user__img"
          style={{ backgroundImage: `url(${user.image})` }}
        ></div>
        <div className="user__details">
          <h1 className="user__name">{user.name}</h1>
          <p className="user__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum,
            unde praesentium? Necessitatibus molestias illum similique
            repellendus dolorum provident quibusdam neque. Pariatur quaerat
            delectus blanditiis sequi soluta, libero nobis dicta quam!
          </p>
          <div className="user__social-links">
            {user.socialMediaLinks.twitter && (
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
    </div>
  );
}

export async function loader({ request, params }) {
  const response = await fetch(
    `http://localhost:5000/test-users/${params.userId}`
  );

  if (!response.ok) {
    throw json({
      message: "Could not fetch requested user information",
      status: 500,
    });
  } else {
    return response;
  }
}

export default Profile;
