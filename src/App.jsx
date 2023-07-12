import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Home, { loader as postsLoader } from "./pages/Home";
import Profile, { loader as userLoader } from "./pages/User/Profile";
import RootLayout from "./pages/RootLayout";
import UserAuthLayout, {
  loader as authPagesLoader,
} from "./pages/User/UserAuthLayout";
import ProtectRoute from "./Components/Utils/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
        // loader: postsLoader,
      },
      {
        path: "register",
        element: <UserAuthLayout register={true} />,
        loader: authPagesLoader,
      },
      {
        path: "login",
        element: <UserAuthLayout login={true} />,
        loader: authPagesLoader,
      },
      {
        path: "users/:userId",
        element: (
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        ),
        loader: userLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
