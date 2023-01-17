import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error'
import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
import Profile from './pages/User/Profile'
import RootLayout from './pages/RootLayout'
import UserFormsLayout from './pages/User/UserFormsLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      // { path: '/login', element: <Login /> },
      { path: '/register', element: <UserFormsLayout register={true} /> },
      { path: '/login', element: <UserFormsLayout login={true} /> },
      { path: '/profile', element: <Profile /> },
      { path: '/users/:user', element: <Profile /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
