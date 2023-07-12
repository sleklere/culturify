import NewPostForm from "../Components/NewPostForm";
import Feed from "../Components/Feed";

function Home() {
  return (
    <main className="main">
      <NewPostForm />
      <Feed endpoint={"/posts"} />
    </main>
  );
}

export default Home;
