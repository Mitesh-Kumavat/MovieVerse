import './App.css'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import { AddMovie, Cards, Detail, Error, Login, Signup } from './Components/index.js'
import { createContext, useState } from 'react'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Cards />
      }, {
        path: '/add-movie',
        element: <AddMovie />
      }, {
        path: '/detail/:id',
        element: <Detail />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }, {
    path: '*',
    element: <Error />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App