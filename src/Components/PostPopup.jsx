import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileLink from "./ProfileLink";
import PostActions from "./PostActions";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useLoaderData, useNavigate } from "react-router-dom";

function PostPopup() {
  const postId = useLoaderData();
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  console.log(postId);
  console.log(post);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    async function fetchPosts() {
      return await axios(process.env.REACT_APP_API_URL + `/posts/${postId}`, {
        method: "get",
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    fetchPosts()
      .then((res) => {
        setPost(res.data.data.post);
        setPostLoading(false);
      })
      .catch((err) => console.log(err));
  }, [postId, token]);

  function closePopup() {
    // temporary solution
    // doesnt work if theres no previous page, plus you cant go back to the post again from the browser button
    navigate(-1);
  }

  return (
    <>
      <div className="post-popup-bg" onClick={closePopup} />
      <div className="post-popup">
        {postLoading ? (
          <Loading />
        ) : (
          <>
            <ProfileLink
              linkTo={post.user._id}
              name={post.user.firstName}
              img={post.user.photo ? post.user.photo : "user_default.png"}
              // classes="post-popup__profile-link"
            />
            <FontAwesomeIcon
              icon={faClose}
              className="post-popup__close"
              onClick={closePopup}
            />
            <div className="post-popup__post-content">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Blanditiis esse eius quas nemo repudiandae fugiat nostrum
                ratione officiis a, itaque vero voluptatum debitis incidunt
                excepturi beatae reiciendis. Quasi, mollitia. Molestiae.
              </p>
              <PostActions post={post} />
            </div>
            <div>Comments</div>
          </>
        )}
      </div>
    </>
  );
}

export function loader({ request, params }) {
  console.log("post popup loader");
  console.log(params);
  return params.postId;
}

export default PostPopup;
