import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";
import Post from "./Post";

function Feed(props) {
  const [postsLoading, setPostsLoading] = useState(true);
  const [posts, setPosts] = useState("");
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    async function fetchPosts() {
      return await axios(process.env.REACT_APP_API_URL + props.endpoint, {
        method: "get",
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    fetchPosts()
      .then((res) => {
        setPosts(res.data.data.posts);
        setPostsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props.endpoint, token]);

  return (
    <div className={"posts"}>
      {postsLoading ? (
        <Loading />
      ) : (
        posts.map((post) => <Post post={post} key={post._id} />)
      )}
      <p className={"posts__end"}>End of feed.</p>
    </div>
  );
}

export default Feed;
