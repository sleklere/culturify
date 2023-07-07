import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { json, useLoaderData } from "react-router-dom";
import axios from "axios";
import Post from "../../Components/Post";

function Profile() {
  const { user, posts } = useLoaderData();

  return (
    <div className="profile">
      <div className="profile__background"></div>
      <div className="user">
        <div
          className="user__img"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + `/${user.photo}`
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
      <div className={"posts"}>
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        <p className={"posts__end"}>End of feed.</p>
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  const apiUrl = "http://localhost:5000/api/v1";
  const token = localStorage.getItem("jwt");
  const [userResponse, postsResponse] = await Promise.all([
    axios(`${apiUrl}/users/${params.userId}`, {
      method: "get",
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios(`${apiUrl}/users/${params.userId}/posts`, {
      method: "get",
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (userResponse.status !== 200 || postsResponse.status !== 200) {
    throw json({
      message: "Could not fetch requested user information",
      status: 500,
    });
  } else {
    // return response
    return {
      user: userResponse.data.data.user,
      posts: postsResponse.data.data.posts,
    };
  }
}

export default Profile;
