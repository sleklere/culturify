import ReactDOM from "react-dom";
import ProfileLink from "./ProfileLink";
import { useState } from "react";
import PostActions from "./PostActions";
import PostPopup from "./PostPopup";
import { useLocation, useNavigate } from "react-router-dom";

const overlays = document.getElementById("overlays");

function Post(props) {
  const { post } = props;
  const [postPopupVisible, setPostPopupVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const openPost = () => setPostPopupVisible(true);
  const goToPost = () => {
    navigate(`${location.pathname}/posts/${post._id}`);
  };
  const closePost = () => setPostPopupVisible(false);

  return (
    <>
      {/* {postPopupVisible &&
        ReactDOM.createPortal(
          <PostPopup post={post} id={post._id} closePopup={closePost} />,
          overlays
        )} */}
      <div className={"post"} onClick={goToPost}>
        <ProfileLink
          linkTo={post.user._id}
          name={post.user.firstName}
          img={post.user.photo ? post.user.photo : "user_default.png"}
        />
        <div className="post__content">
          <p>{post.text}</p>
        </div>
        <PostActions post={post} />
      </div>
    </>
  );
}

export default Post;
