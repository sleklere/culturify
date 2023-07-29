import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
// import Home from "./pages/Home";
import { loader as userLoader } from "./pages/User/Profile";
import RootLayout from "./pages/RootLayout";
import { loader as authPagesLoader } from "./pages/User/UserAuthLayout";
import ProtectRoute from "./Components/Utils/ProtectRoute";
import React, { Suspense } from "react";
// import Loading from "./pages/Loading";
import LoadingPage from "./pages/LoadingPage";
import PostPopup, { loader as postPopupLoader } from "./Components/PostPopup";

const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/User/Profile"));
const UserAuthLayout = React.lazy(() => import("./pages/User/UserAuthLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        path: "",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProtectRoute>
              <Home title={"Home"} />
            </ProtectRoute>
          </Suspense>
        ),
        children: [
          {
            path: "/posts/:postId",
            element: <PostPopup />,
            loader: postPopupLoader,
          },
        ],
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <UserAuthLayout register={true} />
          </Suspense>
        ),
        loader: authPagesLoader,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <UserAuthLayout login={true} />
          </Suspense>
        ),
        loader: authPagesLoader,
      },
      {
        path: "users/:userId",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          </Suspense>
        ),
        loader: userLoader,
        children: [
          {
            path: "posts/:postId",
            element: <PostPopup />,
            loader: postPopupLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
