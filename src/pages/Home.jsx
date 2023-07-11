import { json, useLoaderData } from "react-router-dom";

import Post from "../Components/Post";
import useInput from "../Hooks/useInput";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const data = useLoaderData();
  const user = useSelector((state) => state.user.data);
  const {
    value: text,
    classes: textClasses,
    isValid: textValid,
    changeHandler: textChangeHandler,
    reset: resetText,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (textValid) formIsValid = true;

  async function newPostHandler() {
    console.log("new post handler");
    // e.preventDefault();
    if (!formIsValid) return;

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/v1/posts",
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
    <main className="main">
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
      <div className={"posts"}>
        {data.data.posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        <p className={"posts__end"}>End of feed.</p>
      </div>
    </main>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:5000/api/v1/posts");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch users.' }), {
    //   status: 500,
    // })
    return json({ message: "Could not fetch users." }, { status: 500 });
  } else {
    return response;
  }
}

export default Home;
