import { useSelector } from "react-redux";
import validate from "../Hooks/useInputValidation";
import axios from "axios";

function NewPostForm() {
  const user = useSelector((state) => state.user.data);
  const {
    value: text,
    classes: textClasses,
    isValid: textValid,
    changeHandler: textChangeHandler,
    reset: resetText,
  } = validate((value) => value.trim() !== "");

  let formIsValid = false;

  if (textValid) formIsValid = true;

  async function newPostHandler(e) {
    console.log("new post handler");
    e.preventDefault();
    if (!formIsValid || !user) {
      resetText();
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/posts`,
        data: { text, user },
        withCredentials: true,
      });
      console.log(res);
      resetText();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="new-post">
      <form onSubmit={newPostHandler}>
        <h2>New post</h2>
        <input
          type="text"
          placeholder="What's going on?"
          className={`new-post__content ${textClasses}`}
          value={text}
          onChange={textChangeHandler}
        ></input>

        <button className="btn new-post__button" disabled={!formIsValid}>
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
