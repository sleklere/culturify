import { json, useLoaderData } from "react-router-dom";

import Post from "../Components/Post";

function Home() {
  const data = useLoaderData();

  return (
    <main className="main">
      <div className="new-post">
        <form>
          <input
            type="text"
            placeholder="What's going on?"
            className="new-post__content"
          ></input>
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
