import { faCommentDots, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getAuthToken } from "./Utils/AuthVerify";
import { useSelector } from "react-redux";
import axios from "axios";

function PostActions(props) {
  const { post } = props;
  const [postLikes, setPostLikes] = useState(post.numLikes);
  const user = useSelector((state) => state.user.data);
  const token = getAuthToken();

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
        <FontAwesomeIcon icon={faCommentDots} className="post__actions-icon" />
        {post.numComments}
      </div>
    </div>
  );
}

export default PostActions;
