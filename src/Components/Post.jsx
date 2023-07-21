import ProfileLink from "./ProfileLink";
import PostActions from "./PostActions";
import { useLocation, useNavigate } from "react-router-dom";

function Post(props) {
  const { post } = props;
  const navigate = useNavigate();
  const location = useLocation();
  let currentUrl = location.pathname;

  // avoid a bug when navigating in 'goToPost' fn (the URL ends up being '//posts/:id', which throws an error)
  if (currentUrl === "/") {
    currentUrl = "";
  }

  const goToPost = (e) => {
    if (e.target !== e.currentTarget) return;
    navigate(`${currentUrl}/posts/${post._id}`);
  };

  return (
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
  );
}

export default Post;
