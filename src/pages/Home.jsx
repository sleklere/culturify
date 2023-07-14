import NewPostForm from "../Components/NewPostForm";
import Feed from "../Components/Feed";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Outlet />
      <main className="main">
        <NewPostForm />
        <Feed endpoint={"/posts"} />
      </main>
    </>
  );
}

export default Home;
