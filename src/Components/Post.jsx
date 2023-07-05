import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import ProfileLink from "./ProfileLink";

function Post(props) {
  const { post } = props;

  return (
    <div className={"post"}>
      <ProfileLink
        linkTo={post.user._id}
        name={post.user.firstName}
        img={"user_default.png"}
      />
      <div className="post__content">
        <p>{post.text}</p>
      </div>
      <div className={["post__actions"]}>
        <FontAwesomeIcon icon={faFireAlt} className="post__actions-icon" />
        <FontAwesomeIcon icon={faCommentDots} className="post__actions-icon" />
      </div>
    </div>
  );
}

export default Post;
