import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Home, { loader as postsLoader } from "./pages/Home";
import Profile, { loader as userLoader } from "./pages/User/Profile";
import { action as registerAction } from "./Components/User/RegisterForm";
import RootLayout from "./pages/RootLayout";
import UserFormsLayout from "./pages/User/UserFormsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: postsLoader,
      },
      {
        path: "register",
        element: <UserFormsLayout register={true} />,
        action: registerAction,
      },
      { path: "login", element: <UserFormsLayout login={true} /> },
      { path: "profile", element: <Profile /> },
      { path: "users/:userId", element: <Profile />, loader: userLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
