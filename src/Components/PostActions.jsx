import { faCommentDots, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAuthToken } from "./Utils/AuthVerify";
import { useSelector } from "react-redux";
import validate from "../Hooks/useInputValidation";
import axios from "axios";

function PostActions(props) {
  const { post } = props;
  const [postLikes, setPostLikes] = useState(post.likes.length);
  const [postLiked, setPostLiked] = useState({ isLiked: false, id: null });
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
  // console.log(post);

  // Check if logged in user liked the post and show it
  useEffect(() => {
    if (!user) return;
    post.likes.forEach((like) => {
      if (like.user === user._id) {
        setPostLiked({ isLiked: true, id: like._id });
      }
    });
  }, [post.likes, user?._id, user]);

  const toggleShowNewComment = () =>
    setNewCommentVisible((prevState) => !prevState);

  // async function likePost() {
  //   setPostLikes((prevState) => prevState + 1);
  //   setPostLiked((prevState) => ({ ...prevState, isLiked: true }));
  //   try {
  //     const res = await axios(
  //       `${process.env.REACT_APP_API_URL}/posts/${post._id}/like`,
  //       {
  //         method: "POST",
  //         data: { user, post: post._id },
  //         withCredentials: true,
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     console.log(res);
  //     setPostLiked({ isLiked: true, id: res.data.data.like._id });
  //     // console.log("Post liked successfully!");
  //   } catch (err) {
  //     setPostLikes((prevState) => prevState - 1);
  //     console.log(err);
  //   }
  // }
  // async function unlikePost() {
  //   setPostLikes((prevState) => prevState - 1);
  //   setPostLiked((prevState) => ({ ...prevState, isLiked: false }));
  //   try {
  //     await axios(
  //       `${process.env.REACT_APP_API_URL}/posts/removelike/${postLiked.id}`,
  //       {
  //         method: "DELETE",
  //         withCredentials: true,
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setPostLiked({ isLiked: false, id: null });
  //     console.log("Liked successfully removed from post!");
  //     console.log(postLiked);
  //   } catch (err) {
  //     setPostLikes((prevState) => prevState + 1);
  //     console.log(err);
  //   }
  // }

  async function toggleLike() {
    // console.log("toggle like function");
    // console.log(postLiked);
    let isLiked;
    let endpoint;
    let method;
    let data;
    if (postLiked.isLiked) {
      isLiked = false;
      endpoint = `/removelike/${postLiked.id}`;
      method = "DELETE";
      // await unlikePost();
    } else {
      isLiked = true;
      endpoint = `/${post._id}/like`;
      method = "POST";
      data = { user, post: post._id };
      // await likePost();
    }
    setPostLiked((prevState) => ({ ...prevState, isLiked }));
    setPostLikes((prevState) => prevState + (isLiked === true ? 1 : -1));
    try {
      const res = await axios(
        `${process.env.REACT_APP_API_URL}/posts${endpoint}`,
        {
          method,
          data,
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setPostLiked({ isLiked, id: res.data.data?.like._id });
    } catch (err) {
      setPostLikes((prevState) => prevState + (isLiked === true ? -1 : 1));
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
            className={`post__actions-icon ${
              postLiked.isLiked === true ? "post__actions-icon--liked" : ""
            }`}
            onClick={toggleLike}
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
