import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import ProfileLink from "./ProfileLink";
import axios from "axios";
import { useSelector } from "react-redux";
import { getAuthToken } from "./Utils/AuthVerify";
import { useState } from "react";

function Post(props) {
  const { post } = props;
  const user = useSelector((state) => state.user.data);
  const token = getAuthToken();
  const [postLikes, setPostLikes] = useState(post.numLikes);

  async function likePost() {
    setPostLikes((prevState) => prevState + 1);
    try {
      await axios(`${process.env.REACT_APP_API_URL}/posts/${post._id}/like`, {
        method: "POST",
        data: { user, post: post._id },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Post liked successfully!");
    } catch (err) {
      setPostLikes((prevState) => prevState - 1);
      console.log(err);
    }
  }

  return (
    <div className={"post"}>
      <ProfileLink
        linkTo={post.user._id}
        name={post.user.firstName}
        img={post.user.photo ? post.user.photo : "user_default.png"}
      />
      <div className="post__content">
        <p>{post.text}</p>
      </div>
      <div className={"post__actions"}>
        <div className="post__action">
          <FontAwesomeIcon
            icon={faFireAlt}
            className="post__actions-icon"
            onClick={likePost}
          />
          {postLikes}
        </div>
        <div className="post__action">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="post__actions-icon"
          />
          {post.numComments}
        </div>
      </div>
    </div>
  );
}

export default Post;
