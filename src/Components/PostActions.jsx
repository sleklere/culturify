import { faCommentDots, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getAuthToken } from "./Utils/AuthVerify";
import { useSelector } from "react-redux";
import validate from "../Hooks/useInputValidation";
import axios from "axios";

function PostActions(props) {
  const { post } = props;
  const [postLikes, setPostLikes] = useState(post.numLikes);
  const [postComments, setPostComments] = useState(post.numComments);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const user = useSelector((state) => state.user.data);
  const token = getAuthToken();
  const {
    value: text,
    classes: textClasses,
    isValid: textValid,
    changeHandler: textChangeHandler,
    reset: resetText,
  } = validate((value) => value.trim() !== "");

  const toggleShowNewComment = () =>
    setNewCommentVisible((prevState) => !prevState);

  async function likePost() {
    setPostLikes((prevState) => prevState + 1);
    try {
      await axios(`${process.env.REACT_APP_API_URL}/posts/${post._id}/like`, {
        method: "POST",
        data: { user, post: post._id },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Post liked successfully!");
    } catch (err) {
      setPostLikes((prevState) => prevState - 1);
      console.log(err);
    }
  }

  let formIsValid = false;

  if (textValid) formIsValid = true;

  async function commentPost(e) {
    e.preventDefault();
    if (!formIsValid || !user) {
      resetText();
      return;
    }

    setPostComments((prevState) => prevState + 1);

    try {
      await axios(
        `${process.env.REACT_APP_API_URL}/posts/${post._id}/comment`,
        {
          method: "POST",
          data: { user, post: post._id, text },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((res) => console.log(res));
      resetText();
      // console.log("Post commented successfully!");
      props.reRenderParent();
    } catch (err) {
      setPostComments((prevState) => prevState - 1);
      console.log(err);
    }
  }

  return (
    <>
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
            onClick={toggleShowNewComment}
          />
          {postComments}
        </div>
      </div>

      {newCommentVisible && (
        <div className="new-comment">
          <form onSubmit={commentPost}>
            <input
              type="text"
              placeholder="Your comment..."
              className={`new-post__content ${textClasses}`}
              value={text}
              onChange={textChangeHandler}
            />
            <button className="btn new-post__button" disabled={!formIsValid}>
              Post
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default PostActions;
