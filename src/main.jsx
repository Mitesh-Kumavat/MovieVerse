import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
// import Layout from './Components/Layout.jsx'
// import { AddMovie, Cards, Detail, Error } from './Components/index.js'
// import { createContext, useState } from 'react'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Cards />
//       }, {
//         path: '/add-movie',
//         element: <AddMovie />
//       }, {
//         path: '/detail/:id',
//         element: <Detail />
//       }
//     ]
//   }, {
//     path: '*',
//     element: <Error />
//   }
// ])

createRoot(document.getElementById('root')).render(
  // <AppState.Provider value={{ login, username, setLogin, setUsername }}>
  //   <RouterProvider router={router} />
  // </AppState.Provider>
  <App />
)
