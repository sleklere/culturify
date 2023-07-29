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
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  // console.log("Post Popup Component");

  useEffect(() => {
    if (post !== "") return;
    async function fetchPost() {
      return await axios(process.env.REACT_APP_API_URL + `/posts/${postId}`, {
        method: "get",
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    // console.log("Fetching post...");
    fetchPost()
      .then((res) => {
        setPost(res.data.data.post);
        setPostLoading(false);
      })
      .catch((err) => console.log(err));
  }, [postId, token, reRender, post]);

  function closePopup() {
    // temporary solution
    // doesnt work if theres no previous page, plus you cant go back to the post again from the browser button
    navigate(-1);
  }

  function toggleReRender() {
    // console.log("re render handler");
    setReRender((prevState) => !prevState);
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
            />
            <FontAwesomeIcon
              icon={faClose}
              className="post-popup__close"
              onClick={closePopup}
            />
            <div className="post-popup__post">
              <p>{post.text}</p>
              <PostActions post={post} reRenderParent={toggleReRender} />
            </div>
            {post.numComments > 0 && (
              <div className="post__comments">
                {post.comments.map((comment) => (
                  <div className="post__comment" key={comment._id}>
                    <ProfileLink
                      linkTo={comment.user._id}
                      name={comment.user.firstName}
                      img={comment.user.photo}
                    />
                    <p className="post__comment-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export function loader({ params }) {
  return params.postId;
}

export default PostPopup;
