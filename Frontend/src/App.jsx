import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Home from './components/Home'

const browserRouter = createBrowserRouter([
  {
    path : "/",
    element : <MainLayout/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/profile',
        element : <Profile/>
      }
    ]
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <Signup/>
  }
])
function App() {


  return (
    <>
     <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
