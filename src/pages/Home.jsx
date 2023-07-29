import NewPostForm from "../Components/NewPostForm";
import Feed from "../Components/Feed";
import { Outlet } from "react-router-dom";
import useSetPageTitle from "../Hooks/useSetPageTitle";

function Home(props) {
  useSetPageTitle(props.title);
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
