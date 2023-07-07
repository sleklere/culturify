import ReactDOM from "react-dom";
import { Fragment, useState } from "react";
import Header from "../Components/Header";
import { useRouteError } from "react-router-dom";
import MobileNav from "../Components/MobileNav";

const overlays = document.getElementById("overlays");

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  let title = "An error ocurred";
  let message = "Something went wrong";

  if (error.data?.status === 500) {
    // message = JSON.parse(error.data).message
    message = error.data.message;
  }

  if (error.data?.status === 404) {
    title = "Not found";
    message = "No page or resource was found";
  }
  if (error.data?.status === 401) {
    title = error.data.title;
    message = error.data.message;
  }

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  function showMobileNav() {
    setMobileNavVisible(true);
  }
  function closeMobileNav() {
    setMobileNavVisible(false);
  }

  return (
    <Fragment>
      {mobileNavVisible &&
        ReactDOM.createPortal(
          <MobileNav onNavClose={closeMobileNav} />,
          overlays
        )}
      <Header onMenuClick={showMobileNav} />
      <main className={"error-main"}>
        <h1 className={"status"}>{error.data?.status}</h1>
        <h1 className={"title"}>{title}</h1>
        <p className={"message"}>{message}</p>
      </main>
    </Fragment>
  );
}

export default ErrorPage;
